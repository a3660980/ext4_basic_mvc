Ext.define('Console.view.GasBrand_Detail.FormAdd', {
	extend: 'Console.override.Form',
// 延伸
	alias: 'widget.gbformadd',
// 新增
	requires: ['Ext.layout.container.Anchor'],

	layout: 'anchor',

	initComponent: function() {
        var me = this; 
        var states = Ext.create('Ext.data.Store', {
            // 宣告定義下拉式選單方法
            fields: ['abbr', 'name'],
            data : [
                {"abbr":"配合", "name":"配合"},
                {"abbr":"終止", "name":"終止"},
                // {"上傳的值":"名稱","給人看得值":"名稱"}
            ]

        });      
        
		Ext.apply(me, {
			width: 450,
            // 寬度
			bodyPadding: 5,
            // 輸入框大小
            autoScroll: true,
            // 自動滾動
			defaults: {
                anchor: '100%'
            // 輸入框延伸方法
            },
			defaultType: 'textfield',
            // 輸入框默認文字
			fieldDefaults: {
                // 設定為提示欄位
	            msgTarget: 'under',
                // 提示訊息放的位置
	            autoFitErrors: true
                // 提示訊息長度控制
	        },
			items: [
                {
                    name:'brand_id',
                    hidden:true
                },{
                    name: 'brand_name',
                    fieldLabel: MSG['brand_name'],
                    maxLength: 10,
                    allowBlank: false
                },{
                    xtype: 'filefield',
                    name: 'brand_logo',
                    fieldLabel: MSG['brand_logo'],
                    maxLength: 200,
                    allowBlank: false
                },{
                    name: 'web_url',
                    fieldLabel: MSG['web_url'],
                    maxLength: 100,
                    allowBlank: true
                },{
                    xtype:"numberfield",
                    name: 'priority',
                    fieldLabel: MSG['priority'],
                    allowBlank:false,
                    value:20
                },{
                    xtype:'combo',
                    name: 'contract_status',
                    fieldLabel: MSG['contract_status'],
                    maxLength: 2,
                    allowBlank: true,
                    queryMode: 'local',
                    // 取得本機端資料
                    store: states,
                    // 表格定義來源方法
                    displayField: 'name',
                    // 顯示的值
                    valueField: 'abbr',
                    // 上傳的值
                    forceSelection: true,
                    value:'配合'

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
                    action: 'form_add_confirm'
                    // 執行動作
    			}, {
    				text: MSG['cancle'],
                    action: 'form_add_cancel'
    			}
			]
            // 確認與取消
		});

		me.callParent(arguments);
        // 繼承前面功能方法
	}
    
});