Ext.define('Console.view.HotelPhoto.GridDetail', {
    extend: 'Console.override.Grid',
    alias: 'widget.hotphogriddetail',

      requires: [
        'Ext.ux.ProgressBarPager',
       'Ext.ux.form.SearchField'
    ],

    selType: 'checkboxmodel',

    config: {
        store: 'HotelPhoto.HotelPhoto'
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
                    hidden: true
                }, {
                    header: MSG['branch_id'],
                    dataIndex: 'branch_id',
                    flex: 1,
                    hidden: true
                }, {
                    header: MSG['photo_sort'],
                    dataIndex: 'photo_sort',
                    flex: 1,
                }, {
                    header: MSG['photo_name'],
                    dataIndex: 'photo_name',
                    flex: 1,
                }, {
                    header: MSG['photo_url'],
                    dataIndex: 'photo_url',
                    flex: 1,
                    renderer: function(value, p, r) {
                        return me.renderImage(this, r.data['photo_url']);
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
                },
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