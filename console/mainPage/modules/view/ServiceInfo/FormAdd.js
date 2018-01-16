Ext.define('Console.view.ServiceInfo.FormAdd', {
	extend: 'Console.override.Form',
	alias: 'widget.siformadd',

	requires: ['Ext.layout.container.Anchor'],

	layout: 'anchor',
    config: {
        comboboxStore: 'ServiceInfo.ServiceInfoLang'
    },
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
                     name: 'service_id',
                     hidden: true
                }, {
                    name: 'service_code',
                    fieldLabel: MSG['service_code'],
                    maxLength: 8,
                    allowBlank: false
                }, {
    				name: 'service_name',
    				fieldLabel: MSG['service_name'],
                    maxLength: 50,
    				allowBlank: false
    			}, {
                    xtype: 'textarea',
    				name:'service_introduction',
    				fieldLabel: MSG['service_introduction'],
                    maxLength: 200,
                    allowBlank: true
                    
    			}, {
    				xtype: 'filefield',
                    name:'service_icon',
    				fieldLabel: MSG['service_icon'],
                    allowBlank: false
    			}, {
    				xtype: 'numberfield',
                    name: 'service_sort',
                    fieldLabel: MSG['service_sort'],
                    value: 10,
                    minValue: 10,
                    maxValue: 127,
                    allowBlank: true
    			// }, {
       //              name:'service_url',
       //              fieldLabel: MSG['service_url'],
       //              maxLength: 500,
       //              allowBlank: true
                }, {
                    xtype: 'combo',
                    name: 'service_identity',
                    fieldLabel: MSG['service_identity'],
                    allowBlank: true,
                    store: me.getComboboxStore(),  
                    queryMode: 'remote',
                    displayField: 'display',
                    valueField: 'service_identity',
                    value: '0',
                    display:'預設',   
                    editable: false   
                }
			],
			bbar: [
    			{
    				text: MSG['confirm'],
                    action: 'form_add_confirm'
    			}, {
    				text: MSG['cancle'],
                    action: 'form_add_cancel'
    			}
			]
		});

		me.callParent(arguments);
	}
});