Ext.define('Console.view.zoe_detail.DetailGrid', {
    extend: 'Console.override.Grid',
    alias: 'widget.zoedetailgrid',

    requires: [
        'Ext.ux.ProgressBarPager',
        'Ext.ux.form.SearchField'
    ],

    selType: 'checkboxmodel',

    config: {
        store: 'zoe.Servicedetail_zoe'
    },

    initComponent: function() {
        var me = this;
        
        Ext.apply(me, {
            store: me.getStore(),
            columns: [
                {
                    dataIndex: 'sysid',
                    hidden : true                     
                },{
                    dataIndex: 't_id',
                    hidden : true                     
                },{
                    header: '評核年份',
                    dataIndex: 'p_year',
                    flex: 1
                     
                }, {
                    header: '績效評核(80%)',
                    dataIndex: 'p_part1',
                    flex: 1
                }, {
                    header: '職能評核(20%)',
                    dataIndex: 'p_part2',
                    flex: 1
                }, {
                    header: '總評核分數',
                    dataIndex: 'p_total',
                    flex: 1
                   
                }, {
                    header: '績效等級',
                    dataIndex: 'p_grade',
                    flex: 1
                   
                }, {
                    header:'評核時間',
                    dataIndex: 'p_date',
                    flex: 1,                   
                }, {
                    header:'更新時間',
                    dataIndex: 'p_update',
                    flex: 1                   
                }
                
            ],tbar: [//上層
                {
                    text: '新增',
                    action: 'add_data',
                    loadEnabled: true,
                    disabled: true

                }, {
                    text: '修改',
                    action: 'edit_data',
                    allowMulti: false,
                    disabled: true
                }, {
                    text: '刪除',
                    action: 'delete_data',
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
            bbar: { //確認 取消
                xtype: 'pagingtoolbar',
                store: me.getStore(),
                displayInfo: true,
                plugins: new Ext.ux.ProgressBarPager()
            }
        });

        me.callParent(arguments);

    }
});