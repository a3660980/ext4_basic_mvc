Ext.define('Console.view.betty_test.formedit_master', {
	extend: 'Console.override.Form',
	alias: 'widget.bettyformedit1',
// 編輯
	requires: ['Ext.layout.container.Anchor'],//連結

	layout: 'anchor',
    config: {
        comboboxStore: 'betty.ServiceContract_status'
    },//下拉式選單store

    initComponent: function() {
        var me = this;
        // var states = Ext.create('Ext.data.Store', {
        //     // 宣告定義下拉式選單方法
        //     fields: ['abbr', 'name'],
        //     data : [
        //         {"abbr":"0", "name":"配合"},
        //         {"abbr":"1", "name":"終止"},
        //         // {"上傳的值":"名稱","給人看得值":"名稱"}
        //     ]
        // });
       

        Ext.apply(me, {
            width: 450,
            bodyPadding: 5,//輸入框大小
            autoScroll: true,//自動滾動
            defaults: {
                anchor: '100%'// 輸入框延伸方法
            },
            defaultType: 'textfield',//默認為文字框
            fieldDefaults: {//提示欄位
                msgTarget: 'under',// 提示訊息放的位置
                autoFitErrors: false//提示訊息長度控制
            },
            items: [
                {
                    name:'brand_id',
                    hidden:true
                },{
                    xtype: 'displayfield',
                    name: 'brand_name',
                    fieldLabel: MSG['brand_name'],
                    maxLength: 10,
                    allowBlank: false
                },{
                    xtype: 'filefield',
                    fieldLabel: MSG['brand_logo'],
                    name: 'brand_logo',
                    maxLength: 200,
                    allowBlank: true
                },{
                    name: 'web_url',
                    fieldLabel: MSG['web_url'],
                    maxLength: 100,
                    allowBlank: true
                },{
                    xtype:"numberfield",
                    name: 'priority',
                    fieldLabel: MSG['priority_t'],
                    allowBlank:false,
                    value:20,
                    editable: false,//是否可以編輯
                    allowNegative:false,//是否允許負數
                    maxValue:20,
                    minValue:1
                },{
                    xtype:'combo',
                    name: 'contract_status',
                    fieldLabel: MSG['contract_status'],
                    maxLength: 2,
                    allowBlank: true,
                    queryMode: 'local',
                    // 取得本機端資料
                    store: me.getComboboxStore(),
                    // 表格定義來源方法
                    displayField: 'display',
                    // 顯示的值
                    valueField: 'category_identity',
                    // 上傳的值
                    forceSelection: true,
                    editable: false 
                },{
                    vtype:'ValidateNumber',
                    name: 'hand_gasoline_offer',
                    fieldLabel: MSG['hand_gasoline_offer'],
                    maxLength: 4,
                    allowBlank: true
                },{
                    vtype:'ValidateNumber',//自訂，在index.js中
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
                    vtype:'word',
                    name: 'reward_point',
                    fieldLabel: MSG['reward_point'],
                    allowBlank: true
                },{
                    name: 'reward_info',
                    fieldLabel: MSG['reward_info'],
                    maxLength: 50,
                    allowBlank: true
                },{
                    xtype: 'displayfield',
                    name:'created_date',
                    fieldLabel: MSG['created_date'],
                },{
                    xtype: 'displayfield',
                    name:'updated_date',
                    fieldLabel: '上次更新時間',
                    allowBlank: true
                },{
                    name: 'operator',
                    fieldLabel: MSG['operator'],
                    maxLength: 50,
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