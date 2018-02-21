Ext.define('Console.view.bettyRoompicture.GridMaster', {
	extend: 'Console.override.Grid',
	alias: 'widget.brpgridmaster',
// 外框
	requires: [
		'Ext.ux.ProgressBarPager',
		'Ext.ux.form.SearchField'
	],

	selType: 'checkboxmodel',
// 勾勾
    config: {
        store: 'betty.Service_hotelbranch'
    },
//存取路徑
	initComponent: function() {
        var me = this;

		Ext.apply(me, {
            store: me.getStore(),//取得store檔
            columns: [
                {
                    header: MSG['branch_name'],
                    dataIndex: 'branch_name',
                    flex: 1
                },  {
                    header: MSG['branch_sort'],
                    dataIndex: 'branch_sort',
                    flex: 1
                },{
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