Ext.define('Console.view.AccessSetting.FormEditAccessAccount', {
	extend: 'Console.override.Form',
	alias: 'widget.asformeditaccessaccount',

	requires: ['Ext.layout.container.Anchor'],

	layout: 'anchor',

	initComponent: function() {
        var me = this;

		Ext.apply(me, {
			id: 'form-as-edit-access-account',
			width: 450,
			bodyPadding: 5,
            autoScroll: true,
			defaults: {
                anchor: '100%'
            },
			defaultType: 'textfield',
			fieldDefaults: {
	            msgTarget: 'under',
	            autoFitErrors: false
	        },
			items: [
    			{
    				xtype: 'displayfield',
    				name: 'user_name',
    				fieldLabel: MSG['user_name'],
                    // minLength: 5
    			}, {
    				name: 'name',
    				fieldLabel: MSG['name'],
    				readOnly: false
    			}, {
    				name: 'department',
    				fieldLabel: MSG['department'],
    				readOnly: false
    			}, {
    				name: 'title',
    				fieldLabel: MSG['title'],
    				readOnly: false
    			}, {
    				name: 'mobile_phone',
    				fieldLabel: MSG['mobile_phone'],
                    minLength: 10,
                    vtype: 'cellphone',
    				readOnly: false
    			}, {
    				name: 'email',
    				fieldLabel: MSG['email'],
                    vtype: 'email',
    				readOnly: false
    			}, {
    				xtype: 'treecombo',
                    name: 'authorization_item',
                    allowBlank: false,
                    fieldLabel: MSG['authorization_item'],
                    store: 'Console.store.AccessSetting.AuthorizationItem',
                    forceSelection: true,
                    rootVisible: false,
                    displayField: 'text_big5',
                    valueField: 'id',
                    allowBlank: false
    			}
			],
			bbar: [
    			{
    				text: MSG['confirm'],
    				action: 'form_edit_access_account_confirm'
    			}, {
    				text: MSG['cancel'],
    				action: 'form_edit_access_account_cancel'
    			}
			]
		});

		me.callParent(arguments);
	}
});