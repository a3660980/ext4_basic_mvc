Ext.define('Console.view.SystemConfiguration.FormEditPlatform', {
	extend: 'Console.override.Form',
	alias: 'widget.scformeditplatform',

	requires: ['Ext.layout.container.Anchor'],

	layout: 'anchor',

	initComponent: function() {
        var me = this;

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
                    name: 'app_platform_id',
                    hidden: true
                }, {
                    name: 'app_package_type',
                    hidden: true
                }, {
    				name: 'app_push_payload',
    				fieldLabel: MSG['app_push_payload'],
    				allowBlank: true
    			}, {
    				id: 'app-push-setting-ios',
    				xtype: 'fieldset',
    				title: MSG['app_push_setting_ios'],
    				layout: 'anchor',
    				defaultType: 'textfield',
    				defaults: {anchor: '100%'},
    				items: [
        				{
        					name: 'certificate_url',
        					fieldLabel: MSG['certificate_url'],
        					allowBlank: true
        				}, {
        					name: 'certificate_password',
        					fieldLabel: MSG['certificate_password'],
        					allowBlank: true
        				}, {
        					xtype: 'radiogroup',
        					fieldLabel: MSG['production'],
        					cls: 'x-check-group-alt',
        					items: [
            					{
            						boxLabel: 'T',
            						name: 'production',
            						inputValue: 'T',
            						checked: true
            					}, {
            						boxLabel: 'F',
            						name: 'production',
            						inputValue: 'F'
            					}
        					]
        				}
    				]
    			}, {
    				id: 'app-push-setting-android',
    				xtype: 'fieldset',
    				title: MSG['app_push_setting_android'],
    				layout: 'anchor',
    				defaultType: 'textfield',
    				defaults: {
                        anchor: '100%'
                    },
    				items: [
        				{
        					name: 'api_key',
        					fieldLabel: MSG['api_key'],
        					allowBlank: true
        				}
    				]
    			}
			],
			bbar: [
    			{
    				text: MSG['edit2'],
    				action: 'form_edit_platform_confirm'
    		    }, {
    				text: MSG['cancel'],
    				action: 'form_edit_platform_cancel'
    			}
			]
		});

		me.callParent(arguments);
	}
});