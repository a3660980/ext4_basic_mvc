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
                    name: 'photo_url',
                    fieldLabel: MSG['photo_url'],
                    maxLength: 200,
                    xtype: 'filefield',
                    emptyText: '請上傳1080X1920px的照片'
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