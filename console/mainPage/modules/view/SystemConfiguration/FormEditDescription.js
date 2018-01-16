Ext.define('Console.view.SystemConfiguration.FormEditDescription', {
	extend: 'Ext.form.Panel',
	alias: 'widget.scformeditdescription',

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
                    name: 'device_app_id',
                    hidden: true
                }, {
    				name: 'contact_department',
    				fieldLabel: MSG['contact_department'],
    				allowBlank: true
    			}, {
    				name: 'contact_title',
    				fieldLabel: MSG['contact_title'],
    				allowBlank: true
    			}, {
    				name: 'contact_name',
    				fieldLabel: MSG['contact_name'],
    				allowBlank: true
    			}, {
    				name: 'contact_phone',
    				fieldLabel: MSG['contact_phone'],
                    vtype: 'cellphone',
    				allowBlank: true
    			}, {
    				name: 'contact_mobile',
    				fieldLabel: MSG['contact_mobile'],
                    vtype: 'cellphone',
    				allowBlank: true
    			}, {
    				name: 'contact_email',
    				fieldLabel: MSG['contact_email'],
    				vtype: 'email',
    				allowBlank: true
    			}
			],
			bbar: [
    			{
    				text: MSG['edit2'],
    				action: 'form_edit_description_confirm'
    			}, {
    				text: MSG['cancel'],
    				action: 'form_edit_description_cancel'
    			}
			]
		});

		me.callParent(arguments);
	}
});