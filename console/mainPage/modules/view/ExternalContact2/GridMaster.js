Ext.define('Console.view.ExternalContact2.GridMaster', {
	extend: 'Console.override.Grid',
	alias: 'widget.ecgridmaster2',
// 外框
	requires: [
		'Ext.ux.ProgressBarPager',
		'Ext.ux.form.SearchField'
	],

	selType: 'checkboxmodel',
// 勾勾
    config: {
        store: 'ExternalContact'
    },
//存取路徑
	initComponent: function() {
        var me = this;

		Ext.apply(me, {
			store: me.getStore(),
			columns: [
                 {
                    header: MSG['student_id'],
                    // MSG['顯示名稱']
                    dataIndex: 'student_id',
                    // 對應資料欄位
                    flex: 1
                    // 顯示框架比例
                },  {
                    header: MSG['name_'],
                    dataIndex: 'name',
                    flex: 1
                },  {
                    header: MSG['gender_b'],
                    dataIndex: 'gender',
                    flex: 1
                }, {
                    header: MSG['email_b'],
                    dataIndex: 'email',
                    flex: 2
                },{
                    header: MSG['mobile_number_b'],
                    dataIndex: 'phone',
                    flex: 1
                }, {
                    header: MSG['address_b'],
                    dataIndex: 'address',
                    flex: 3
                },{
                    header: MSG['birthday_b'],
                    dataIndex: 'birthday',
                    flex: 1
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                // 
                store: me.getStore(),
                displayInfo: true,
                plugins: new Ext.ux.ProgressBarPager()
            }

        });

        me.callParent(arguments);
    }
});