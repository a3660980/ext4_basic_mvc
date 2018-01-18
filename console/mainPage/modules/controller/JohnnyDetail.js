Ext.define('Console.controller.JohnnyDetail', {
    extend: 'Ext.app.Controller',
    stores: [
        'Johnny.Service_johnny',
        'Johnny.Service_johnnyDetail',
    ],
    models: [
        'Johnny.Service_johnny',
        'Johnny.Service_johnnyDetail'
    ],
    views: [
        'Johnny.GridMaster_johnny',
        'Johnny.ActionPanel_johnny',
        'JohnnyDetail.DetailTabPanel',
        'JohnnyDetail.DetailGridMaster',
        'JohnnyDetail.DetailPanel',
        'JohnnyDetail.DetailFormAdd',
        'JohnnyDetail.DetailFormEdit'
    ],
    refs: [{
        ref: 'ActionPanel',
        selector: 'johnnyActionPanel'
    }, {
        ref: 'Grid',
        selector: 'johnnyGridMaster'
    }, {
        ref: 'FormAdd',
        selector: 'johnnyDetailAdd'
    }, {
        ref: 'FormEdit',
        selector: 'johnnyDetailEdit'
    }, {
        ref: 'DetailGrid',
        selector: 'johnnyDetailPanel'
    }],
    config: {
        formAddTitle: '新增成績',
        formEditTitle: '修改成績',
        addRequestUrl: './modules/source/controller/JohnnyDetail/addDetail.php',
        editRequestUrl: './modules/source/controller/JohnnyDetail/editDetail.php'
    },

    init: function() {
        var me = this;

        me.control({
            'johnnyGridMaster': {
                select: me.selectMasterList,
                deselect: me.deselectMasterList
            },
            'johnnyDetailPanel': {
                select: me.selectDetailList,
                deselect: me.deselectDetailList
            },            
            'johnnyDetailPanel button[action=detail_add_user]': {
                click: me.addData
            },
            'johnnyDetailPanel button[action=detail_edit_user]': {
                click: me.editData
            },
            'johnnyDetailPanel button[action=detail_delete_detail]': {
                click: me.deleteData
            },
            'johnnyDetailAdd button[action=form_add_confirm]': {
                click: me.addConfirm
            },
            'johnnyDetailAdd button[action=form_add_cancel]': {
                click: me.addCancel
            },
            'johnnyDetailEdit button[action=form_edit_confirm]': {
                click: me.editConfirm
            },
            'johnnyDetailEdit button[action=form_edit_cancel]': {             
                click: me.editCancel
            }
        });
    },

    checkSession: function() {
        var me = this;
        var isSessionExist = me.getController('Viewport').checkUserSessionExist();

        if (!isSessionExist) {
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

        if (isHidden && !isCollapse) {
            Ext.MessageBox.show({
                title: MSG['msg_box_info'],
                msg: MSG['plz_close'],
                width: 300,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.INFO
            });
        } else if (!isHidden && !isCollapse) {

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
        var count = obj.getCount();//選取幾筆資料    
        if(typeof me.getDetailGrid() == 'undefined') {
            return;
        }

        var store = me.getDetailGrid().getStore();//取得detail的store
        if (count == 1) {              
            store.clearFilter(true); //clearFilter:取消過濾並顯示所有數據 
            store.filter([//filter:在store內過濾資料
                {property: 'student_id', value: record.get('id')}//用id找資料
            ]);
            store.reload(); //重置store
        } else {
            store.removeAll();  //讓store中的數據為空
        }
    },

    deselectMasterList: function(obj, record, index, eOpts) {
        var me = this;
        var count = obj.getCount();//選取幾筆資料     
        if(typeof me.getDetailGrid() == 'undefined') {
            return;
        } 
        var store = me.getDetailGrid().getStore();//取得detail的store

        if (count == 1) {              
            store.clearFilter(true); //clearFilter:取消過濾並顯示所有數據 
            store.filter([//filter:在store內過濾資料
                {property: 'student_id', value: record.get('id')}//用brand_id找資料
            ]);
            store.reload(); //重置store
        } else {
            store.removeAll();  //讓store中的數據為空
        }
    },

    selectDetailList: function(obj, record, index, eOpts) {
        var me = this;
        var count = obj.getCount();//選取幾筆資料
        var formEdit = me.getFormEdit();

        if (count == 1) {
            me.loadDetailFormRecord(formEdit, record);  //取下紀錄
        } else {
            formEdit.getForm().reset();

        }
    },
    deselectDetailList: function(obj, record, index, eOpts) {
        var me = this;
        var count = obj.getCount();
        var formEdit = me.getFormEdit();

        if (count == 1) {
            var deselectRecord = obj.selected.items[0];
            me.loadDetailFormRecord(formEdit, deselectRecord);
        } else {
            formEdit.getForm().reset();
        }
    },

    loadDetailFormRecord: function(form, record) {
        form.loadRecord(record);
    },

    loadFormReocrd: function(form, record) {
        form.loadRecord(record);
    },

    addData: function(btn) {
        var me = this;
        var form = me.getFormAdd(),
            title = me.getFormAddTitle(),
            store = me.getDetailGrid().getStore();
        var record = me.getGrid().getSelectionModel().getSelection()[0];
        var student_id = record.data['id'];
        console.log(record)
        console.log(student_id)


        me.showForm(form, title);
        form.getForm().findField('student_id').setValue(student_id);
    },

    editData: function(btn) {
        var me = this;
        var form = me.getFormEdit(),
            title = me.getFormEditTitle(),
            record = me.getDetailGrid().getSelectionModel().getSelection()[0];
        me.showForm(form, title);
        me.loadFormReocrd(form, record);
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

                        failure: function() {
                            Ext.MessageBox.show({
                                title: MSG['msg_box_info'],
                                msg: MSG['delete_fail'],
                                width: 300,
                                buttons: Ext.MessageBox.OK,
                                icon: Ext.MessageBox.ERROR
                            });
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

        // check value
        if (!form.isValid()) {
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
        var record = grid.getSelectionModel().getSelection()[0];

        // check value
        if (!form.isValid()) {
            return;
        }

        form.submit({
            url: me.getEditRequestUrl(),
            method: 'POST',
            submitEmptyText: false,
            success: function() {
                actionPanel.collapse(Ext.Component.DIRECTION_RIGHT, true);

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