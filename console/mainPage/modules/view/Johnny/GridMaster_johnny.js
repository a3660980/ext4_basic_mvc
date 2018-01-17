Ext.define('Console.view.Johnny.GridMaster_johnny', {
	extend: 'Console.override.Grid',//繼承這個檔案
	alias: 'widget.johnnyGridMaster',
// 外框
	requires: [
		'Ext.ux.ProgressBarPager',
		'Ext.ux.form.SearchField'
	],

	

	selType: 'checkboxmodel',//選擇類型的字符串，不能進行更多的設置；checkboxmodel,checkbox 選取
// 勾勾
    config: {
        store: 'Johnny.Service_johnny'
    },
//存取store檔案的路徑
	initComponent: function() {
        var me = this;

		Ext.apply(me, {
			store: me.getStore(),//取得store檔
			columns: [
        		 {
                    header: MSG['student_id_t'],//標題列名稱:學號
                    
                    dataIndex: 'id',//對應資料表的值
                    
                    flex: 1
                    // 顯示框架比例
                },  {
        			header: MSG['name_t'],//標題列名稱:姓名
        			dataIndex: 'name',
        			flex: 1
        		},  {
                    header: MSG['gender_t'],//標題列名稱:性別
                    dataIndex: 'sex',
                    flex: 1
                }, {
                    header: MSG['email_t'],//標題列名稱:信箱
                    dataIndex: 'email',
                    flex: 2
                },{
                    header: MSG['mobile_number_t'],//標題列名稱:電話
                    dataIndex: 'cellphone',
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
    			}, '->', { //"->"靠最右邊
    				xtype: 'searchfieldmvc',//自行定義，在override.js中
    				store: me.getStore(),
    				fieldLabel: MSG['search_t'], //搜尋
    				labelWidth: 50,
    				width: 200
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