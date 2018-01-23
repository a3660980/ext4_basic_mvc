Ext.define('Console.view.HotelBranch.GridMaster', {
    extend: 'Console.override.Grid',
    alias: 'widget.hotbragridmaster',

    requires: [
        'Ext.ux.ProgressBarPager',
        'Ext.ux.form.SearchField'
    ],

    plugins: [      
        {
            ptype: 'rowexpander',
            rowBodyTpl: new Ext.XTemplate(  
                '<div class="rowexpander-row">',
                '<p><b>' + MSG['created_date'] + ':</b></p>', 
                '</div>'
            )  
        }
    ],

    selType: 'checkboxmodel', 


    config: {
        store: 'dina.Service_dina'  
    },

    initComponent: function() {
        var me = this;
        Ext.apply(me, {
            store: me.getStore(),
            columns: [
                {
                    header: MSG['p_name'],
                    dataIndex: 'p_name',
                    flex: 1
                },
                {
                    header: MSG['p_cost'],
                    dataIndex: 'p_cost',
                    flex: 1
                },  {
                    header: MSG['p_amount'],
                    dataIndex: 'p_amount',
                    flex: 1
                }, {
                    header: MSG['p_time'],
                    dataIndex: 'p_time',
                    flex: 1
                }
            ],
            tbar: [
                {
                    text: MSG['add_user'],
                    action: 'add_user',

                }, {
                    text: MSG['edit_user'],
                    action: 'edit_user',
                    allowMulti: false
                }, {
                    text: MSG['delete_user'],
                    action: 'delete_user',
                    allowMulti: true
                }, {
                    text: MSG['p_total'],
                    action: 'p_total',
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
                displayInfo: true,
                plugins: new Ext.ux.ProgressBarPager()
            }
        });

        me.callParent(arguments);
    }
});