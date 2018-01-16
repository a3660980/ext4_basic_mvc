Ext.define('Console.view.SessionManagement.GridMaster', {
	extend: 'Console.override.Grid',
	alias: 'widget.smgridmaster',

	requires: ['Ext.ux.ProgressBarPager'],

    config: {
        store: 'SessionManagement'
    },

	initComponent: function() {
        var me = this;

		Ext.apply(me, {
			store: me.getStore(),
			columns: [
    			{
    				xtype: 'rownumberer'
    			}, {
    				header: MSG['session_id'],
    				dataIndex: 'session_id',
    				flex: 2,
    				renderer: function(value, p, r) {
    					return Ext.util.Format.substr(r.data['session_id'], 0, 16);
    				}
    			}, {
    				header: MSG['session_user_name'],
    				dataIndex: 'session_user_name',
    				flex: 1
    			}, {
    				header: MSG['device_app_name'],
    				dataIndex: 'device_app_name'
    			}, {
    				header: MSG['session_start_date'],
    				dataIndex: 'session_start_date',
    				flex: 1
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