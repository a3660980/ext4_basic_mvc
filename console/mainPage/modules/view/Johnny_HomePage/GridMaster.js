Ext.define('Console.view.Johnny_HomePage.GridMaster', {
	extend: 'Console.override.Grid',
	alias: 'widget.johnnyHomePageGridMaster',
	requires: [
		'Ext.ux.ProgressBarPager',
		'Ext.ux.form.SearchField'
	],

	selType: 'checkboxmodel',

    config: {
        store: 'Johnny.HomePage'
    },

	initComponent: function() {
        var me = this;

		Ext.apply(me, {
			store: me.getStore(),//取得store檔
			columns: [
        		 {
                    header: MSG['home_id'],
                    dataIndex: 'home_id',
                    flex: 1
                },  {
        			header: MSG['home_name'],
        			dataIndex: 'home_name',
        			flex: 1
        		},  {
                    header: MSG['home_photo'],
                    dataIndex: 'home_photo',
                    flex: 1
                }, {
                    header: MSG['start_date'],
                    dataIndex: 'start_date',
                    flex: 2
                },{
                    header: MSG['expire_date'],
                    dataIndex: 'expire_date',
                    flex: 1
                },{
                    header: MSG['create_date'],
                    dataIndex: 'create_date',
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
			tbar: [//上方工具列
    			{
    				text: MSG['add_homepage_photo'],
    				action: 'add_homepage_photo'
    			}, {
    				text: MSG['edit_homepage_photo'],
    				action: 'edit_homepage_photo',
                    allowMulti: false,//可否多選，不可
    				disabled: true
    			}, {
    				text: MSG['delete_homepage_photo'],
    				action: 'delete_homepage_photo',
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