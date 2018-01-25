Ext.define('Console.view.HotelHomepage.FormEdit', {
    extend: 'Console.override.Form',
    alias: 'widget.hothomformedit',

    requires: ['Ext.layout.container.Anchor'],

    layout: 'anchor',
    
    config: {
        HomeSort: 'HotelHomepage.HomeSort',
        UserI18n: 'HotelHomepage.UserI18n'
    },
     initComponent: function() {

        var me = this;

        Ext.apply(me, {
            width: 450,
            bodyPadding: 10,
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
                    name: 'home_id',
                    fieldLabel: MSG['home_id'],
                    allowBlank: false,
                    maxLength: 36,
                    hidden: true
                }, {
                    name: 'home_sort',
                    fieldLabel: MSG['home_sort'],
                    xtype: 'numberfield',
                    maxLength: 10,
                    allowBlank: false,
                    minValue: 10,
                    editable: false
                }, {
                    name: 'home_name',
                    fieldLabel: MSG['home_name'],
                    allowBlank: false,
                    maxLength: 50,
                }, {
                    name: 'home_photo',
                    fieldLabel: MSG['home_photo'],
                    maxLength: 200,
                    xtype: 'filefield',
                    emptyText: '請上傳1080X1920px的照片'
                }, {
                    
                    name:'user_i18n',
                    fieldLabel: MSG['user_i18n'],
                    allowBlank: true,
                    xtype: 'combo',
                    store: me.getUserI18n(),
                    queryMode: 'local',
                    displayField: 'display',
                    valueField: 'value',
                    editable: false,
                    multiSelect: false,            
                }, {
                    name: 'start_date',
                    fieldLabel: MSG['start_date'],
                    allowBlank: false,
                    xtype: 'datefield',
                    format: 'Y-m-d',
                    editable: false
                },{
                    name: 'expire_date',
                    fieldLabel: MSG['expire_date'],
                    allowBlank: true,
                    xtype: 'datefield',
                    format: 'Y-m-d',
                    editable: false
                }
            ],
            bbar: [
                {
                    text: MSG['confirm'],
                    action: 'form_edit_confirm',
                }, {
                    text: MSG['cancel'],
                    action: 'form_edit_cancel'
                }
            ]
        });

        me.callParent(arguments);
    }
});