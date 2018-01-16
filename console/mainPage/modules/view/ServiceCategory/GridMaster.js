Ext.define('Console.view.ServiceCategory.GridMaster', {
    extend: 'Console.override.Grid',
    alias: 'widget.scygridmaster',

    requires: [
        'Ext.ux.ProgressBarPager',
        'Ext.ux.form.SearchField'
    ],

    selType: 'checkboxmodel',

    config: {
        store: 'ServiceInfo.ServiceInfo'
                // 'ServiceCategory.ServiceCategory'
    },

    initComponent: function() {
        var me = this;

        Ext.apply(me, {
            store: me.getStore(),
            columns: [
                {
                    header: MSG['service_code'],
                    dataIndex: 'service_code',
                    flex: 1
                }, {
                    header: MSG['service_name'],
                    dataIndex: 'service_name',
                    flex: 1
                }, {
                    header: MSG['service_introduction'],
                    dataIndex: 'service_introduction',
                    flex: 1
                }, {
                    header: MSG['service_icon'],
                    dataIndex: 'service_icon',
                    flex: 1,
                     renderer: function(value, p, r) {
                        return me.renderImage(this, r.data['service_icon']);
                   }
                }, {
                    header: MSG['service_sort'],
                    dataIndex: 'service_sort',
                    flex: 1
                   
                }, {
                    header: MSG['service_identity'],
                    dataIndex: 'service_identity',
                    flex: 1,
                    renderer: function(value, p, r) {
                       return r.data['service_identity'] == 0 ? '系統'
                            : r.data['service_identity'] == 1 ? '消費者'
                            : r.data['service_identity'] == 2 ? '司機'
                            : r.data['service_identity'] == 3 ? '企業客戶'
                            : r.data['service_identity'] == 5 ? '車行'
                            : r.data['service_identity'] == 6 ? '全鋒(派遣或客服)'
                            : r.data['service_identity'] == 7 ? '全鋒(主管)'
                            : 'Undefined';
                    }
                   
                   
                }, {
                   header: MSG['created_date'],
                    dataIndex: 'created_date',
                    flex: 1
                    
                }, {
                    header: MSG['updated_date'],
                    dataIndex: 'updated_date',
                    flex: 1
                   
                }
                
            ],tbar: [//上層

            
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