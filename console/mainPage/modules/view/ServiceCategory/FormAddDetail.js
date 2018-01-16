Ext.define('Console.view.ServiceCategory.FormAddDetail', {
	extend: 'Console.override.Form',
	alias: 'widget.scyformadddetail',

	requires: ['Ext.layout.container.Anchor'],

	layout: 'anchor',

    config: {
        comboboxStore: 'ServiceCategory.ServiceCategoryLang'
    },

	initComponent: function() {
        var me = this;

        Ext.apply(me, {
            width: 550,
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
                     name: 'category_id',
                     hidden: true
                }, {
                    name: 'service_id',
                     hidden: true
                }, {                    
                    name: 'category_code',
                    fieldLabel: MSG['category_code'],
                    maxLength: 8,
                    allowBlank: false
                },{
                    name: 'category_name',
                    fieldLabel: MSG['category_name'],
                    maxLength: 50,
                    allowBlank: false
                }, {
                    name:'category_introduction',
                    fieldLabel: MSG['category_introduction'],
                    maxLength: 200,
                    allowBlank: true
                    
                }, {
                    xtype: 'filefield',
                    name:'category_icon',
                    fieldLabel: MSG['category_icon'],
                    allowBlank: false
                }, {
                    xtype: 'numberfield',
                    name: 'category_sort',
                    fieldLabel: MSG['category_sort'],
                    value: 10,
                    minValue: 10,
                    maxValue: 127,
                    allowBlank: true

                }, {
                    xtype: 'combo',
                    name: 'category_identity',
                    fieldLabel: MSG['category_identity'],
                    allowBlank: true,
                    store: me.getComboboxStore(),  
                    queryMode: 'remote',//查詢模式
                    displayField: 'display',
                    valueField: 'category_identity',
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