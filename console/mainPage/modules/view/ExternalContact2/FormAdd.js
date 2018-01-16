Ext.define('Console.view.ExternalContact2.FormAdd', {
	extend: 'Console.override.Form',
// 延伸
	alias: 'widget.ecformadd2',
// 新增
	requires: ['Ext.layout.container.Anchor'],

	layout: 'anchor',

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
                    name:'uuid',
                    hidden:true
                },{
                    xtype:'displayfield',
                    name: 'student_id',
                    fieldLabel: MSG['student_id'],
                    maxLength: 10,
                    allowBlank: false
                },{
                    name: 'subject',
                    fieldLabel: MSG['subject'],
                    maxLength: 20,
                    allowBlank: false
                },{
                    name: 'score',
                    fieldLabel: MSG['score'],
                    maxLength: 3,
                    allowBlank: false
                },{
                    xtype: 'datefield',
                    name: 'test_date',
                    fieldLabel: MSG['test_date'],
                    allowBlank: true,
                    maxLength:10,
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