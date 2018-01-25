Ext.define('Console.view.HotelRoom.GridMaster', {
    extend: 'Console.override.Grid',
    alias: 'widget.hotroogridmaster',

    requires: [
        'Ext.ux.ProgressBarPager',
        'Ext.ux.form.SearchField'
    ],

    

    selType: 'checkboxmodel', 


    config: {
        store: 'HotelRoom.HotelRoom'  
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
                },{
                    header: MSG['branch_id'],
                    dataIndex: 'branch_id',
                    flex: 1,
                    hidden:true
                },{
                    header: MSG['branch_name'],
                    dataIndex: 'branch_name',
                    flex: 1,
                    // hidden:true
                },{
                    header: MSG['room_sort'],
                    dataIndex: 'room_sort',
                    flex: 1
                },  {
                    header: MSG['room_name'],
                    dataIndex: 'room_name',
                    flex: 1
                }, {
                    header: MSG['room_spec'],
                    dataIndex: 'room_spec',
                    flex: 1
                    // hidden:true
                },  {
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
            tbar: [
                {
                    text: MSG['add'],
                    action: 'add_user',

                }, {
                    text: MSG['edit2'],
                    action: 'edit_user',
                    allowMulti: false
                }, {
                    text: MSG['delete'],
                    action: 'delete_user',
                    allowMulti: true
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