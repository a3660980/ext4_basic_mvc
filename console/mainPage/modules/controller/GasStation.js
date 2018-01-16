Ext.define('Console.controller.GasStation', {
	extend: 'Ext.app.Controller',
// 所有元件控制的function
	stores: [
        'GasStation'
    ],
    models: [
        'GasStation'
    ],
	views: [
		'GasStation.TabPanel',
		'GasStation.GridMaster',
		'GasStation.ActionPanel',
		'GasStation.FormAdd',
		'GasStation.FormEdit'
	],

    refs: [
        {
            ref: 'actionPanel',
            selector: 'gsactionpanel'
        }, {
            ref: 'grid',
            selector: 'gsgridmaster'
        }, {
            ref: 'formAdd',
            selector: 'gsformadd'
        }, {
            ref: 'formEdit',
            selector: 'gsformedit'
        }
    ],

    config: {
        formAddTitle: '新增用戶資料',
        formEditTitle: '修改用戶資料',
        fromdeleteTitle: '刪除用戶',
        addRequestUrl: './modules/source/controller/GasStation/addExternalContact.php',
        editRequestUrl: './modules/source/controller/GasStation/editExternalContact.php',
        deleteRequestUrl: './modules/source/controller/GasStation/editExternalContact.php'
    },

	init: function() {
        var me = this;

		me.control({
			'gsgridmaster': {
                select: me.selectMasterList,
				deselect: me.deselectMasterList
			},
			'gsgridmaster button[action=add_user]': {
				click: me.addData
			},
			'gsgridmaster button[action=edit_user]': {
				click: me.editData
			},
			'gsgridmaster button[action=delete_user]': {
				click: me.deleteData
			},
			'gsformadd button[action=form_confirm]': {
				click: me.addConfirm
			},
			'gsformadd button[action=form_cancel]': {
				click: me.addCancel
			},
			'gsformedit button[action=form_confirm]': {
				click: me.editConfirm
			},
			'gsformedit button[action=form_cancel]': {
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
        // me.checkSession();

        var actionPanel = me.getActionPanel();
            isCollapse = actionPanel.getCollapsed();
            isHidden = formPanel.isHidden();
            
        if (isHidden && ! isCollapse) {
            Ext.MessageBox.show({
                title: MSG['msg_box_info'],
                msg: MSG['plz_close'],
                width: 300,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.INFO
            });
        } else if (! isHidden &&  !isCollapse) {
            actionPanel.collapse(Ext.Component.DIRECTION_RIGHT, true);
            formPanel.hide();
            actionPanel.doLayout();
        } else {
            formPanel.show();
            actionPanel.setTitle(title);
            actionPanel.doLayout();
            // 自動佈局，調整框架大小
            actionPanel.expand(true);
            // 框架跳出動作
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
        var values = form.getValues();
        // var service_type =form.getFieldValues()['service_type'];
        // var gas_type =form.getFieldValues()['gas_type'];

        // if (service_type.values==1,2) {

        // }
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
            icon: Ext.MessageBox.INFO,
			buttons: Ext.MessageBox.YESNO,
			fn: function(btn) {
				if (btn == 'yes') {
					store.remove(record);

					store.sync({
						success: function() {
							Ext.MessageBox.show({
								msg: MSG['delete_success'],
                                title: MSG['msg_box_info'],
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
        var values = form.getValues();
		// check value
		if (! form.isValid()) {
			return;
		}
        // console.log(values.gas_type);
		form.submit({
            params: {
                service: values.service_type.join(), 
                gas: values.gas_type.join() 
            },
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
        var record = grid.getSelectionModel().getSelection()[0];
        var values = form.getValues();
		// check value
		if (! form.isValid()) {
			return;
		}
        form.submit({
            params: {
                service: values.service_type.join(), 
                gas: values.gas_type.join() 
            },
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