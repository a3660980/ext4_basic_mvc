Ext.define('Console.view.HotelHomepage.GridMaster', {
    extend: 'Console.override.Grid',
    alias: 'widget.hothomgridmaster',

    requires: [
        'Ext.ux.ProgressBarPager',
        'Ext.ux.form.SearchField'
    ],

    selType: 'checkboxmodel',


    config: {
        store: 'HotelHomepage.HotelHomepage'
    },

    initComponent: function() {
        var me = this;

        Ext.apply(me, {
            store: me.getStore(),
            columns: [
                {
                    header: MSG['home_id'],
                    dataIndex: 'home_id',
                    flex: 1,
                    hidden:true
                }, {
                    header: MSG['home_sort'],
                    dataIndex: 'home_sort',
                    flex: 1,
                    hidden:true
                }, {
                    header: MSG['home_name'],
                    dataIndex: 'home_name',
                    flex: 1
                }, {
                    header: MSG['home_photo'],
                    dataIndex: 'home_photo',
                    flex: 1,
                    renderer: function(value, p, r) {
                        return me.renderImage(this, r.data['home_photo']);
                    }
                }, {
                    header: MSG['user_i18n'],
                    dataIndex: 'user_i18n',
                    flex: 1,
                    hidden: true
                }, {
                    header: MSG['start_date'],
                    dataIndex: 'start_date',
                    flex: 1,
                }, {
                    header: MSG['expire_date'],
                    dataIndex: 'expire_date',
                    flex: 1,
                    renderer: function(value, p, r) {
                        if (r.data['expire_date'] == '') return '永久有效';
                        else return r.data['expire_date'];
                    }
                }, {
                    header: MSG['created_date'],
                    dataIndex: 'created_date',
                    flex: 1,
                    renderer: Ext.util.Format.dateRenderer('Y-m-d H:i')
                }, {
                    header: MSG['updated_date'],
                    dataIndex: 'updated_date',
                    flex: 1,
                    renderer: Ext.util.Format.dateRenderer('Y-m-d H:i')
                }, {
                    header: MSG['operator'],
                    dataIndex: 'operator',
                    flex: 1
                }
                
            ],tbar: [//上層
                {
                    text: MSG['add'],
                    action: 'add',
                    
                }, {
                    text: MSG['edit2'],
                    action: 'edit',
                    allowMulti: false,
                    disabled: true
                }, {
                    text: MSG['delete'],
                    action: 'delete',
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
                plugins: new Ext.ux.ProgressBarPager()
            }
        });

        me.callParent(arguments);
    }
});