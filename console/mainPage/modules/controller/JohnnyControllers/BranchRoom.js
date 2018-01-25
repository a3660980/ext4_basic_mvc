Ext.define('Console.controller.JohnnyControllers.BranchRoom', {
    extend: 'Ext.app.Controller',
    stores: [ 
        'Johnny.BranchRoom',
        'Johnny.comboxBranch'
    ],
    models: [ 
        'Johnny.BranchRoom'
    ],
    views: [  
        'JohnnyBranchRoom.TabPanel',
        'JohnnyBranchRoom.GridMaster',
        'JohnnyBranchRoom.ActionPanel',
        'JohnnyBranchRoom.FormAdd',
        'JohnnyBranchRoom.FormEdit'
    ],

    refs: [ //指定任何在頁面上的組件
        {
            ref: 'actionPanel', 
            selector: 'johnnyBranchRoomActionPanel' 
        }, {
            ref: 'grid',
            selector: 'johnnyBranchRoomGridMaster'
        }, {
            ref: 'formAdd',
            selector: 'johnnyBranchRoomFormAdd'
        }, {
            ref: 'formEdit',
            selector: 'johnnyBranchRoomFormEdit'
        },{
            ref: 'Textfield_room_photo',
            selector: 'johnnyBranchRoomFormEdit fieldcontainer #textfield_room_photo'
        },{
            ref: 'Filefield_room_photo',
            selector: 'johnnyBranchRoomFormEdit fieldcontainer #filefield_room_photo'
        },{
            ref: 'Button_clearFile',
            selector: 'johnnyBranchRoomFormEdit fieldcontainer #button_clearFile'
        }
    ],

    config: { //配置
        formAddTitle: '新增房間',
        formEditTitle: '修改房間',
        addRequestUrl: './modules/source/controller/JohnnyBranchRoom/addBranchRoom.php',
        editRequestUrl: './modules/source/controller/JohnnyBranchRoom/editBranchRoom.php'
    },

    init: function() { //controller
        var me = this;

        me.control({
            'johnnyBranchRoomGridMaster': {
                select: me.selectMasterList,
                deselect: me.deselectMasterList
            },
            'johnnyBranchRoomGridMaster button[action=add_branch_room]': {
                click: me.addData
            },
            'johnnyBranchRoomGridMaster button[action=edit_branch_room]': {
                click: me.editData
            },
            'johnnyBranchRoomGridMaster button[action=delete_branch_room]': {
                click: me.deleteData
            },
            'johnnyBranchRoomFormAdd button[action=form_confirm]': {//確認
                click: me.addConfirm
            },
            'johnnyBranchRoomFormAdd button[action=form_cancel]': {//取消
                click: me.addCancel
            },
            'johnnyBranchRoomFormEdit button[action=form_confirm]': {
                click: me.editConfirm
            },
            'johnnyBranchRoomFormEdit button[action=form_cancel]': {
                click: me.editCancel
            },
            'johnnyBranchRoomFormEdit fieldcontainer #button_clearFile' :{
                click: me.Clear_importFile
            },
            'johnnyBranchRoomFormEdit fieldcontainer #filefield_room_photo': {
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
        var count = obj.getCount();
        var formEdit = me.getFormEdit();

        if (count == 1) {
            me.loadFormReocrd(formEdit, record);
        } else {
            formEdit.getForm().reset();
        }
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
            records = me.getGrid().getSelectionModel().getSelection();
        let filefield = me.getFilefield_room_photo();
        let clearFile_btn = me.getButton_clearFile();
        let textfield = me.getTextfield_room_photo();

        textfield.setDisabled(false);
        if (records[0].data['room_photo'] != '') {
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

        var grid = me.getGrid(),
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
        var grid = me.getGrid();
        var store = grid.getStore();
        var form = formPanel.getForm();

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
        var grid = me.getGrid();
        var store = grid.getStore();
        var form = formPanel.getForm();
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
        var textfield = me.getTextfield_room_photo();
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
        var textfield = me.getTextfield_room_photo();
        var filefield = me.getFilefield_room_photo();
        textfield.setValue('');
        textfield.setDisabled(false);
        filefield.reset();
        filefield.setDisabled(false);
        btn.setDisabled(true);
    },
});