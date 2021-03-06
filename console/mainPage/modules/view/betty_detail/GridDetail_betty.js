Ext.define('Console.view.betty_detail.GridDetail_betty', {
    extend: 'Console.override.Grid',
    alias: 'widget.btgriddetail',
    requires: [
        'Ext.ux.ProgressBarPager',
    ],
    selType: 'checkboxmodel',
    config: {
        store: 'betty.ServiceDetail_betty',
    },
    initComponent: function() {
        var me = this;
        console.log(me.getStore())
        Ext.apply(me, {
            store: me.getStore(),
            columns: [
                 {
                    header: MSG['offer_id'],
                    dataIndex: 'offer_id',
                    flex: 1,
                    hidden:true
                },{
                    header: MSG['brand_id'],
                    dataIndex: 'brand_id',
                    flex: 1,
                    hidden:true
                },{
                    header: MSG['hand_gasoline_offer'],
                    dataIndex: 'hand_gasoline_offer',
                    flex: 1
                },{
                    header: MSG['self_gasoline_offer'],
                    dataIndex: 'self_gasoline_offer',
                    flex: 1
                },{
                    header: MSG['diesel_offer'],
                    dataIndex: 'diesel_offer',
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
            tbar: [
                {
                    text: MSG['add'],
                    action: 'add_user',
                    loadEnabled: true,
                    disabled: true
                }, {
                    text: MSG['edit'],
                    action: 'edit_user',
                    allowMulti: false,
                    disabled: true
                }, {
                    text: MSG['delete'],
                    action: 'delete_user',
                    allowMulti: true,
                    disabled: true
                }, '->', {
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
                displayInfo: false,
                plugins: new Ext.ux.ProgressBarPager()
            }

        });
    
        me.callParent(arguments);
         
    }
});