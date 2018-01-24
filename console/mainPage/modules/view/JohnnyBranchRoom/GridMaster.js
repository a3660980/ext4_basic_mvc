Ext.define('Console.view.JohnnyBranchRoom.GridMaster', {
	extend: 'Console.override.Grid',
	alias: 'widget.johnnyBranchRoomGridMaster',
	requires: [
		'Ext.ux.ProgressBarPager',
	],

	selType: 'checkboxmodel',

    config: {
        store: 'Johnny.BranchRoom'
    },

    

	initComponent: function() {
        var me = this;

		Ext.apply(me, {
			store: me.getStore(),//取得store檔
			columns: [
        		{
        			header: MSG['room_name'],
        			dataIndex: 'room_name',
        			flex: 1
        		}, {
                    header: MSG['room_photo'],
                    dataIndex: 'room_photo',
                    flex: 2,
                     renderer: function(value, p, r) {
                        return me.renderImage(this, r.data['room_photo']);//取得圖片
                    }
                },{
                    header: MSG['room_spec'],
                    dataIndex: 'room_spec',
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
			tbar: [//上方工具列
    			{
    				text: MSG['add_branch_room'],
    				action: 'add_branch_room'
    			}, {
    				text: MSG['edit_branch_room'],
    				action: 'edit_branch_room',
                    allowMulti: false,//可否多選，不可
    				disabled: true
    			}, {
    				text: MSG['delete_branch_room'],
    				action: 'delete_branch_room',
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