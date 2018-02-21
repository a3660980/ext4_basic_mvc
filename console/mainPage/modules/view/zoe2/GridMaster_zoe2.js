Ext.define('Console.view.zoe2.GridMaster_zoe2', {
    extend: 'Console.override.Grid',
    alias: 'widget.zoegridmaster2',

    requires: [
        'Ext.ux.ProgressBarPager', //grid下方上下頁切頁元件
        'Ext.ux.form.SearchField'  //grid上方的search元件
    ],

    
    selType: 'checkboxmodel', //有方框勾選欄,可多選


    config: {
        store: 'zoe.Service_zoe2'  //指定配置,儲存位置
    },

    initComponent: function() {
        var me = this;
        
        Ext.apply(me, {
            store: me.getStore(),
            columns: [
                {
                    header: MSG['student_id_d'],
                    dataIndex: 's_id',
                    flex: 1
                },
                {
                    header: MSG['student_name_d'],
                    dataIndex: 'name',
                    flex: 1
                },  {
                    header: MSG['student_gender_d'],
                    dataIndex: 'sex',
                    flex: 1
                }, {
                    header: MSG['student_email_d'],
                    dataIndex: 'email',
                    flex: 4
                },{
                    header: MSG['student_phone_d'],
                    dataIndex: 'phone',
                    flex: 1
                }, {
                    header: MSG['student_address_d'],
                    dataIndex: 'address',
                    flex: 4
                },{
                    header: MSG['student_birthday_d'],
                    dataIndex: 'birthday',
                    flex: 1
                }
            ],
            tbar: [
                {
                    text: MSG['add'],
                    action: 'add_data'

                }, {
                    text: MSG['edit2'],
                    action: 'edit_data',
                    allowMulti: false,
                    disabled: true
                }, {
                    text: MSG['delete'],
                    action: 'delete_data',
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