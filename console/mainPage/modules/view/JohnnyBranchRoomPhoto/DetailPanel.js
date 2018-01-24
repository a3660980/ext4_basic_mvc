Ext.define('Console.view.JohnnyBranchRoomPhoto.DetailPanel', {
	extend: 'Console.override.Grid',
	alias: 'widget.johnnyBranchRoomPhotoDetailPanel',

	requires: [
        'Ext.ux.ProgressBarPager',
    ],

	selType: 'checkboxmodel',

    config: {
         store: 'Johnny.BranchRoomPhoto',
    },

	initComponent: function() {
        var me = this;
		Ext.apply(me, {
            store: me.getStore(),
            columns: [
                {
                    dataIndex: 'detail_id',
                    flex: 1,
                    hidden:true
                },
                {
                    dataIndex: 'branch_id',
                    flex: 1,
                    hidden:true
                },
                {
                    dataIndex: 'room_id',
                    flex: 1,
                    hidden:true
                },{
                    xtype: 'displayfield',
                    name: 'room_name',
                    fieldLabel: MSG['room_name'],
                    store: me.getBranchRoomStore()
                },{
                    xtype: 'displayfield',
                    name: 'room_spec',
                    fieldLabel: MSG['room_spec'],
                    store: me.getBranchRoomStore()
                },
                {
                    header: MSG['detail_name'],
                    dataIndex: 'detail_name',
                    flex: 1
                }, {
                    header: MSG['detail_photo'],
                    dataIndex: 'detail_photo',
                    renderer: function(value, p, r) {
                        return me.renderImage(this, r.data['detail_photo']);//取得圖片
                    },
                    flex: 2
                },{
                    header: MSG['created_date'],
                    dataIndex: 'created_date',
                    flex: 1
                }, {
                    header: MSG['updated_date'],
                    dataIndex: 'updated_date',
                    flex: 1
                }, {
                    header: MSG['operator'],
                    dataIndex: 'operator',
                    flex: 1
                }
            ],
            tbar: [
                {
                    text: MSG['add_branch_room_photo'],
                    action: 'add_branch_room_photo',
                    loadEnabled: true,
                    disabled: true
                }, {
                    text: MSG['edit_branch_room_photo'],
                    action: 'edit_branch_room_photo',
                    allowMulti: false,
                    disabled: true
                }, {
                    text: MSG['delete_branch_room_photo'],
                    action: 'delete_branch_room_photo',
                    allowMulti: true,
                    disabled: true
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