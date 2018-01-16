Ext.define('Console.controller.AccessSetting', {
	extend: 'Ext.app.Controller',

	stores: [
		'AccessSetting.CpsUserProfile',
		'AccessSetting.AuthorizationItem',
		'AccessSetting.CpsUserAccount'
	],
    models: [
		'AccessSetting.CpsUserProfile',
		'AccessSetting.AuthorizationItem',
		'AccessSetting.CpsUserAccount'
	],

	views: [
		'AccessSetting.TabPanel',
		'AccessSetting.ActionPanel',
		'AccessSetting.GridMaster',
		'AccessSetting.FormAddAccessAccount',
		'AccessSetting.FormEditAccessAccount'
	],

	init: function() {
        var me = this;

		me.control({
			'asgridmaster': {
				select: this.selectMasterRecord
			},
			'asgridmaster button[action=add_access_account]': {
				click: this.showFormAddAccessAccount
			},
			'asgridmaster button[action=edit_access_account]': {
				click: this.showFormEditAccessAccount
			},
			'asgridmaster button[action=delete_access_account]': {
				click: this.deleteAccessAccount
			},
			'asformaddaccessaccount textfield[action=valid_password]': {
				validitychange: this.validPassword,
				blur: this.validPassword
			},
			'asformaddaccessaccount button[action=form_add_access_account_cancel]': {
				click: this.hideCollapseFormAddAccessAccount
			},
			'asformaddaccessaccount button[action=form_add_access_account_confirm]': {
				click: this.addAccessAccount
			},
			'asformeditaccessaccount button[action=form_edit_access_account_cancel]': {
				click: this.hideCollapseFormEditAccessAccount
			},
			'asformeditaccessaccount button[action=form_edit_access_account_confirm]': {
				click: this.editAccessAccount
			}
		});
	},

	validPassword: function(field) {
		field.next().validate();
	},

	selectMasterRecord: function(obj, record, index, eOpts) {

		var formEditAccessAccount = Ext.getCmp('form-as-edit-access-account');
		formEditAccessAccount.loadRecord(record);

		// treecombo需自行另外設定值
		formEditAccessAccount.down('treecombo').setValue(record.get('authorization_item'));
	},

	showHideForm: function(btnClick, xtypeShowForm, xtypeButtonFromGrid, title) {
		var grid = btnClick.up(xtypeButtonFromGrid);
		var actionPanel = grid.up('astabpanel').down('asactionpanel');

		// 所有的form都必須在這邊宣告
		var formAddAccessAccount = actionPanel.down('asformaddaccessaccount');
		var formEditAccessAccount = actionPanel.down('asformeditaccessaccount');

		var formNeedShow = actionPanel.down(xtypeShowForm);
		var recordSelected = grid.getSelectionModel().getSelection()[0];

		var isCollapse = actionPanel.getCollapsed();
		var isFormHide = formNeedShow.isHidden();
		// hide form(s): 所有form都必須在這邊判斷
		if (xtypeShowForm != 'asformaddaccessaccount') {
			formAddAccessAccount.getForm().reset();
			formAddAccessAccount.hide();
		} else if(xtypeShowForm != 'asformeditaccessaccount') {
			formEditAccessAccount.getForm().reset();
			formEditAccessAccount.hide();
		}
		// set form values
		if (xtypeShowForm == 'asformeditaccessaccount') {
			formNeedShow.loadRecord(recordSelected);
		}

		// show or hide field
		// 定義需隱藏的欄位或fieldset等等
		// show form
		if (isFormHide) {
			formNeedShow.show();
		}
		actionPanel.setTitle(MSG[title]);
		actionPanel.doLayout();
		if (isCollapse) {
			actionPanel.expand(true);
		}
	},

	showFormAddAccessAccount: function(btn) {
		this.showHideForm(btn, 'asformaddaccessaccount', 'asgridmaster', 'add_access_account');
	},

	showFormEditAccessAccount: function(btn) {
		this.showHideForm(btn, 'asformeditaccessaccount', 'asgridmaster', 'edit_access_account');
	},

	resetHideFormCollapseActionPanel: function(actionPanel, formPanel) {
		actionPanel.setTitle('');
		actionPanel.collapse(Ext.Component.DIRECTION_RIGHT, true);
		formPanel.getForm().reset();
        this.resetTreeCombos(formPanel);
		formPanel.hide();
		actionPanel.doLayout();
	},

    resetTreeCombos: function(formPanel) {
        var treecombos = formPanel.query('treecombo');
        Ext.each(treecombos, function(combo) {
            combo.resetValue();
        });
    },

	addAccessAccount: function(btn) {
		// 檢查session是否還存在
		var isSessionExist = this.getController('Viewport').checkUserSessionExist();
		if(!isSessionExist)	return;

		var me = this;
		var formPanel = btn.up('asformaddaccessaccount');
        var form = formPanel.getForm();
		var actionPanel = formPanel.up('asactionpanel');
		var gridMaster = actionPanel.up('astabpanel').down('asgridmaster');
        var store = gridMaster.getStore();;

        if (! form.isValid()) {
            return;
        }

		formPanel.getForm().submit({
			url: './modules/source/controller/AccessSetting/addAccessAccount.php',
			method: 'POST',
			params: {
				corp_id: SES['corp_id']
			},
			success: function(form, action) {
				Ext.MessageBox.show({
					title: MSG['msg_box_info'],
					msg: MSG['add_success'],
					width: 300,
					buttons: Ext.MessageBox.OK,
					fn: function(btn) {
						if (btn == 'ok') {
							me.resetHideFormCollapseActionPanel(actionPanel, formPanel);
                            gridMaster.afterRequest(store, formPanel);
						}
					},
					icon: Ext.MessageBox.INFO
				});
			},
			failure: function(form, action) {
				var error_msg = null;

				switch (action.failureType) {
					case Ext.form.action.Action.CLIENT_INVALID:
						error_msg = 'form_invalid';
						break;
					case Ext.form.action.Action.CONNECT_FAILURE:
						error_msg = 'server_connect_fail';
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

	hideCollapseFormAddAccessAccount: function(btn) {
		var formPanel = btn.up('asformaddaccessaccount');
		var actionPanel = formPanel.up('asactionpanel');
		var treeComboField = formPanel.down('treecombo');

		this.resetHideFormCollapseActionPanel(actionPanel, formPanel);
		// treecombo需自行呼叫reset方法
		treeComboField.reset();
	},

	hideCollapseFormEditAccessAccount: function(btn) {
		var formPanel = btn.up('asformeditaccessaccount');
		var actionPanel = formPanel.up('asactionpanel');
		var treeComboField = formPanel.down('treecombo');

		this.resetHideFormCollapseActionPanel(actionPanel, formPanel);
		// treecombo需自行呼叫reset方法
		treeComboField.reset();
	},

	editAccessAccount: function(btn) {
		// 檢查session是否還存在
		var isSessionExist = this.getController('Viewport').checkUserSessionExist();
		if(!isSessionExist)	return;

		var me = this;
		var formPanel = btn.up('asformeditaccessaccount');
        var form = formPanel.getForm();
		var actionPanel = formPanel.up('asactionpanel');
		var gridMaster = actionPanel.up('astabpanel').down('asgridmaster');
        var store = gridMaster.getStore();

        if (! form.isValid()) {
            return;
        }
		formPanel.getForm().submit({
			url: './modules/source/controller/AccessSetting/editAccessAccount.php',
			method: 'POST',
			params: {
				corp_id: gridMaster.getSelectionModel().getSelection()[0].get('corp_id'),
				user_name: gridMaster.getSelectionModel().getSelection()[0].get('user_name')
			},
			success: function(form, action) {
				Ext.MessageBox.show({
					title: MSG['msg_box_info'],
					msg: MSG['edit2_success'],
					width: 300,
					buttons: Ext.MessageBox.OK,
					fn: function(btn) {
						if (btn == 'ok') {
							me.resetHideFormCollapseActionPanel(actionPanel, formPanel);
							gridMaster.afterRequest(store, formPanel);
						}
					},
					icon: Ext.MessageBox.INFO
				});
			},
			failure: function(form, action) {
				var error_msg = null;

				switch (action.failureType) {
					case Ext.form.action.Action.CLIENT_INVALID:
						error_msg = 'form_invalid';
						break;
					case Ext.form.action.Action.CONNECT_FAILURE:
						error_msg = 'server_connect_fail';
						break;
					case Ext.form.action.Action.SERVER_INVALID:
						error_msg = action.result.msg;
						break;
				}

				Ext.MessageBox.show({
					title: MSG['msg_box_error'],
					msg: MSG['edit2_fail'] + '<br />' + MSG[error_msg],
					width: 300,
					buttons: Ext.MessageBox.OK,
					icon: Ext.MessageBox.ERROR
				});
			}
		});
	},

	deleteAccessAccount: function(btn) {
		// 檢查session是否還存在
		var isSessionExist = this.getController('Viewport').checkUserSessionExist();
		if (! isSessionExist) return;

		var store 	= Ext.getCmp('asgridmaster').store,
			grid  	= btn.up('asgridmaster'),
			record 	= grid.getSelectionModel().getSelection(),
            length = record.length,
			me 		= this;

		Ext.MessageBox.show({
			title: MSG['msg_box_info'],
			msg: MSG['delete_confirm_header'] + length + MSG['delete_confirm_footer'],
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
										store.reload();
									}
								},
								icon: Ext.MessageBox.INFO
							});

                            me.getController('Viewport').checkUserSessionExist();
						},

						failure: function() {
							Ext.MessageBox.show({
								title: MSG['msg_box_info'],
								msg: MSG['delete_fail'],
								width: 300,
								buttons: Ext.MessageBox.OK
							});
                            store.reload();
						}
					});
				}
			}
		});
	},

	hideCollapseFormPlatform: function(btn) {
		var formPanel = btn.up('asformeditaccessaccount');
		var actionPanel = formPanel.up('asactionpanel');

		this.resetHideFormCollapseActionPanel(actionPanel, formPanel);
	}
});