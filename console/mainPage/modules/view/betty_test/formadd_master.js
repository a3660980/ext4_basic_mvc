Ext.define('Console.view.betty_test.formadd_master', {
	extend: 'Console.override.Form',
	alias: 'widget.bettyformadd1',//取別名
	requires: ['Ext.layout.container.Anchor'],//動態加載
	layout: 'anchor',//版面配置
    config: {
        comboboxStore: 'betty.ServiceContract_status'
    },//存取store中控制下拉式選項的檔案ServiceContract_status
	initComponent: function() {
        var me = this; 
        // var states = Ext.create('Ext.data.Store', {//不符合MVC架構,多件一個store來執行
        //     // 宣告定義下拉式選單方法
        //     // fields: ['abbr', 'name'],
        //     // data : [
        //     //     {"abbr":"0", "name":"配合"},
        //     //     {"abbr":"1", "name":"終止"},
        //     //     // {"上傳的值":"名稱","給人看得值":"名稱"}
        //     // ]
        // });      
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
                    allowBlank: true
                },{
                    name: 'web_url',
                    vtype:'url',//要符合http格式
                    fieldLabel: MSG['web_url'],
                    maxLength: 100,
                    allowBlank: true
                },{
                    xtype:"numberfield",
                    name: 'priority',
                    fieldLabel: MSG['priority'],
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
                    forceSelection: false,
                    value:'1',
                    editable: false 

                },{
                    //vtype:'ValidateNumber',//自己定義，在index.js中
                    name: 'hand_gasoline_offer',
                    fieldLabel: MSG['hand_gasoline_offer'],
                    //maxLength: 4,
                    allowBlank: true
                    
                },{
                    //vtype:'ValidateNumber',
                    name: 'self_gasoline_offer',
                    fieldLabel: MSG['self_gasoline_offer'],
                    //maxLength: 4,
                    allowBlank: true
                   
                },{
                    //vtype:'ValidateNumber',
                    name: 'diesel_offer',
                    fieldLabel: MSG['diesel_offer'],
                    //maxLength: 4,
                    allowBlank: true
                },{
                    vtype:'word',//自行定義，只能輸入數字
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
			bbar: [//下方工具列
    			{
    				text: MSG['confirm'],
                    action: 'form_add_confirm'//在controller中
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