Ext.define('Console.controller.JohnnyControllers.BranchRoomPhoto', {
    extend: 'Ext.app.Controller',
    stores: [ 
        'Johnny.BranchRoomPhoto',
        'Johnny.Branch',
        'Johnny.comboxBranchRoom'
    ],
    models: [ 
        'Johnny.BranchRoomPhoto',
        'Johnny.Branch',
    ],
    views: [  
        'JohnnyBranchRoomPhoto.TabPanel',
        'JohnnyBranchRoomPhoto.GridMaster',
        'JohnnyBranchRoomPhoto.ActionPanel',
        'JohnnyBranchRoomPhoto.DetailFormAdd',
        'JohnnyBranchRoomPhoto.DetailFormEdit',
        'JohnnyBranchRoomPhoto.Panel',
        'JohnnyBranchRoomPhoto.DetailPanel'
    ],

    refs: [ //指定任何在頁面上的組件
        {
            ref: 'actionPanel', 
            selector: 'johnnyBranchRoomPhotoActionPanel' 
        }, {
            ref: 'grid',
            selector: 'johnnyBranchRoomPhotoGridMaster'
        }, {
            ref: 'DetailGrid',
            selector: 'johnnyBranchRoomPhotoDetailPanel'
        }, {
            ref: 'formAdd',
            selector: 'johnnyBranchRoomPhotoDetailFormAdd'
        }, {
            ref: 'formEdit',
            selector: 'johnnyBranchRoomPhotoDetailFormEdit'
        },{
            ref: 'Textfield_photo_url',
            selector: 'johnnyBranchRoomPhotoDetailFormEdit fieldcontainer #textfield_detail_photo'
        },{
            ref: 'Filefield_photo_url',
            selector: 'johnnyBranchRoomPhotoDetailFormEdit fieldcontainer #filefield_detail_photo'
        },{
            ref: 'Button_clearFile',
            selector: 'johnnyBranchRoomPhotoDetailFormEdit fieldcontainer #button_clearFile'
        },{
            ref: 'add_room_id',
            selector: 'johnnyBranchRoomPhotoDetailFormAdd #add_room_id'
        }
    ],

    config: { //配置
        formAddTitle: '新增照片',
        formEditTitle: '修改照片',
        addRequestUrl: './modules/source/controller/JohnnyBranchRoomPhoto/addBranchRoomPhoto.php',
        editRequestUrl: './modules/source/controller/JohnnyBranchRoomPhoto/editBranchRoomPhoto.php'
    },

    init: function() { //controller
        var me = this;

        me.control({
            'johnnyBranchRoomPhotoGridMaster': {
                select: me.selectMasterList,
                deselect: me.deselectMasterList
            },
            'johnnyBranchRoomPhotoDetailPanel': {
                select: me.selectDetailList,
                deselect: me.deselectDetailList
            },
            'johnnyBranchRoomPhotoDetailPanel button[action=add_branch_room_photo]': {
                click: me.addData
            },
            'johnnyBranchRoomPhotoDetailPanel button[action=edit_branch_room_photo]': {
                click: me.editData
            },
            'johnnyBranchRoomPhotoDetailPanel button[action=delete_branch_room_photo]': {
                click: me.deleteData
            },
            'johnnyBranchRoomPhotoDetailFormAdd button[action=form_confirm]': {//確認
                click: me.addConfirm
            },
            'johnnyBranchRoomPhotoDetailFormAdd button[action=form_cancel]': {//取消
                click: me.addCancel
            },
            'johnnyBranchRoomPhotoDetailFormEdit button[action=form_confirm]': {
                click: me.editConfirm
            },
            'johnnyBranchRoomPhotoDetailFormEdit button[action=form_cancel]': {
                click: me.editCancel
            },
            'johnnyBranchRoomPhotoDetailFormEdit fieldcontainer #button_clearFile' :{
                click: me.Clear_importFile
            },
            'johnnyBranchRoomPhotoDetailFormEdit fieldcontainer #filefield_detail_photo': {
                change: me.Import_filefield_change
            },
            'johnnyBranchRoomPhotoDetailFormAdd combobox[action=room_id]': {
                expand: me.combobox_room_expand
            }

        });
    },


    combobox_room_expand: function(field, eOpts){
        var me = this;
        var record = me.getGrid().getSelectionModel().getSelection()[0];
        var branch_id = record.data['branch_id'];
        var room_id = me.getAdd_room_id();
        var actionPanel = me.getActionPanel();
        room_id.clearValue();

        field.getStore().load({
            params: {
                'branch_id': branch_id
            },
            callback: function(records, operation, success) {
                if(records.length ==0) {
                    actionPanel.collapse(Ext.Component.DIRECTION_RIGHT, true);
                    Ext.MessageBox.show({
                        title: MSG['msg_box_info'],
                        msg: "目前無房型可新增，請先新增房型",
                        width: 300,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.INFO
                    });
                } else {
                    return records;
                }
            }
        });

    },

    checkSession: function() {
        var me = this;
        var isSessionExist = me.getController('Viewport').checkUserSessionExist();

        if (! isSessionExist) {
            return;
        }
    },

    showForm: function(formPanel, title) {
        var me = this;
        me.checkSession();

        var actionPanel = me.getActionPanel(),
            isCollapse = actionPanel.getCollapsed();
            isHidden = formPanel.isHidden();

        formPanel.getForm().reset();

        if (isHidden && ! isCollapse) {
            Ext.MessageBox.show({
                title: MSG['msg_box_info'],
                msg: MSG['plz_close'],
                width: 300,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.INFO
            });
        } else if (! isHidden && ! isCollapse) {

        } else {
            formPanel.show();
            actionPanel.setTitle(title);
            actionPanel.doLayout();
            actionPanel.expand(true);
        }
    },

    hideForm: function(formPanel) {
        var me = this;
        me.checkSession();

        var actionPanel = me.getActionPanel(),
            form = formPanel.getForm()

        actionPanel.collapse(Ext.Component.DIRECTION_RIGHT, true);
        form.reset();
        formPanel.hide();
        actionPanel.doLayout();
    },

    selectMasterList: function(obj, record, index, eOpts) {
        var me = this;
        var count = obj.getCount();
        var records = me.getGrid().getSelectionModel().getSelection();
        var grid = me.getDetailGrid();
        var store = grid.getStore();
        var filter = ['branch_id'];
        if (count ==1) {
            me.show_grid_load(grid ,records, filter);
        } else {
            store.removeAll();
        }
    },

    deselectMasterList: function(obj, record, index, eOpts) {
        var me = this;
        var count = obj.getCount();
        var formEdit = me.getFormEdit();
        let formAdd = me.getFormAdd();
        var grid = me.getDetailGrid();
        var store = grid.getStore();

        if (count == 1) {
            var deselectRecord = obj.selected.items[0];
            me.loadFormReocrd(formEdit, deselectRecord);
            store.clearFilter(true);
            store.filter('branch_id', deselectRecord.get('branch_id'));
            store.reload();
        } else {
            store.removeAll();
            formEdit.getForm().reset();
            formAdd.getForm().reset();
        }
    },

    selectDetailList: function(obj, record, index, eOpts) {
        var me = this;
        var records = me.getDetailGrid().getSelectionModel().getSelection();
        var actionPanel = me.getActionPanel();
        var actionPanel_items = actionPanel.items.items;

        Ext.each(actionPanel_items, function(formPanel) {
            me.show_form_load(formPanel, records, '', false);
        });
    },

    deselectDetailList: function(obj, record, index, eOpts) {
        var me = this;
        var count = obj.getCount();
        var formEdit = me.getFormEdit();

        if (count == 1) {
            var deselectRecord = obj.selected.items[0];
            me.loadFormReocrd(formEdit, deselectRecord);
        } else {
            formEdit.getForm().reset();
        }
    },

    loadFormReocrd: function(form, record) {
        form.loadRecord(record);
    },

    addData: function(btn) {
        var me = this;
        var form = me.getFormAdd(),
            title = me.getFormAddTitle(),
            record = me.getGrid().getSelectionModel().getSelection()[0];
        var branch_id = record.data['branch_id'];
        form.getForm().findField('branch_id').setValue(branch_id);
        me.showForm(form, title);
    },

    editData: function(btn) {
        let me = this;
        let form = me.getFormEdit(),
            title = me.getFormEditTitle(),
            records = me.getDetailGrid().getSelectionModel().getSelection();
        let filefield = me.getFilefield_photo_url();
        let clearFile_btn = me.getButton_clearFile();
        let textfield = me.getTextfield_photo_url();

        textfield.setDisabled(false);
        if (records[0].data['detail_photo'] != '') {
            filefield.setDisabled(true);
            clearFile_btn.setDisabled(false);
        } else {
            filefield.setDisabled(false);
            clearFile_btn.setDisabled(true);
        }
        

        me.show_form_load(form, records, title, true);
    },

    deleteData: function(btn) {
        var me = this;
        me.checkSession();

        var grid = me.getDetailGrid(),
            store = grid.getStore(),
            record = grid.getSelectionModel().getSelection(),
            length = record.length,
            msg = MSG['delete_confirm_header'] + length + MSG['delete_confirm_footer'];

        Ext.MessageBox.show({
            title: MSG['msg_box_info'],
            msg: msg,
            width: 300,
            buttons: Ext.MessageBox.YESNO,
            fn: function(btn) {
                if (btn == 'yes') {
                    store.remove(record);

                    store.sync({
                        success: function() {
                            Ext.MessageBox.show({
                                title: MSG['msg_box_info'],
                                msg: MSG['delete_success'],
                                width: 300,
                                buttons: Ext.MessageBox.OK,
                                fn: function(btn) {
                                    if (btn == 'ok') {
                                        grid.afterRequest(store, null);
                                    }
                                },
                                icon: Ext.MessageBox.INFO
                            });
                        },

                        failure: function(batch, options) {
                            if (batch.proxy.getReader().jsonData.msg == 'deleteFails') {
                                Ext.MessageBox.show({
                                    title: MSG['msg_box_info'],
                                    msg: MSG['delete_data_fail'],
                                    width: 300,
                                    buttons: Ext.MessageBox.OK,
                                    icon: Ext.MessageBox.ERROR
                                });
                            } else {
                                Ext.MessageBox.show({
                                    title: MSG['msg_box_info'],
                                    msg: MSG['delete_fail'],
                                    width: 300,
                                    buttons: Ext.MessageBox.OK,
                                    icon: Ext.MessageBox.ERROR
                                });
                            }
                            
                            store.reload();
                        }
                    });
                }
            }
        });
    },

    addConfirm: function(btn) {
        var me = this;
        me.checkSession();

        var actionPanel = me.getActionPanel();
        var formPanel = me.getFormAdd();
        var grid = me.getDetailGrid();
        var store = grid.getStore();
        var form = formPanel.getForm();
        var records_Master = me.getGrid().getSelectionModel().getSelection();

        form.findField('branch_id').setValue(records_Master[0].data.branch_id);

        // check value
        if (! form.isValid()) {
            return;
        }

        form.submit({
            url: me.getAddRequestUrl(),
            method: 'POST',
            submitEmptyText: false,
            success: function() {
                actionPanel.collapse(Ext.Component.DIRECTION_RIGHT, true);

                Ext.MessageBox.show({
                    title: MSG['msg_box_info'],
                    msg: MSG['add_success'],
                    width: 300,
                    buttons: Ext.MessageBox.OK,
                    fn: function(btn) {
                        if (btn == 'ok') {
                            grid.afterRequest(store, formPanel);
                        }
                    },
                    icon: Ext.MessageBox.INFO
                });
            },

            failure: function(obj, action) {
                var error_msg = null;

                store.reload();

                switch (action.failureType) {
                    case Ext.form.action.Action.CLIENT_INVALID:
                        error_msg = MSG['form_invalid'];
                        break;
                    case Ext.form.action.Action.CONNECT_FAILURE:
                        error_msg = MSG['server_connect_fail'];
                        break;
                    case Ext.form.action.Action.SERVER_INVALID:
                        error_msg = action.result.msg;
                        break;
                    }

                Ext.MessageBox.show({
                    title: MSG['msg_box_error'],
                    msg: error_msg,
                    width: 300,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        });
    },

    addCancel: function(btn) {
        var me = this;
        var form = me.getFormAdd();

        me.hideForm(form);
    },

    editConfirm: function(btn) {
        var me = this;
        me.checkSession();

        var actionPanel = me.getActionPanel();
        var formPanel = me.getFormEdit();
        var grid = me.getDetailGrid();
        var store = grid.getStore();
        var form = formPanel.getForm();
        var records_Master = me.getGrid().getSelectionModel().getSelection();
        let textfield = me.getTextfield_photo_url();

        form.findField('branch_id').setValue(records_Master[0].data.branch_id);
        form.findField('detail_photo').setValue(textfield.value);
         // check value
        if (! form.isValid()) {
            return;
        }

        form.submit({ //表單送出
            url: me.getEditRequestUrl(), //加入api
            method: 'POST', //POST
            submitEmptyText: false, //是否允許空白
            success: function() {
                actionPanel.collapse(Ext.Component.DIRECTION_RIGHT, true); //actionPanel收起

                Ext.MessageBox.show({
                    title: MSG['msg_box_info'],
                    msg: MSG['edit2_success'],
                    width: 300,
                    buttons: Ext.MessageBox.OK,
                    fn: function(btn) {
                        if (btn == 'ok') {
                            grid.afterRequest(store, formPanel);
                        }
                    },
                    icon: Ext.MessageBox.INFO
                });
            },

            failure: function(obj, action) {
                var error_msg = null;

                store.reload();

                switch (action.failureType) {
                    case Ext.form.action.Action.CLIENT_INVALID:
                        error_msg = MSG['form_invalid'];
                    break;
                    case Ext.form.action.Action.CONNECT_FAILURE:
                        error_msg = MSG['server_connect_fail'];
                        break;
                    case Ext.form.action.Action.SERVER_INVALID:
                        error_msg = action.result.msg;
                        break;
                }

                Ext.MessageBox.show({
                    title: MSG['msg_box_error'],
                    msg: error_msg,
                    width: 300,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        });
    },

    editCancel: function(btn) {
        var me = this;
        var form = me.getFormEdit();

        me.hideForm(form);
    },

    show_grid_load: function(grid, records, filter_arr) {
        var me = this;

        if(records.length !== 1){
            grid.getStore().removeAll();
            grid.getStore().reload();
            return;
        }
        if(!grid.isHidden()){
            me.loadRecordFilter(grid.getStore(), records[0], filter_arr);
        }
    },

    show_form_load: function(formPanel, records, title, is_show, actionViewPanel) {
        var me = this;
        var actionPanel = formPanel.up();

        if(is_show){
            if(!actionPanel.getCollapsed() && formPanel.isHidden()){
                Ext.MessageBox.show({
                    title: MSG.msg_box_info,
                    msg: MSG.plz_close,
                    width: 300,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.INFO
                });

                return;
            }else{
                if(actionViewPanel !== undefined ){
                    me.hide_panel(actionViewPanel);
                }

                formPanel.show();
                actionPanel.setTitle(title);
                actionPanel.expand(true);
            }
        }

        if(!formPanel.isHidden()){
            me.loadRecordForm(formPanel, records);
        }
    },

    loadRecordFilter: function(store, record, filter_arr) {
        store.clearFilter(true);
        for (var i = 0 ; i < filter_arr.length ; i++) {
          store.filter([
                {property: filter_arr[i], value: record.get(filter_arr[i]) }
            ]);
        }
        store.reload();
    },

    loadRecordForm: function(formPanel, records) {
        var me = this;
        var count = records.length;
        var title = formPanel.up().getHeader().title;

        if(title === me.getFormAddTitle()){
            formPanel.getForm().reset();
        }

        if(title === me.getFormEditTitle()){
            if(count !== 1){
                formPanel.getForm().reset();
                return;
            }

            formPanel.loadRecord(records[0]);
        }
    },
     Import_filefield_change: function( filefield, value, eOpts ) {
        
        var me = this;
        var files = filefield.fileInputEl.dom.files;
        var textfield = me.getTextfield_photo_url();
        var clearFile_btn = me.getButton_clearFile();
        var jpg_reg = /\.([jJ][pP][gG]){1}$/;
        var png_reg = /\.([pP][nN][gG]){1}$/;

        if (files !== null && files !== undefined) {

            if (!jpg_reg.test(files[0].name) && !png_reg.test(files[0].name)) {
                Ext.Msg.alert('提示','只支援副檔名為jpg或png的圖片！');
                filefield.reset();
            }else{
                textfield.setValue(files[0].name);
                textfield.setDisabled(true);
                clearFile_btn.setDisabled(false);
            }
        }
    },

    Clear_importFile: function(btn) {
        var me = this;
        var textfield = me.getTextfield_photo_url();
        var filefield = me.getFilefield_photo_url();
        textfield.setValue('');
        textfield.setDisabled(false);
        filefield.reset();
        filefield.setDisabled(false);
        btn.setDisabled(true);
    },
});