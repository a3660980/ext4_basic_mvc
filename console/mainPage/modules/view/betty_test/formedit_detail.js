Ext.define('Console.view.betty_test.formedit_detail', {
    extend: 'Console.override.Form',
    alias: 'widget.bettyformedit2',
// 編輯
    requires: ['Ext.layout.container.Anchor'],

    layout: 'anchor',
// 排版模式
    // config: {
    //     comboboxStore: 'CpsUserOrganization'
    // },

    initComponent: function() {

        
        var me = this;
       

        Ext.apply(me, {
            width: 450,
            bodyPadding: 5, // 輸入框大小
            autoScroll: true,// 自動滾動
            defaults: {
                anchor: '100%'// 輸入框延伸方法
            },
            defaultType: 'textfield',// 輸入框默認文字
            fieldDefaults: { // 設定為提示欄位
                msgTarget: 'under',// 提示訊息放的位置
                autoFitErrors: false// 提示訊息長度控制
            },
            items: [
                {
                    name:'offer_id',
                    hidden:true
                },{
                    name: 'brand_id',
                    hidden:true
                },{
                    vtype:'ValidateNumber',
                    name: 'hand_gasoline_offer',
                    fieldLabel: MSG['hand_gasoline_offer'],
                    maxLength: 4,
                    allowBlank: true
                },{
                    vtype:'ValidateNumber',
                    name: 'self_gasoline_offer',
                    fieldLabel: MSG['self_gasoline_offer'],
                    maxLength: 4,
                    allowBlank: true
                },{
                    vtype:'ValidateNumber',
                    name: 'diesel_offer',
                    fieldLabel: MSG['diesel_offer'],
                    maxLength: 4,
                    allowBlank: true
                },{
                    xtype: 'displayfield',
                    name:'created_date',
                    fieldLabel: MSG['created_date'],
                },{
                    xtype: 'displayfield',//只顯示不能修改
                    name:'updated_date',
                    fieldLabel: '上次更新時間',
                    allowBlank: false
                },{
                    name: 'operator',
                    fieldLabel: MSG['operator'],
                    maxLength: 50,
                    allowBlank: true,
                    hidden:true
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