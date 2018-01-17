Ext.define('Console.view.Johnny.FormAdds_johnny', {
	extend: 'Console.override.Form',
   
	alias:'widget.johnnyFormAdd', //這個js檔的別名

	requires:['Ext.layout.container.Anchor'],//API(應用程式介面)讓元件大小隨容器改變

	layout:'anchor',//頁面布局
   
    //以上是檔案基本定義

    //以下宣告function執行新增

    //宣告性別下拉式選單的值

	initComponent: function() {
        var me = this;       
        var states = Ext.create('Ext.data.Store', {
            fields: ['abbr', 'name'],
            data : [
                {"abbr":"男", "name":"男"},
                {"abbr":"女", "name":"女"},
                {"abbr":"其他", "name":"其他"}
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
                    vtype:'word',//在index.js中
                    //自訂 
                    name:'id',
                    fieldLabel: MSG['student_id_t'],//學號
                    maxLength: 20,
                    allowBlank: false
       
                },{
                    name: 'name',
                    // 名稱
                    fieldLabel: MSG['name_t'],
                    // 顯示名稱 MSG['方法名稱']，在index.php中
                    maxLength: 50,
                    // 可輸入最大字元
                    allowBlank: false
                    //可否為空值
       
    			}, {
                    xtype: 'combo',
                    //xtype內建工具	，下拉式選單
                    name: 'sex',
                    value: '男',
                    editable: false,
                    fieldLabel: MSG['gender_t'],//性別
                    queryMode: 'local',
                    // 取得本機端資料,依靠本地數據並從前端被加載
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
              
                {
                    name: 'email',
                    fieldLabel: MSG['email_t'],//信箱
                    maxLength: 100,
                    vtype: 'email',//vtype內建，判斷email格式
                    allowBlank: true
                    
                }, {
    				vtype: 'cellphone',//自己定義，在index.js中
                    name: 'cellphone',
                    fieldLabel: MSG['mobile_number_t'],//電話
                    maxLength: 10,
                    allowBlank: true
    			}
			],
			bbar: [
    			{
    				text: MSG['confirm_t'],//確認
                    action: 'form_confirm'//要執行確認的動作
                    
    			}, {
    				text: MSG['cancle_t'],//取消
                    action: 'form_cancel'//要執行取消的動作
    			}
			]
            
		});

		me.callParent(arguments);
        // 繼承前面功能方法
	}
});