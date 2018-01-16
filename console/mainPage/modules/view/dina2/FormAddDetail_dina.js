Ext.define('Console.view.dina2.FormAddDetail_dina', {
    extend: 'Console.override.Form',
    alias: 'widget.dinformadddetail',

    requires: ['Ext.layout.container.Anchor'], //anchor可讓元件大小隨容器改變

    layout: 'anchor',

  
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
                    name: 'p_name',
                    fieldLabel: MSG['p_name'],
                    maxLength: 10,
                    hidden: true
                },{
                    name: 'e_name',
                    fieldLabel: MSG['e_name'],
                    maxLength: 10,
                    allowBlank: false
                },  {
                    name: 'personality',
                    fieldLabel: MSG['personality'],
                    maxLength: 100,
                    allowBlank: false
                }, {
                    name: 'luckycolor',
                    fieldLabel: MSG['luckycolor'],
                    maxLength: 20,
                    allowBlank: false
                }, {
                    name: 'the_ruler',
                    fieldLabel: MSG['the_ruler'],
                    maxLength: 10,
                    allowBlank: true
                }
            ],
            bbar: [ //確認 取消
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