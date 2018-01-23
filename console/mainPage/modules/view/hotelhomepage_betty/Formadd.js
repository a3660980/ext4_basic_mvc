Ext.define('Console.view.hotelhomepage_betty.Formadd', {
	extend: 'Console.override.Form',
   
	alias:'widget.hlformadd', //這個js檔的別名

	requires:['Ext.layout.container.Anchor'],//API(應用程式介面)讓元件大小隨容器改變

	layout:'anchor',//頁面布局



	initComponent: function() {
        var me = this;       
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
                    name:'home_id',
                    hidden:true
                },{
                    name:'home_name',
                    fieldLabel:MSG['home_name'],
                    maxLength:50,
                    allowBlank: true,
                },{
                    xtype:"numberfield",
                    name:'home_sort',
                    fieldLabel:MSG['home_sort'],
                    maxLength:4,
                    allowblank:true,
                    editable: false,
                    minValue:10,
                    value:10
                },{
                    xtype: 'filefield',
                    name: 'home_photo',
                    fieldLabel: MSG['home_photo'],
                    maxLength: 200,
                    allowBlank: false
                },{
                    xtype: 'startexpiredatefield',
                    allowStartBlank: false,
                    allowExpireBlank: false,
                    startName: 'start_date',
                    expireName: 'expire_date',
                    startLabelField: MSG['start_date'],
                    expireLabelField: MSG['expire_date']    
                },{
                    name: 'operator',
                    fieldLabel: MSG['operator'],
                    maxLength: 50,
                    allowBlank: false,
                    hidden:true
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