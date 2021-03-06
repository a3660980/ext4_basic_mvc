Ext.define('Console.view.HotelDetail.FormEdit', {
    extend: 'Console.override.Form',
    alias: 'widget.hotdetformedit',

    requires: ['Ext.layout.container.Anchor'],

    layout: 'anchor',
    
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
                    name: 'detail_id',
                    fieldLabel: MSG['detail_id'],
                    allowBlank: false,
                    hidden: true
                }, {
                    name: 'room_name',
                    fieldLabel: MSG['room_name'],
                    xtype: 'displayfield'
                }, {
                    name: 'room_spec',
                    fieldLabel: MSG['room_spec'],
                    xtype: 'displayfield'
                }, {
                    name: 'detail_sort',
                    fieldLabel: MSG['detail_sort'],
                    xtype: 'numberfield',
                    maxLength: 10,
                    minValue: 10,
                    editable: false
                }, {
                    name: 'detail_photo',
                    fieldLabel: MSG['detail_photo'],
                    maxLength: 200,
                    xtype: 'filefield',
                    emptyText: '請上傳1080X1080px的照片'
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