Ext.define('Console.view.JohnnyDetail.DetailPanel', {
	extend: 'Console.override.Grid',
	alias: 'widget.johnnyDetailPanel',

	requires: [
        'Ext.ux.ProgressBarPager',
    ],

	selType: 'checkboxmodel',

    config: {
         store: 'Johnny.Service_johnnyDetail',
    },

	initComponent: function() {
        var me = this;
		Ext.apply(me, {
            store: me.getStore(),
            columns: [
                {
                    header: MSG['detail_id'],
                    dataIndex: 'detail_id',
                    flex: 1,
                    hidden:true
                },
                {
                    header: MSG['student_id'],
                    dataIndex: 'student_id',
                    flex: 1,
                    hidden:true
                },
                {
                    header: MSG['subject'],
                    dataIndex: 'subject',
                    flex: 1
                }, {
                    header: MSG['score'],
                    dataIndex: 'score',
                    flex: 1
                }, {
                    header: MSG['semester'],
                    dataIndex: 'semester',
                    flex: 1
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
                    text: MSG['testadd'],
                    action: 'detail_add_user',
                    loadEnabled: true,
                    disabled: true
                }, {
                    text: MSG['testedit'],
                    action: 'detail_edit_user',
                    allowMulti: false,
                    disabled: true
                }, {
                    text: MSG['testdelete'],
                    action: 'detail_delete_detail',
                    allowMulti: true,
                    disabled: true
                }, 
                '->', 
                {
                    xtype: 'searchfieldmvc',
                    store: me.getStore(),
                    fieldLabel: MSG['search'],
                    labelWidth: 50,
                    width: 200,
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