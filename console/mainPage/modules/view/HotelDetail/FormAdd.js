Ext.define('Console.view.HotelDetail.FormAdd', {
    extend: 'Console.override.Form',
    alias: 'widget.hotdetformadd',

    requires: ['Ext.layout.container.Anchor'], //anchor可讓元件大小隨容器改變

    layout: 'anchor',

    config: {
        RoomId: 'HotelDetail.RoomId'
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
            defaultType: 'textfield', //類型
            fieldDefaults: {        //屬性類別
                msgTarget: 'under',
                autoFitErrors: false //展示错誤信息時是否自動调整字段组件宽度 
            },
            items: [ //欄位項目
                {
                    name: 'branch_id',
                    fieldLabel: MSG['branch_id'],
                    maxLength: 36,
                    allowBlank: false,
                    hidden: true
                }, {
                    name: 'room_id',
                    action: 'room_id',
                    itemId: 'hotdetadd_room_id',
                    fieldLabel: MSG['room_name'],
                    xtype: 'combobox',
                    displayField: 'room_name',
                    valueField: 'room_id',
                    store: me.getRoomId(),
                    editable: false,
                    allowBlank: false,
                }, {
                    name: 'detail_sort',
                    fieldLabel: MSG['detail_sort'],
                    xtype: 'numberfield',
                    maxLength: 10,
                    minValue: 10,
                    value: 10,
                    editable: false
                }, {
                    name: 'detail_photo',
                    fieldLabel: MSG['detail_photo'],
                    maxLength: 200,
                    xtype: 'filefield',
                    allowBlank: false,
                    emptyText: '請上傳1080X1080px的照片'
                }
            ],
            bbar: [ //確認 取消
                {
                    text: MSG['confirm'],
                    action: 'form_add_confirm'
                }, {
                    text: MSG['cancel'],
                    action: 'form_add_cancel'
                }
            ]
        });

        me.callParent(arguments);
    }
});