Ext.define('Console.view.zoe.GridMaster_zoe', {
    extend: 'Console.override.Grid',
    alias: 'widget.zoeGridMaster',

    requires: [
        'Ext.ux.ProgressBarPager', //grid下方上下頁切頁元件
        'Ext.ux.form.SearchField'  //grid上方的search元件
    ],

    
    selType: 'checkboxmodel', //有方框勾選欄,可多選


    config: {
        store: 'zoe.Service_zoe'  //指定配置,儲存位置
    },

    initComponent: function() {
        var me = this;
        
        Ext.apply(me, {
            store: me.getStore(),
            columns: [
                {
                    header: MSG['id_ct'],
                    dataIndex: 't_id',
                    flex: 1
                },
                {
                    header: MSG['name_ct'],
                    dataIndex: 't_name',
                    flex: 1
                },  {
                    header: MSG['department'],
                    //dataIndex: 'd_name',
                    dataIndex: 't_dep',
                    flex: 1,
                    //如資料來源在store是代碼，那要用function的方式轉換代碼資料才可顯示中文
                    renderer :function(value, p, r){
                        var dep = r.data['t_dep'];
                        switch (dep) {
                            case dep = '02':
                                return '總經理室';
                            case dep = '04':
                                return '業務部';
                            case dep = '08':
                                return '資訊部';
                        }
                    }
                }, {
                    header: MSG['t_date1'],
                    dataIndex: 't_date1',
                    flex: 1
                }, {
                    header: MSG['t_date2'],
                    dataIndex: 't_date2',
                    flex: 1
                }
            ],
            tbar: [
                {
                    text: MSG['add_user'],
                    action: 'add_user'

                }, {
                    text: MSG['edit_user'],
                    action: 'edit_user',
                    allowMulti: false,
                    disabled: true
                }, {
                    text: MSG['delete_user'],
                    action: 'delete_user',
                    allowMulti: true,
                    disabled: true
                }, '->', {
                    //此type設在override.js中
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