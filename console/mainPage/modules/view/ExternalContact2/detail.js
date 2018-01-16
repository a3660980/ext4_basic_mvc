Ext.define('Console.view.ExternalContact2.detail', {
	extend: 'Console.override.Grid',
	alias: 'widget.detail2',
// 外框
	requires: [
		'Ext.ux.ProgressBarPager',
	],
	selType: 'checkboxmodel',
// 勾勾
    config: {
        store: 'ExternalContact2',
    },
//存取路徑
	initComponent: function() {
        var me = this;

		Ext.apply(me, {
			store: me.getStore(),
			columns: [
        		 {
                    header: MSG['subject'],
                    // MSG['顯示名稱']
                    dataIndex: 'subject',
                    // 對應資料欄位
                    flex: 1
                    // 顯示框架比例
                },{
                    header: MSG['score'],
                    dataIndex: 'score',
                    flex: 1
                },{
                    header: MSG['test_date'],
                    dataIndex: 'test_date',
                    flex: 1
                }
            ],
			tbar: [
    			{
    				text: MSG['add_score'],
    				action: 'add_user',
                    loadEnabled: true,
                    disabled: true
    			}, {
    				text: MSG['edit_score'],
    				action: 'edit_user',
                    allowMulti: false,
    				disabled: true
    			}, {
    				text: MSG['delete_score'],
    				action: 'delete_user',
                    allowMulti: true,
    				disabled: true
    			}, '->', {
    				xtype: 'searchfieldmvc',
    				store: me.getStore(),
    				fieldLabel: MSG['search'],
    				labelWidth: 50,
    				width: 200
    			}
            ],
			bbar: {
				xtype: 'pagingtoolbar',
				store: me.getStore(),
				displayInfo: true,
				plugins: new Ext.ux.ProgressBarPager()
            }

		});
    
		me.callParent(arguments);
         
	}
});