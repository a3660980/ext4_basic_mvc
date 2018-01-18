Ext.define('Console.controller.Johnny', {
    extend: 'Ext.app.Controller',
    
    stores: [ 
        'Johnny.Service_johnny'
    ],
    models: [ 
        'Johnny.Service_johnny'
    ],
    views: [  
        'Johnny.TabPanel_johnny',
        'Johnny.GridMaster_johnny',
        'Johnny.ActionPanel_johnny',
        'Johnny.FormAdds_johnny',
        'Johnny.FormEdit_johnny'
    ],

    refs: [ //指定任何在頁面上的組件
        {
            ref: 'actionPanel', 
            selector: 'johnnyActionPanel' 
        }, {
            ref: 'grid',
            selector: 'johnnyGridMaster'
        }, {
            ref: 'formAdd',
            selector: 'johnnyFormAdd'
        }, {
            ref: 'formEdit',
            selector: 'johnnyFormEdit'
        }
    ],

    config: { //配置
        formAddTitle: '新增用戶資料',
        formEditTitle: '修改用戶資料',
        addRequestUrl: './modules/source/controller/Johnny/addStudent.php',
        editRequestUrl: './modules/source/controller/Johnny/editStudent.php'
    },

    init: function() { //controller
        var me = this;

        me.control({
            'johnnyGridMaster': {
                select: me.selectMasterList,
                deselect: me.deselectMasterList
            },
            'johnnyGridMaster button[action=add_user]': {
                click: me.addData
            },
            'johnnyGridMaster button[action=edit_user]': {
                click: me.editData
            },
            'johnnyGridMaster button[action=delete_user]': {
                click: me.deleteData
            },
            'johnnyFormAdd button[action=form_confirm]': {//確認
                click: me.addConfirm
            },
            'johnnyFormAdd button[action=form_cancel]': {//取消
                click: me.addCancel
            },
            'johnnyFormEdit button[action=form_confirm]': {
                click: me.editConfirm
            },
            'johnnyFormEdit button[action=form_cancel]': {
                click: me.editCancel
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
        var me = this;
        var form = me.getFormEdit(),
            title = me.getFormEditTitle(),
            record = me.getGrid().getSelectionModel().getSelection()[0];
        var name = record.data['name'];
          

        me.showForm(form, title);
        me.loadFormReocrd(form, record);
        form.getForm().findField('name').setValue(name);
       
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
                            console.log(batch.proxy.getReader().jsonData.msg);
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
    }
});