Ext.define('Console.view.JohnnyBranchPhoto.GridMaster', {
	extend: 'Console.override.Grid',
	alias: 'widget.johnnyBranchPhotoGridMaster',
	requires: [
		'Ext.ux.ProgressBarPager',
	],

	selType: 'checkboxmodel',

    config: {
        store: 'Johnny.Branch'
    },

	initComponent: function() {
        var me = this;

		Ext.apply(me, {
			store: me.getStore(),//取得store檔
			columns: [
        		{
        			header: MSG['branch_name'],
        			dataIndex: 'branch_name',
        			flex: 1
        		}, {
                    header: MSG['branch_photo'],
                    dataIndex: 'branch_photo',
                    flex: 2,
                     renderer: function(value, p, r) {
                        return me.renderImage(this, r.data['branch_photo']);//取得圖片
                    }
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