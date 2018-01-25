Ext.define('Console.view.HotelDetail.GridDetail', {
    extend: 'Console.override.Grid',
    alias: 'widget.hotdetgriddetail',

    requires: [
        'Ext.ux.ProgressBarPager',
        'Ext.ux.form.SearchField'
    ],

    selType: 'checkboxmodel',

    config: {
        store: 'HotelDetail.HotelDetail'
    },

    initComponent: function() {
        var me = this;

        Ext.apply(me, {
            store: me.getStore(),
            columns: [
                {
                    header: MSG['detail_id'],
                    dataIndex: 'detail_id',
                    flex: 1,
                    hidden: true
                }, {
                    header: MSG['branch_id'],
                    dataIndex: 'branch_id',
                    flex: 1,
                    hidden: true
                }, {
                    header: MSG['room_id'],
                    dataIndex: 'room_id',
                    flex: 1,
                    hidden: true
                }, {
                    header: MSG['room_name'],
                    dataIndex: 'room_name',
                    flex: 1,
                }, {
                    header: MSG['room_spec'],
                    dataIndex: 'room_spec',
                    flex: 1,
                }, {
                    header: MSG['detail_sort'],
                    dataIndex: 'detail_sort',
                    flex: 1,
                }, {
                    header: MSG['detail_name'],
                    dataIndex: 'detail_name',
                    flex: 1,
                    hidden:true
                }, {
                    header: MSG['detail_photo'],
                    dataIndex: 'detail_photo',
                    flex: 1,
                    renderer: function(value, p, r) {
                        return me.renderImage(this, r.data['detail_photo']);
                    }
                }, {
                    header: MSG['user_i18n'],
                    dataIndex: 'user_i18n',
                    flex: 1,
                    hidden: true
                }, {
                    header: MSG['created_date'],
                    dataIndex: 'created_date',
                    flex: 1,
                }, {
                    header: MSG['updated_date'],
                    dataIndex: 'updated_date',
                    flex: 1,
                }, {
                    header: MSG['operator'],
                    dataIndex: 'operator',
                    flex: 1,
                }
            ],

            tbar: [
                {
                    text: MSG['add'],
                    action: 'add_detail',
                    loadEnabled: true,
                    disabled: true

                }, {
                    text: MSG['edit2'],
                    action: 'edit_detail',
                    allowMulti: false,
                    disabled: true
                }, {
                    text: MSG['delete'],
                    action: 'delete_detail',
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

        // rowexpander事件監聽
        //this.getView().addListener('expandbody', function(rowNode, record, expandRow, eOpts) {
         //   this.getSelectionModel().select([record]);
       // });
    }
});