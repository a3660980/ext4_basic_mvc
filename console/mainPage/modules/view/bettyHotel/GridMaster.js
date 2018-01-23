Ext.define('Console.view.bettyHotel.GridMaster', {
	extend: 'Console.override.Grid',
	alias: 'widget.bhgridmaster',
	requires: [
		'Ext.ux.ProgressBarPager',
		'Ext.ux.form.SearchField'
	],
	selType: 'checkboxmodel',
    config: {
        store: 'betty.Service_hotelHomepage'
    },
	initComponent: function() {
        var me = this;
		Ext.apply(me, {
			store: me.getStore(),//取得store檔
			columns: [
        		{
                    header: MSG['home_name'],
                    dataIndex: 'home_name',
                    flex: 1
                },  {
        			header: MSG['home_sort'],
        			dataIndex: 'home_sort',
        			flex: 1
        		},  {
                    header: MSG['home_photo'],
                    dataIndex: 'home_photo',
                    flex: 2,
                     renderer: function(value, p, r) {
                        return me.renderImage(this, r.data['home_photo']);//取得圖片
                        //顯示logo
                    }
                }, {
                    header: MSG['start_date'],
                    dataIndex: 'start_date',
                    flex: 2
                },{
                    header: MSG['expire_date'],
                    dataIndex: 'expire_date',
                    flex: 1
                }, {
                    header: MSG['created_date'],
                    dataIndex: 'created_date',
                    flex: 3
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