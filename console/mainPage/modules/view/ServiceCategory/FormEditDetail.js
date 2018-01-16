Ext.define('Console.view.ServiceCategory.FormEditDetail', {
	extend: 'Console.override.Form',
	alias: 'widget.scyformeditdetail',

	requires: ['Ext.layout.container.Anchor'],
    config: {
        comboboxStore: 'ServiceCategory.ServiceCategoryLang',
        comboboxStore2:'ServiceCategory.ServiceInfoLang'
    },
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
       //      items: [
       //          {
       //               name: 'category_id',
       //               hidden: true
       //          }, {
       //              name: 'service_id',
       //               hidden: true
       //          },, {
       //              name: 'category_code',
       //              fieldLabel: MSG['category_code'],
       //              maxLength: 8,
       //              allowBlank: false
       //          }, {
       //              name: 'category_name',
       //              fieldLabel: MSG['category_name'],
       //              maxLength: 50,
       //              allowBlank: false
       //          }, {
       //              name:'category_introduction',
       //              fieldLabel: MSG['category_introduction'],
       //              maxLength: 200,
       //              allowBlank: true
                    
       //          }, {
       //              xtype: 'numberfield',
       //              name: 'category_sort',
       //              fieldLabel: MSG['category_sort'],
       //              value: 10,
       //              minValue: 10,
       //              maxValue: 127,
       //              allowBlank: true
       //          // }, {
       // //              name:'service_url',
       // //              fieldLabel: MSG['service_url'],
       // //              maxLength: 500,
       // //              allowBlank: true
       //          }, {
       //              xtype: 'numberfield',
       //              name: 'category_identity',
       //              fieldLabel: MSG['category_identity'],
       //              value: 1,
       //              minValue: 0,
       //              maxValue: 5,
       //              allowBlank: true
       //          }, {
       //              xtype: 'container',
       //              fieldLabel: MSG['category_identity'],
       //              html: [
       //                  '<div>',
       //                  '<p>服務識別：0=系統、1=消費者、2=司機、3=車行、4=企業、5=全鋒。</p>',
       //                  '</div>'
       //              ].join('')
       //          }, {
       //              xtype: 'filefield',
       //              name:'category_icon',
       //              fieldLabel: MSG['category_icon'],
       //              allowBlank: true
       //          }, {
       //              xtype: 'displayfield',
       //              fieldLabel: '圖片顯示',
       //              flex:1
       //          }, {
       //              xtype: 'image',
       //              itemId:'category_icon',
       //              renderPicture: true,
       //              anchor: null
       //          } 

       //      ],
        items: [
                {
                     name: 'category_id',
                     hidden: true
                }, {
                    name: 'service_id',
                     hidden: true
                }, {  
                    xtype: 'displayfield',                  
                    name: 'category_code',
                    fieldLabel: MSG['category_code']//,
                    // maxLength: 8,
                    // allowBlank: false
                },{
                    name: 'category_name',
                    fieldLabel: MSG['category_name'],
                    maxLength: 50,
                    allowBlank: false
                },  {
                    name:'category_introduction',
                    fieldLabel: MSG['category_introduction'],
                    maxLength: 200,
                    allowBlank: true
                    
                }, {
                    xtype: 'filefield',
                    name:'category_icon',
                    fieldLabel: MSG['category_icon'],
                    allowBlank: true
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
                    queryMode: 'remote',
                    displayField: 'display',
                    valueField: 'category_identity' ,                       
                    editable: false
                }, {
                    xtype: 'displayfield',
                    fieldLabel: '圖片顯示',
                    flex:1
                }, {
                    xtype: 'image',
                    itemId:'category_icon',
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