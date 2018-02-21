Ext.define('Console.view.zoe_detail.DetailFormEdit_zoe', {
    extend: 'Console.override.Form',
    alias: 'widget.zoedetailformedit',

    requires: ['Ext.layout.container.Anchor'], //anchor可讓元件大小隨容器改變

    layout: 'anchor',

    initComponent: function(){
        var me = this;
        
        Ext.apply(me,{
            width:250,
            bodyPadding:5,
            autoScroll:false,
            defaults:{
                anchor:'100%'
            },
            defaultType: 'textfield', //類型
            fieldDefaults: {        //屬性類別
                msgTarget: 'under',
                autoFitErrors: false //出現錯誤提示訊息時是否調整畫面寬度
            },
            items: [ //欄位項目
                {
                    name: 'sysid',
                    hidden: true
                },{
                    xtype:'displayfield',
                    name: 't_id',
                    fieldLabel: MSG['id_ct']
                },{
                    xtype:'displayfield',
                    name: 'p_date',
                    fieldLabel: '評核新增時間'
                }, {
                    name: 'p_year',
                    fieldLabel: '評核年份',
                    maxLength: 3,
                    allowBlank: false //如為flase表示為必填
                }, {
                    xtype: 'numberfield',
                    name: 'p_part1',
                    fieldLabel: '績效分數(80%)',
                    minValue:0,
                    maxValue:80,
                    maxLength: 2,
                    allowBlank: true
                }, {
                    xtype: 'numberfield',
                    name: 'p_part2',
                    fieldLabel: '職能分數(20%)',
                    minValue:0,
                    maxValue:20,
                    maxLength: 2,
                    allowBlank: true
                }
            ],
            bbar: [ //確認 取消
                {
                    text: MSG['confirm'],
                    action: 'detail_form_confirm'
                }, {
                    text: MSG['cancle'],
                    action: 'detail_form_cancel'
                }
            ]
        });
        me.callParent(arguments);
    }
    
});