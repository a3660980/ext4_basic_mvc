Ext.define('Console.view.HotelDetail.GridMaster', {
    extend: 'Console.override.Grid',
    alias: 'widget.hotdetgridmaster',

      requires: [
        'Ext.ux.ProgressBarPager',
       'Ext.ux.form.SearchField'
    ],

    selType: 'checkboxmodel',

    config: {
         store: 'HotelBranch.HotelBranch',
    },

    initComponent: function() {
        var me = this;

        Ext.apply(me, {
            store: me.getStore(),
            columns: [
                {
                    header: MSG['branch_id'],
                    dataIndex: 'branch_id',
                    flex: 1,
                    hidden:true
                }, {
                    header: MSG['branch_sort'],
                    dataIndex: 'branch_sort',
                    flex: 1
                },  {
                    header: MSG['branch_name'],
                    dataIndex: 'branch_name',
                    flex: 1
                }, {
                    header: MSG['branch_photo'],
                    dataIndex: 'branch_photo',
                    flex: 1,
                    hidden:true
                }, {
                    header: MSG['user_i18n'],
                    dataIndex: 'user_i18n',
                    flex: 1,
                    hidden:true
                }, {
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
            bbar: {
                xtype: 'pagingtoolbar',
                store: me.getStore(),
                displayInfo: true,
                plugins: new Ext.ux.ProgressBarPager()
            }
        });

        me.callParent(arguments);

        // rowexpander事件監聽
        //this.getView().addListener('expandbody', function(rowNode, record, expandRow, eOpts) {
         //   this.getSelectionModel().select([record]);
       // });
    }
});