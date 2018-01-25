Ext.define('Console.view.HotelHomepage.FormAdd', {
    extend: 'Console.override.Form',
    alias: 'widget.hothomformadd',

    requires: ['Ext.layout.container.Anchor'], //anchor可讓元件大小隨容器改變

    layout: 'anchor',

    config: {
        UserI18n: 'HotelHomepage.UserI18n'
    },

    initComponent: function() {
        var me = this;

        Ext.apply(me, {
            width: 450,
            bodyPadding: 5,
            autoScroll: false, //true形成卷軸
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
                    name: 'home_sort',
                    fieldLabel: MSG['home_sort'],
                    xtype: 'numberfield',
                    maxLength: 10,
                    allowBlank: false,
                    minValue: 10,
                    value: 10,
                    editable: false
                }, {
                    name: 'home_photo',
                    fieldLabel: MSG['home_photo'],
                    maxLength: 200,
                    xtype: 'filefield',
                    allowBlank: false,
                    emptyText: '請上傳1080X1920px的照片'
                }, {
                    name: 'start_date',
                    fieldLabel: MSG['start_date'],
                    allowBlank: false,
                    xtype: 'datefield',
                    format: 'Y-m-d',
                    editable: false
                }, {
                    xtype: 'timefield',
                    name: 'start_time',
                    fieldLabel: MSG['start_time'],
                    allowBlank: false,
                    increment: 1,
                    editable: false,
                    format: 'H:i'
                }, {
                    name: 'expire_date',
                    fieldLabel: MSG['expire_date'],
                    allowBlank: true,
                    xtype: 'datefield',
                    format: 'Y-m-d',
                    editable: false
                }, {
                    xtype: 'timefield',
                    name: 'expire_time',
                    fieldLabel: MSG['expire_time'],
                    increment: 1,
                    editable: false,
                    format: 'H:i'
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