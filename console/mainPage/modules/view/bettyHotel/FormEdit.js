Ext.define('Console.view.bettyHotel.FormEdit', {
	extend: 'Console.override.Form',
   
	alias:'widget.bhformedit', //這個js檔的別名

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
                    xtype:'numberfield',
                    name: 'home_sort',
                    fieldLabel: MSG['home_sort'],
                    maxLength: 4,
                    allowBlank: false,
                    minValue:10,
                    editable: false
    			},{
                    name: 'home_name',
                    fieldLabel: MSG['home_name'],//性別
                    maxLength: 50
                },{
                    name: 'home_photo',
                    xtype:'filefield',
                    fieldLabel: MSG['home_photo'],//信箱
                    maxLength: 200,
                    allowBlank: true,
                    emptyText: '請上傳1080X1920px的照片'
                    
                },{
                    xtype: 'startexpiredatefield',
                    allowStartBlank: true,
                    allowExpireBlank: true,
                    startName: 'start_date',
                    expireName: 'expire_date',
                    startLabelField: MSG['start_date'],
                    expireLabelField: MSG['expire_date']
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