Ext.define('Console.view.ServiceLog.GridMaster', {
	extend: 'Console.override.Grid',
	alias: 'widget.slgridmaster',

	requires: ['Ext.ux.ProgressBarPager'],

    plugins: [
        {
            ptype: 'rowexpander',
            rowBodyTpl: new Ext.XTemplate(
                '<div class="rowexpander-row">',
                '<p><b>' + MSG['service_url'] + ':</b> {service_url}</p>',
                '<p><b>' + MSG['service_response'] + ':</b> {service_response}</p>',
                '</div>'
            )
        }
    ],

    config: {
        store: 'ServiceLog'
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
    				header: MSG['user_app_version'],
    				dataIndex: 'user_app_version'
    			}, {
    				header: MSG['device_vendor'],
    				dataIndex: 'device_vendor'
    			}, {
    				header: MSG['device_model'],
    				dataIndex: 'device_model'
    			}, {
    				header: MSG['device_os'],
    				dataIndex: 'device_os'
    			}, {
                    header: MSG['service_name'],
                    dataIndex: 'service_name',
                    flex: 3
                }, {
                    header: MSG['request_datetime'],
                    dataIndex: 'request_datetime',
                    flex: 2
                }, {
                    header: MSG['response_datetime'],
                    dataIndex: 'response_datetime',
                    flex: 2
                }, {
                    header: MSG['response_level'],
                    dataIndex: 'response_level',
                    flex: 2
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