Ext.define('Console.view.JohnnyBranchRoomPhoto.GridMaster', {
    extend: 'Console.override.Grid',
    alias: 'widget.johnnyBranchRoomPhotoGridMaster',
    requires: [
        'Ext.ux.ProgressBarPager',
    ],

    selType: 'checkboxmodel',

    config: {
        store: 'Johnny.BranchRoom',
        comboboxStore: 'Johnny.comboxBranch'
    },

    

    initComponent: function() {
        var me = this;

        Ext.apply(me, {
            store: me.getStore(),//取得store檔
            columns: [
                {
                    header: MSG['branch_name'],
                    dataIndex: 'com_name',
                    flex: 1,
                    store: me.getComboboxStore()
                },
                {
                    header: MSG['room_name'],
                    dataIndex: 'room_name',
                    flex: 1
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