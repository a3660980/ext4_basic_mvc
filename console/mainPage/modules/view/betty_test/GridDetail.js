Ext.define('Console.view.betty_test.GridDetail', {
	extend: 'Console.override.Grid',
	alias: 'widget.bettygriddetail',
// 外框
	requires: [
		'Ext.ux.ProgressBarPager'
	],
	selType: 'checkboxmodel',
// 勾勾
    config: {
        store: 'betty.ServiceDetail_test',//checkboxmodel,checkbox 選取
    },
//存取store檔案路徑
	initComponent: function() {
        var me = this;

		Ext.apply(me, {
			store: me.getStore(),//連結到store
			columns: [
        		 {
                    header: MSG['offer_id'],
                    // MSG['顯示名稱']
                    dataIndex: 'offer_id',
                    // 對應資料欄位
                    flex: 1,
                    // 顯示框架比例
                    hidden:true
                },{
                    header: MSG['brand_id'],
                    dataIndex: 'brand_id',
                    flex: 1,
                    hidden:true
                },{
                    header: MSG['hand_gasoline_offer'],
                    dataIndex: 'hand_gasoline_offer',
                    flex: 1
                },{
                    header: MSG['self_gasoline_offer'],
                    dataIndex: 'self_gasoline_offer',
                    flex: 1
                },{
                    header: MSG['diesel_offer'],
                    dataIndex: 'diesel_offer',
                    flex: 1
                },{
                    header: MSG['created_date'],
                    dataIndex: 'created_date',
                    flex: 1
                },{
                    header: MSG['updated_date'],
                    dataIndex: 'updated_date',
                    flex: 1
                },{
                    header: MSG['operator'],
                    dataIndex: 'operator',
                    flex: 1
                }
            ],
			tbar: [
    			{
                    text: MSG['add'],
                    action: 'add_user',
                    loadEnabled: true,
                    disabled: true
                }, {
                    text: MSG['edit'],
                    action: 'edit_user',
                    allowMulti: false,
                    disabled: true
                }, {
                    text: MSG['delete'],
                    action: 'delete_user',
                    allowMulti: true,
                    disabled: true
                }
            ],
			bbar: {
				xtype: 'pagingtoolbar',//告知Server要顯示的資料為何
				store: me.getStore(),//要綁定的store物件
				displayInfo: false,//是否顯示grid中的分頁條訊息 
				plugins: new Ext.ux.ProgressBarPager()//外掛Ext.ux.ProgressBarPager()
            }

		});
    
		me.callParent(arguments);
         
	}
});