Ext.define('Console.controller.JohnnyControllers.BranchPhoto', {
    extend: 'Ext.app.Controller',
    stores: [ 
        'Johnny.Branch',
        'Johnny.BranchPhoto'
    ],
    models: [ 
        'Johnny.Branch',
        'Johnny.BranchPhoto'
    ],
    views: [  
        'JohnnyBranchPhoto.TabPanel',
        'JohnnyBranchPhoto.GridMaster',
        'JohnnyBranchPhoto.ActionPanel',
        'JohnnyBranchPhoto.DetailFormAdd',
        'JohnnyBranchPhoto.DetailFormEdit',
        'JohnnyBranchPhoto.Panel',
        'JohnnyBranchPhoto.DetailPanel'
    ],

    refs: [ //指定任何在頁面上的組件
        {
            ref: 'actionPanel', 
            selector: 'johnnyBranchPhotoActionPanel' 
        }, {
            ref: 'grid',
            selector: 'johnnyBranchPhotoGridMaster'
        }, {
            ref: 'DetailGrid',
            selector: 'johnnyBranchPhotoDetailPanel'
        }, {
            ref: 'formAdd',
            selector: 'johnnyBranchPhotoDetailFormAdd'
        }, {
            ref: 'formEdit',
            selector: 'johnnyBranchPhotoDetailFormEdit'
        },{
            ref: 'Textfield_photo_url',
            selector: 'johnnyBranchPhotoDetailFormEdit fieldcontainer #textfield_photo_url'
        },{
            ref: 'Filefield_photo_url',
            selector: 'johnnyBranchPhotoDetailFormEdit fieldcontainer #filefield_photo_url'
        },{
            ref: 'Button_clearFile',
            selector: 'johnnyBranchPhotoDetailFormEdit fieldcontainer #button_clearFile'
        }
    ],

    config: { //配置
        formAddTitle: '新增照片',
        formEditTitle: '修改照片',
        addRequestUrl: './modules/source/controller/JohnnyBranchPhoto/addBranchPhoto.php',
        editRequestUrl: './modules/source/controller/JohnnyBranchPhoto/editBranchPhoto.php'
    },

    init: function() { //controller
        var me = this;

        me.control({
            'johnnyBranchPhotoGridMaster': {
                select: me.selectMasterList,
                deselect: me.deselectMasterList
            },
            'johnnyBranchPhotoDetailPanel': {
                select: me.selectDetailList,
                deselect: me.deselectDetailList
            },
            'johnnyBranchPhotoDetailPanel button[action=add_branch_photo]': {
                click: me.addData
            },
            'johnnyBranchPhotoDetailPanel button[action=edit_branch_photo]': {
                click: me.editData
            },
            'johnnyBranchPhotoDetailPanel button[action=delete_branch_photo]': {
                click: me.deleteData
            },
            'johnnyBranchPhotoDetailFormAdd button[action=form_confirm]': {//確認
                click: me.addConfirm
            },
            'johnnyBranchPhotoDetailFormAdd button[action=form_cancel]': {//取消
                click: me.addCancel
            },
            'johnnyBranchPhotoDetailFormEdit button[action=form_confirm]': {
                click: me.editConfirm
            },
            'johnnyBranchPhotoDetailFormEdit button[action=form_cancel]': {
                click: me.editCancel
            },
            'johnnyBranchPhotoDetailFormEdit fieldcontainer #button_clearFile' :{
                click: me.Clear_importFile
            },
            'johnnyBranchPhotoDetailFormEdit fieldcontainer #filefield_photo_url': {
                change: me.Import_filefield_change
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
        var records = me.getGrid().getSelectionModel().getSelection();
        var grid = me.getDetailGrid();
        var filter = ['branch_id'];

        me.show_grid_load(grid ,records, filter);
    },

    deselectMasterList: function(obj, record, index, eOpts) {
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
            title = me.getFormAddTitle();

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
        if (records[0].data['photo_url'] != '') {
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
        
        form.findField('branch_id').setValue(records_Master[0].data.branch_id);

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