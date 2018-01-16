Ext.define('Console.view.dina.GridMaster_dina', {
    extend: 'Console.override.Grid',
    alias: 'widget.dingridmaster',

    requires: [
        'Ext.ux.ProgressBarPager',
        'Ext.ux.form.SearchField'
    ],

    plugins: [      
        {
            ptype: 'rowexpander',//名稱前有+,可展開收縮
            rowBodyTpl: new Ext.XTemplate(  //使用模板擴充數組
                '<div class="rowexpander-row">',
                '<p><b>' + MSG['created_date'] + ':</b></p>', 
                '</div>'//MSG['created_date']表示製造日期(粗體)
            )  
        }
    ],

    selType: 'checkboxmodel', //有方框勾選欄,可多選


    config: {
        store: 'dina.Service_dina'  //指定配置,儲存位置
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