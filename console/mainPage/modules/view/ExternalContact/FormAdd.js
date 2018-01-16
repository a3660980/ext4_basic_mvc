Ext.define('Console.view.ExternalContact.FormAdd', {
	extend: 'Console.override.Form',
// 延伸
	alias: 'widget.ecformadd',
// 新增
	requires: ['Ext.layout.container.Anchor'],

	layout: 'anchor',

    config: {
        comboboxStore: 'CpsUserOrganization'
        // 下拉式選單
    },

	initComponent: function() {
        var me = this;       
        var states = Ext.create('Ext.data.Store', {
            // 宣告定義下拉式選單方法
            fields: ['abbr', 'name'],
            data : [
                {"abbr":"男", "name":"男"},
                {"abbr":"女", "name":"女"},
                {"abbr":"其他", "name":"其他"}
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
                    vtype:'word',
                    //自行訂義方法 
                    name:'student_id',
                    fieldLabel: MSG['student_id'],
                    maxLength: 8,
                    allowBlank: false
       
                },{
                    name: 'name',
                    // 名稱
                    fieldLabel: MSG['name'],
                    // 顯示名稱 MSG['方法名稱']
                    maxLength: 50,
                    // 可輸入最大字元
                    allowBlank: false
                    // 是否可空值
       
    			}, {
                    xtype: 'combo',
                    //xtype內建工具
                    name: 'gender',
                    fieldLabel: MSG['gender_b'],
                    queryMode: 'local',
                    // 取得本機端資料
                    store: states,
                    // 表格定義來源方法
                    displayField: 'name',
                    // 顯示的值
                    valueField: 'abbr',
                    // 上傳的值
                    forceSelection: true,
                    flex: 1,
                    maxLength: 2
                }, 
                // {
                    // xtype:'identity_number',
                    // name: 'identity_card',
                    // fieldLabel: MSG['identity_card'],
                    // maxLength: 10,
                    // allowBlank: false
                // }, 
                {
                    name: 'email',
                    fieldLabel: MSG['email_b'],
                    maxLength: 100,
                    vtype: 'email',
                    allowBlank: true
                    
                }, {
    				vtype: 'cellphone',
                    name: 'phone',
                    fieldLabel: MSG['mobile_number_b'],
                    maxLength: 10,
                    allowBlank: false
    			},{
                    name: 'address',
                    fieldLabel: MSG['address_b'],
                    allowBlank: false,
                    maxLength: 200,
                },{
                    xtype: 'datefield',
                    name: 'birthday',
                    fieldLabel: MSG['birthday_b'],
                    allowBlank: false
                }
			],
			bbar: [
    			{
    				text: MSG['confirm'],
                    action: 'form_confirm'
                    // 執行動作
    			}, {
    				text: MSG['cancle'],
                    action: 'form_cancel'
    			}
			]
            // 確認與取消
		});

		me.callParent(arguments);
        // 繼承前面功能方法
	}
});