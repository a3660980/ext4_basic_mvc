Ext.define('Console.controller.GasBrandDetail', {
	extend: 'Ext.app.Controller',
// 所有元件控制的function
	stores: [
        'GasBrandDetail',
        'GasBrandMaster'
    ],
    models: [
        'GasBrandDetail',
        'GasBrandMaster'
    ],
	views: [
        'GasBrand_Detail.GridMaster',
        'GasBrand_Detail.ActionPanel',
        'GasBrand_Detail.FormAdd',
        'GasBrand_Detail.FormEdit',
        'GasBrand_Detail.GridDetail',
        'GasBrand_Detail.FormAdd_Detail',
        'GasBrand_Detail.FormEdit_Detail',
        'GasBrand_Detail.TabPanel_Detail',
        'GasBrand_Detail.master_plus_detail',
	],

    refs: [
        {
            ref: 'actionPanel',
            selector: 'gbactionpanel'
        }, {
            ref: 'DetailGrid',
            selector: 'gbdetail'
        }, {
            ref: 'formAdd',
            selector: 'gbformadd'
        }, {
            ref: 'formEdit',
            selector: 'gbformedit'
        }, {
            ref: 'formAdd2',
            selector: 'gbformadd2'
        }, {
            ref: 'formEdit2',
            selector: 'gbformedit2'
        },  {
            ref: 'GridMaster',
            selector: 'gbgridmaster'
        }
    ],

    config: {
        formAddTitle: '新增',
        formEditTitle: '編輯',
       addRequestUrl_2: './modules/source/controller/GasBrand_Detail/addGasBrand.php',
        editRequestUrl_2: './modules/source/controller/GasBrand_Detail/editGasBrand.php',
        addRequestUrl: './modules/source/controller/GasBrand/addGasBrand.php',
        editRequestUrl: './modules/source/controller/GasBrand/editGasBrand.php',
    },

	init: function() {
        var me = this;

		me.control({
			'gbgridmaster': {
                select: me.selectMasterList,
                deselect: me.deselectMasterList
            },
            'gbdetail': {
                select: me.selectDetailList,
                deselect: me.deselectDetailList
            }, 
            'gbgridmaster button[action=add_user]': {
                click: me.addData
            },
            'gbgridmaster button[action=edit_user]': {
                click: me.editData
            },
            'gbgridmaster button[action=delete_user]': {
                click: me.deleteData_master
            },
			'gbdetail button[action=add_user]': {
				click: me.addData2
			},
			'gbdetail button[action=edit_user]': {
				click: me.editData2
			},
			'gbdetail button[action=delete_user]': {
				click: me.deleteData
			},
			'gbformadd2 button[action=form_add_confirm]': {
				click: me.addServiceCategoryConfirm
			},
			'gbformadd2 button[action=form_add_cancel]': {
				click: me.FormCancel
			},
			'gbformedit2 button[action=form_edit_confirm]': {
				click: me.editServiceCategoryConfirm
			},
			'gbformedit2 button[action=form_edit_cancel]': {
				click: me.FormCancel
			},
            'gbformadd button[action=form_add_confirm]': {
                click: me.addConfirm
            },
            'gbformadd button[action=form_add_cancel]': {
                click: me.FormCancel
            },
            'gbformedit button[action=form_edit_confirm]': {
                click: me.editConfirm
            },
            'gbformedit button[action=form_edit_cancel]': {
                click: me.FormCancel
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

        formPanel.getForm().reset();

        var actionPanel = me.getActionPanel(),
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
    loadMasterFormRecord: function(form, record) {
        var me = this;

        form.loadRecord(record);
    },

    selectMasterList: function(obj, record, index, eOpts) {
        var me = this;
        var count = obj.getCount();      
        var store = me.getDetailGrid().getStore();

        if (count == 1) {              
            store.clearFilter(true);  
            store.filter([
         // 過濾
                {property: 'brand_id', value: record.get('brand_id')}
            ]);
            store.reload(); 
        } else {
            store.removeAll();  
        }
    },

    deselectMasterList: function(obj, record, index, eOpts) {
        var me = this;
        var count = obj.getCount();
        var store = me.getDetailGrid().getStore();
        var formEdit = me.getFormEdit();

        if (count == 1) {
            var deselectRecord = obj.selected.items[0];
            me.loadMasterFormRecord(formEdit, deselectRecord);

            store.reload();
        } else {
            store.removeAll();
        }
    },
    selectDetailList: function(obj, record, index, eOpts) {
        var me = this;
        var count = obj.getCount();
        var formEdit = me.getFormEdit2();

        if (count == 1) {
            me.loadDetailFormRecord(formEdit, record);  //取下紀錄
        } else {
            formEdit.getForm().reset();

        }
    },
    deselectDetailList: function(obj, record, index, eOpts) {
        var me = this;
        var count = obj.getCount();
        var formEdit = me.getFormEdit2();

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

    addData: function(btn) {
        var me = this;
        var form = me.getFormAdd(),
            title = me.getFormAddTitle();

        me.showForm(form, title);
    },

	addData2: function(btn) {
        var me = this;
        var form = me.getFormAdd2(),
            title = me.getFormAddTitle();
            store = me.getDetailGrid().getStore();
        var record = me.getGridMaster().getSelectionModel().getSelection()[0];
        var brand_id = record.data['brand_id'];

        me.showForm(form, title);
        form.getForm().findField('brand_id').setValue(brand_id);
	},
    addServiceCategoryConfirm: function(btn){
        var me = this;
        me.checkSession();

        var actionPanel = me.getActionPanel();
        var formPanel = me.getFormAdd2();
        var grid = me.getDetailGrid();
        var store = grid.getStore();
        var form = formPanel.getForm();
        var record = me.getGridMaster().getSelectionModel().getSelection()[0];
        // check value

        form.submit({
            url: me.getAddRequestUrl_2(),
            method: 'POST',
            success: function() {
                actionPanel.collapse(Ext.Component.DIRECTION_RIGHT, true);
                // 視窗動作
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
    addConfirm: function(btn) {
        var me = this;
        me.checkSession();

        var actionPanel = me.getActionPanel();
        var formPanel = me.getFormAdd();
        var grid = me.getGridMaster();
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
	
    editData: function(btn) {
        var me = this;
        var form = me.getFormEdit(),
            title = me.getFormEditTitle(),
            record = me.getGridMaster().getSelectionModel().getSelection()[0];   

        me.showForm(form, title);
        me.loadFormReocrd(form, record);
    },
    loadFormReocrd: function(form, record) {
        form.loadRecord(record);
    },
    editData2: function(btn) {
        var me = this;
        var form = me.getFormEdit2(),
            title = me.getFormEditTitle(),
            record = me.getDetailGrid().getSelectionModel().getSelection()[0];

        me.showForm(form, title);
        // me.loadFormReocrd(form, record);
        me.loadDetailFormRecord(form, record);
    },

    editConfirm: function(btn) {
        var me = this;
        me.checkSession();

        var actionPanel = me.getActionPanel();
        var formPanel = me.getFormEdit();
        var grid = me.getGridMaster();
        var store = grid.getStore();
        var form = formPanel.getForm();
        var record = grid.getSelectionModel().getSelection()[0];

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
    editServiceCategoryConfirm: function(btn) {
        var me = this;
        me.checkSession();

        var actionPanel = me.getActionPanel();
        var formPanel = me.getFormEdit2();
        var gridDetail = me.getDetailGrid();
        var storeDetail = gridDetail.getStore();
        var form = formPanel.getForm();

        form.submit({
            url: me.getEditRequestUrl_2(),
            method: 'POST',
            success: function(fp, action) {
                actionPanel.collapse(Ext.Component.DIRECTION_RIGHT, true);

                Ext.MessageBox.show({
                    title: MSG['msg_box_info'],
                    msg: MSG['edit2_success'],
                    width: 300,
                    buttons: Ext.MessageBox.OK,
                    fn: function(btn) {
                        if (btn == 'ok') {
                            gridDetail.afterRequest(storeDetail, formPanel);
                        }
                    },
                    icon: Ext.MessageBox.INFO
                });
            },

            failure: function(obj, response) {
                Ext.MessageBox.show({
                    title: MSG['msg_box_error'],
                    msg: response.result.msg,
                    width: 300,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR,
                    fn: function(btn) {
                        if(btn == 'ok') {
                            store.reload();
                        }
                    }
                });
            }
        });
    },
    deleteData_master: function(btn) {
        var me = this;
        me.checkSession();

        var grid = me.getGridMaster(),
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


	FormCancel: function(btn) {
		var me = this;
        var form = btn.up('form');

        me.hideForm(form);
	}
});