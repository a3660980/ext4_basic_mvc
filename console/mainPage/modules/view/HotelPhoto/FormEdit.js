Ext.define('Console.view.HotelPhoto.FormEdit', {
    extend: 'Console.override.Form',
    alias: 'widget.hotphoformedit',

    requires: ['Ext.layout.container.Anchor'],

    layout: 'anchor',
    
    config: {
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
                    name: 'branch_photo_id',
                    fieldLabel: MSG['branch_photo_id'],
                    allowBlank: false,
                    maxLength: 36,
                    hidden: true
                }, {
                    name: 'branch_id',
                    fieldLabel: MSG['branch_id'],
                    allowBlank: false,
                    maxLength: 36,
                    hidden: true
                }, {
                    name: 'photo_sort',
                    fieldLabel: MSG['photo_sort'],
                    xtype: 'numberfield',
                    maxLength: 10,
                    minValue: 10,
                    editable: false
                }, {
                    name: 'photo_name',
                    fieldLabel: MSG['photo_name'],
                    allowBlank: false,
                    maxLength: 50,
                }, {
                    name: 'photo_url',
                    fieldLabel: MSG['photo_url'],
                    maxLength: 200,
                    xtype: 'filefield',
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