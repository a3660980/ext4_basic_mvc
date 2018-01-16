Ext.define('Console.controller.UserManagement', {
    extend: 'Ext.app.Controller',

    stores: [
        'CpsUserAccount',
        'CpsUserOrganization'
    ],
    models: [
        'CpsUserAccount',
        'CpsUserOrganization'
    ],
    views: [
        'UserManagement.TabPanel',
        'UserManagement.GridMaster',
        'UserManagement.ActionPanel',
        'UserManagement.FormAdd',
        'UserManagement.FormEdit'
    ],

    refs: [
        {
            ref: 'actionPanel',
            selector: 'umactionpanel'
        }, {
            ref: 'grid',
            selector: 'umgridmaster'
        }, {
            ref: 'formAdd',
            selector: 'umformadd'
        }, {
            ref: 'formEdit',
            selector: 'umformedit'
        // }, {
        //     ref: 'formAddComboboxOneUnits',
        //     selector: '#formadd_one_units'
        // }, {
        //     ref: 'formEditComboboxOneUnits',
        //     selector: '#formedit_one_units'
        // }, {
        //     ref: 'formAddComboboxTwoUnits',
        //     selector: '#formadd_two_units'
        // }, {
        //     ref: 'formEditComboboxTwoUnits',
        //     selector: '#formedit_two_units'
        }
    ],

    config: {
        // comboboxStore: 'Console.store.CpsUserOrganization',
        formAddTitle: '新增用戶資料',
        formEditTitle: '修改用戶資料',
        addRequestUrl: './modules/source/controller/UserManagement/addCpsUserAccount.php',
        editRequestUrl: './modules/source/controller/UserManagement/editCpsUserAccount.php'
    },

    init: function() {
        var me = this;

        me.control({
            'umgridmaster': {
                select: me.selectMasterList,
                deselect: me.deselectMasterList
            },
            'umgridmaster button[action=add_user]': {
                click: me.addData
            },
            'umgridmaster button[action=edit_user]': {
                click: me.editData
            },
            'umgridmaster button[action=delete_user]': {
                click: me.deleteData
            },
            'umgridmaster button[action=import_file]': {
                click: me.importFile
            },
            'umformadd button[action=form_confirm]': {
                click: me.addConfirm
            },
            'umformadd button[action=form_cancel]': {
                click: me.addCancel
            },
            // 'umformadd combobox[action=master_combobox]': {
            //     render: me.addComboboxRender,
            //     select: me.addComboboxMasterSelect,
            //     expand: me.expandCombobox
            // },
            'umformedit button[action=form_confirm]': {
                click: me.editConfirm
            },
            'umformedit button[action=form_cancel]': {
                click: me.editCancel
            },
            // 'umformedit combobox[action=master_combobox]': {
            //     render: me.editComboboxRender,
            //     select: me.editComboboxMasterSelect,
            //     expand: me.expandCombobox
            // }
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
        var me = this;
        
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

        me.showForm(form, title);
        me.loadFormReocrd(form, record);
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

        // me.getFormAddComboboxTwoUnits().setDisabled(true);
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

        // me.getFormEditComboboxTwoUnits().setDisabled(true);
        me.hideForm(form);
    },

    // addComboboxRender: function(combobox) {
    //     var me = this;
    //     var comboboxTwoUnits = me.getFormAddComboboxTwoUnits();
    //     comboboxTwoUnits.store = Ext.create(me.getComboboxStore());
    // },

    // addComboboxMasterSelect: function(combobox, record, index) {
    //     var me = this;
    //     var comboboxTwoUnits = me.getFormAddComboboxTwoUnits();

    //     comboboxTwoUnits.clearValue();
    //     comboboxTwoUnits.store.load({
    //         params: {
    //             'organization_id': record[0].data.organization_id
    //         }
    //     });
    //     comboboxTwoUnits.setDisabled(false);
    // },

    // editComboboxRender: function(combobox) {
    //     var me = this;
    //     var comboboxTwoUnits = me.getFormEditComboboxTwoUnits();
    //     comboboxTwoUnits.store = Ext.create(me.getComboboxStore());
    // },

    // editComboboxMasterSelect: function(combobox, record, index) {
    //     var me = this;
    //     var comboboxTwoUnits = me.getFormEditComboboxTwoUnits();

    //     comboboxTwoUnits.clearValue();
    //     comboboxTwoUnits.store.load({
    //         params: {'organization_id': record[0].data.organization_id}
    //     });
    //     comboboxTwoUnits.setDisabled(false);
    // },

    importFile: function(btn) {
        var me = this;
        var win;
        var store = me.getGrid().getStore();

        if (! win)  {
            win = Ext.create('Ext.window.Window', {
                title: '選擇檔案',
                height: 120,
                width: 400,
                layout: 'fit',
                items: [
                    {
                        xtype: 'form',
                        bodyPadding: 10,
                        frame: true,
                        height: 60,
                        items: [
                            {
                                xtype: 'filefield',
                                name: 'upload',
                                fieldLabel: MSG['import_file'],
                                allowBlank: false,
                                anchor: '100%',
                                buttonText: '選擇檔案'
                            }
                        ],

                        buttons: [{
                            text: MSG['import'],
                            handler: function() {
                                var form = this.up('form').getForm();

                                if (form.isValid()) {
                                    form.submit({
                                        url: './modules/source/controller/UserManagement/parser_file.php',
                                        waitMsg: MSG['import_loading'],
                                        success: function(action, response) {
                                            var response = Ext.decode(response.response.responseText);
                                            var msg = response.msg.join("<br>");

                                            Ext.MessageBox.show({
                                                title: MSG['msg_box_info'],
                                                msg: msg,
                                                width: 520,
                                                buttons: Ext.MessageBox.OK,
                                                icon: Ext.MessageBox.INFO
                                            });

                                            store.reload();
                                            win.close();
                                        },

                                        failure: function(action, response) {
                                            Ext.MessageBox.show({
                                                title: MSG['msg_box_error'],
                                                msg: MSG['import_fails'] + '<br><b>' + response.result.msg + '</b>',
                                                width: 520,
                                                buttons: Ext.MessageBox.OK,
                                                icon: Ext.MessageBox.ERROR
                                            });
                                            win.close();
                                        }
                                    });
                                }
                            }
                        }, {
                            text: MSG['close'],
                            handler: function() {
                                var form = this.up('form').getForm();
                                form.reset();

                                win.close();
                            }
                        }]
                    }
                ]
            });
        }

        win.show();
    },

    // expandCombobox: function(field, eOpts) {
    //     field.getStore().reload();
    // }
});