Ext.define('Console.view.hotelhomepage.GridMaster', {
	extend: 'Console.override.Grid',//繼承這個檔案
	alias: 'widget.hlgridmaster',
// 外框
	requires: [
		'Ext.ux.ProgressBarPager',
		'Ext.ux.form.SearchField'
	],

	

	selType: 'checkboxmodel',//選擇類型的字符串，不能進行更多的設置；checkboxmodel,checkbox 選取
// 勾勾
    // config: {
    //     store: 'betty.Service_betty'
    // },
//存取store檔案的路徑
	initComponent: function() {
        var me = this;

		Ext.apply(me, {
			//store: me.getStore(),//取得store檔
			columns: [
        		 {
                    header: MSG['home_name'],
                    
                    dataIndex: 'home_name',//對應資料表的值
                    
                    flex: 1
                    // 顯示框架比例
                },  {
        			header: MSG['home_photo'],//標題列名稱:姓名
        			dataIndex: 'home_photo',
        			flex: 1
        		},{
                    header: MSG['start_date'],//標題列名稱:信箱
                    dataIndex: 'start_date',
                    flex: 2
                },{
                    header: MSG['expire_date'],//標題列名稱:電話
                    dataIndex: 'expire_date',
                    flex: 1
                },{
                    header: MSG['created_date'],
                    dataIndex: 'created_date',
                    flex: 3
                },{ 
                    header:MSG['updated_date'],
                    dataIndex:'updated_date',
                    flex:3
                },{
                    header: MSG['operator'],//標題列名稱:生日
                    dataIndex: 'operator',
                    flex: 1
                }
            ],
			tbar: [//上方工具列
    			{
    				text: MSG['add_user_t'],//新增用戶
    				action: 'add_user'
    			}, {
    				text: MSG['edit_user_t'],//修改用戶
    				action: 'edit_user',
                    allowMulti: false,//可否多選，不可
    				disabled: true
    			}, {
    				text: MSG['delete_user_t'],//刪除用戶
    				action: 'delete_user',
                    allowMulti: true,//可否多選，可
    				disabled: true
    			}
            ],
			bbar: {//下方工具列
				xtype: 'pagingtoolbar',//告知Server要顯示的資料為何
				store: me.getStore(),
				displayInfo: true,
				plugins: new Ext.ux.ProgressBarPager()
            }

		});

		me.callParent(arguments);//繼承父類別
	}
});