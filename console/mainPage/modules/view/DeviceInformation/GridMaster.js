Ext.define('Console.view.DeviceInformation.GridMaster', {
	extend: 'Console.override.Grid',
	alias: 'widget.digridmaster',

	requires: ['Ext.ux.ProgressBarPager'],

    config: {
        store: 'DeviceInformation'
    },

	initComponent: function() {
        var me = this;

		Ext.apply(me, {
			store: me.getStore(),
			columns: [
    			{
    				xtype: 'rownumberer'
    			}, {
    				header: MSG['user_name'],
    				dataIndex: 'user_name',
    				flex: 1
    			}, {
    				header: MSG['device_app_name'],
    				dataIndex: 'device_app_name',
    				flex: 1
    			}, {
    				header: MSG['app_package_version'],
    				dataIndex: 'app_package_version'
    			}, {
    				header: MSG['device_vendor'],
    				dataIndex: 'device_vendor'
    			}, {
    				header: MSG['device_model'],
    				dataIndex: 'device_model',
                    flex: 1
    			}, {
    				header: MSG['device_os'],
    				dataIndex: 'device_os'
    			}, {
                    header: MSG['registration_date'],
                    dataIndex: 'registration_date',
                    flex: 1
                }, {
                    header: MSG['device_updated_date'],
                    dataIndex: 'device_updated_date',
                    flex: 1
                }, {
    				header: MSG['device_status'],
    				dataIndex: 'device_status',
    				renderer: function(value, p, r) {
    					return r.data['device_status'] == 0 ? 'NOT AVAILABLE'
                            : r.data['device_status'] == 1 ? 'ENABLE'
                            : r.data['device_status'] == 2 ? 'LOCK'
                            : r.data['device_status'] == 3 ? 'DISABLE'
                            : 'Undefined';
    				}
    			}
			],

			tbar: [
                '->', {
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