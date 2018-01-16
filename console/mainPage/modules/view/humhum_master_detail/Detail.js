Ext.define('Console.view.humhum_master_detail.Detail', {
	extend: 'Console.override.Grid',
	alias: 'widget.detail',

	requires: [
        'Ext.ux.ProgressBarPager',
        'Ext.ux.form.SearchField'
    ],

	selType: 'checkboxmodel',

    config: {
         store: 'humhum.masterdetail'
    },

	initComponent: function() {
        var me = this;

		Ext.apply(me, {
            store: me.getStore(),
            columns: [
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
                    action: 'detail_delete_user',
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