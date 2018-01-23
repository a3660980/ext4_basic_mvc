Ext.define('Console.view.HotelDetail.GridMaster', {
    extend: 'Console.override.Grid',
    alias: 'widget.hotdetgridmaster',

      requires: [
        'Ext.ux.ProgressBarPager',
       'Ext.ux.form.SearchField'
    ],

    selType: 'checkboxmodel',

    config: {
         store: 'HotelDetail.HotelRoom',
    },

    initComponent: function() {
        var me = this;

        Ext.apply(me, {
            store: me.getStore(),
            columns: [
                {
                    header: MSG['room_id'],
                    dataIndex: 'room_id',
                    flex: 1,
                    hidden:true
                }, {
                    header: MSG['branch_id'],
                    dataIndex: 'branch_id',
                    flex: 1,
                    hidden:true
                }, {
                    header: MSG['room_sort'],
                    dataIndex: 'room_sort',
                    flex: 1
                }, {
                    header: MSG['branch_name'],
                    dataIndex: 'branch_name',
                    flex: 1
                }, {
                    header: MSG['room_name'],
                    dataIndex: 'room_name',
                    flex: 1,
                }, {
                    header: MSG['room_spec'],
                    dataIndex: 'room_spec',
                    flex: 1,
                }, {
                    header: MSG['room_photo'],
                    dataIndex: 'room_photo',
                    flex: 1,
                    renderer: function(value, p, r) {
                        return me.renderImage(this, r.data['room_photo']);
                    }
                }, {
                    header: MSG['user_i18n'],
                    dataIndex: 'user_i18n',
                    flex: 1,
                    hidden: true
                }, {
                    header: MSG['operator'],
                    dataIndex: 'operator',
                    flex: 1
                }
            ],

            tbar: [
                '->', {
                    xtype: 'searchfieldmvc',
                    store: me.getStore(),
                    fieldLabel: MSG['search'],
                    labelWidth: 50,
                    width: 200
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