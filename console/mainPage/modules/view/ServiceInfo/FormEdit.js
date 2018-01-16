Ext.define('Console.view.ServiceInfo.FormEdit', {
	extend: 'Console.override.Form',
	alias: 'widget.siformedit',

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
                    xtype: 'displayfield',
                    name: 'service_code',
                    fieldLabel: MSG['service_code']//,
                    // maxLength: 8,
                    // allowBlank: false
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
                    editable: false   
                }, {
                    xtype: 'filefield',
                    name:'service_icon',
                    fieldLabel: MSG['service_icon'],
                    allowBlank: true
                }, {
                    xtype: 'displayfield',
                    fieldLabel: '圖片顯示',
                    flex:1
                }, {
                    xtype: 'image',
                    itemId:'service_icon',
                    renderPicture: true,
                    anchor: null
                } 

			],
			bbar: [
    			{
    				text: MSG['confirm'],
                    action: 'form_edit_confirm'
    			}, {
    				text: MSG['cancle'],
                    action: 'form_edit_cancel'
    			}
			]
		});

		me.callParent(arguments);
	}
});