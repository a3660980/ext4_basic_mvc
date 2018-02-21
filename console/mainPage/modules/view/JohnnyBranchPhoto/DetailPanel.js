Ext.define('Console.view.JohnnyBranchPhoto.DetailPanel', {
	extend: 'Console.override.Grid',
	alias: 'widget.johnnyBranchPhotoDetailPanel',

	requires: [
        'Ext.ux.ProgressBarPager',
    ],

	selType: 'checkboxmodel',

    config: {
         store: 'Johnny.BranchPhoto',
    },

	initComponent: function() {
        var me = this;
		Ext.apply(me, {
            store: me.getStore(),
            columns: [
                {
                    header: MSG['branch_photo_id'],
                    dataIndex: 'branch_photo_id',
                    flex: 1,
                    hidden:true
                },
                {
                    header: MSG['branch_id'],
                    dataIndex: 'branch_id',
                    flex: 1,
                    hidden:true
                },
                {
                    header: MSG['photo_name'],
                    dataIndex: 'photo_name',
                    flex: 1
                }, {
                    header: MSG['photo_url'],
                    dataIndex: 'photo_url',
                    renderer: function(value, p, r) {
                        return me.renderImage(this, r.data['photo_url']);//取得圖片
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
                    text: MSG['add_branch_photo'],
                    action: 'add_branch_photo',
                    loadEnabled: true,
                    disabled: true
                }, {
                    text: MSG['edit_branch_photo'],
                    action: 'edit_branch_photo',
                    allowMulti: false,
                    disabled: true
                }, {
                    text: MSG['delete_branch_photo'],
                    action: 'delete_branch_photo',
                    allowMulti: true,
                    disabled: true
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                store: me.getStore(),
                displayInfo: true,
                clearFilter: false,
                plugins: new Ext.ux.ProgressBarPager()
            }
        });

        me.callParent(arguments);
    }
});