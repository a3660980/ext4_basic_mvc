Ext.define('Console.view.AccessSetting.FormAddAccessAccount', {
	extend: 'Console.override.Form',
	alias: 'widget.asformaddaccessaccount',

	requires: ['Ext.layout.container.Anchor'],

	layout: 'anchor',

	initComponent: function() {
		Ext.apply(Ext.form.field.VTypes, {
			// 兩段式密碼輸入驗證
	        password: function( val, field ) {
	            if (field.initialPassField) {
	                var pwd = field.up('asformaddaccessaccount').down('#' + field.initialPassField);
	                return (val == pwd.getValue());
	            }
	            return true;
	        },

	        passwordText: MSG['confirm_password_wrong']
	    });

        var me = this;
        //get autocomplete store
        var autocompleteStore = Ext.create('Console.store.AccessSetting.CpsUserAccount');

		Ext.apply(me, {
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
                    name: 'user_name',
                    fieldLabel: MSG['user_name'],
                    allowBlank: false
                }, {
                    id: 'as-form-add-account-password',
                    inputType: 'password',
                    name: 'password',
                    fieldLabel: MSG['password'],
                    allowBlank: false,
                    action: 'valid_password',
                }, {
                    inputType: 'password',
                    name: 'password_again',
                    fieldLabel: MSG['password_again'],
                    allowBlank: false,
                    vtype: 'password',
                    initialPassField: 'as-form-add-account-password'
                }, {
    				name: 'name',
    				fieldLabel: MSG['name'],
                    allowBlank: false
    			}, {
    				name: 'department',
    				fieldLabel: MSG['department'],
                    allowBlank: false
    			}, {
    				name: 'title',
    				fieldLabel: MSG['title']
    			}, {
    				name: 'mobile_phone',
    				fieldLabel: MSG['mobile_phone'],
                    minLength: 10,
                    vtype: 'cellphone',
                    allowBlank: false
    			}, {
    				name: 'email',
    				fieldLabel: MSG['email'],
                    vtype: 'email',
                    allowBlank: false
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
    				action: 'form_add_access_account_confirm'
    			}, {
    				text: MSG['cancel'],
    				action: 'form_add_access_account_cancel'
    			}
			]
		});

		me.callParent(arguments);
	}
});