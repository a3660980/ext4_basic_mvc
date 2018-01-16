Ext.define('Console.view.ChangePassword.FormChangePassword', {
	extend: 'Ext.form.Panel',
	alias: 'widget.cpformchangepassword',
	bodyPadding: 10,
	width: 800,

	initComponent: function() {
		Ext.apply(Ext.form.field.VTypes, {
			// 兩段式密碼輸入驗證
	        password: function( val, field ) {
	            if (field.initialPassField) {
	                var pwd = field.up('fieldset').down('#' + field.initialPassField);
	                return (val == pwd.getValue());
	            }
	            return true;
	        },

	        passwordText: MSG['confirm_password_wrong']
	    });

		Ext.applyIf(this, {
			fieldDefaults: {
				msgTarget: 'side',
	            autoFitErrors: false,
				labelAlign: 'right',
				labelWidth: 120,
				labelStyle: 'font-weight:bold;'
            },
			items: [
    			{
    				xtype: 'fieldset',
    				title: MSG['user_profile'],
    				layout: 'anchor',
    				defaults: {anchor: '100%'},
    				items: [
        				{
        					xtype: 'container',
        					layout: 'hbox',
        					defaultType: 'displayfield',
        					items: [
            					{
            						name: 'user_name',
            						fieldLabel: MSG['user_name'],
            						flex: 1
            					}, {
            						name: 'name',
            						fieldLabel: MSG['name'],
            						flex: 1
            					}
        					]
        				}, {
        					xtype: 'container',
        					layout: 'hbox',
        					defaultType: 'displayfield',
        					items: [
            					{
            						name: 'department',
            						fieldLabel: MSG['department'],
            						flex: 1
            					}, {
            						name: 'title',
            						fieldLabel: MSG['title'],
            						flex: 1
            					}
        					]
        				}, {
        					xtype: 'container',
        					layout: 'hbox',
        					defaultType: 'displayfield',
        					items: [
            					{
            						name: 'mobile_phone',
            						fieldLabel: MSG['mobile_phone'],
            						flex: 1
            					}, {
            						name: 'email',
            						fieldLabel: MSG['email'],
            						flex: 1
            					}
        					]
        				}, {
        					xtype: 'container',
        					layout: 'hbox',
        					defaultType: 'displayfield',
        					items: [
            					{
            						name: 'created_date',
            						fieldLabel: MSG['created_date'],
            						flex: 1
            					}
        					]
        				}, {
        					xtype: 'displayfield',
        					name: 'authorization_item',
        					fieldLabel: MSG['authorization_item']
        				}
    				]
    			}, {
    				xtype: 'fieldset',
    				title: MSG['change_password'],
    				layout: 'anchor',
    				defaults: {
    					anchor: '100%',
    					inputType: 'password'
    				},
    				defaultType: 'textfield',
    				items: [
        				{
        					name: 'old_password',
        					fieldLabel: MSG['old_password'],
                            minLnegth: 5
        				}, {
        					id: 'cp-form-new-password',
        					name: 'new_password',
        					fieldLabel: MSG['new_password'],
        					action: 'valid_new_password',
                            minLnegth: 5
        				}, {
        					name: 'new_password_again',
        					fieldLabel: MSG['new_password_again'],
        					vtype: 'password',
        					initialPassField: 'cp-form-new-password',
                            minLnegth: 5
        				}, {
        					xtype: 'container',
        					layout: {
        						type: 'hbox',
        						padding: 5
        					},
        					defaultType: 'button',
        					defaults: {margin:'0 5 0 0'},
        					items: [
            					{
            						text: MSG['change_password_confirm'],
            						action: 'form_change_password_confirm'
            					}, {
            						text: MSG['cancel'],
            						action: 'form_change_password_cancel'
            					}
        					]
        				}
    				]
    			}
			]
		});

		this.callParent(arguments);
	}
});