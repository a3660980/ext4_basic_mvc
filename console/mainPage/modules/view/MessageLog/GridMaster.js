Ext.define('Console.view.MessageLog.GridMaster', {
	extend: 'Console.override.Grid',
	alias: 'widget.mlgridmaster',

	requires: ['Ext.ux.ProgressBarPager'],

	plugins: [
    	{
    		ptype: 'rowexpander',
    		rowBodyTpl: new Ext.XTemplate(
    			'<div class="rowexpander-row2">',
    			'<p><b>' + MSG['uuid'] + ':</b> {uuid}</p>',
    			'<p><b>' + MSG['message_title'] + ':</b> {message_title}</p>',
    			'<p><b>' + MSG['message_source'] + ':</b> {message_source}</p>',
    			'<p><b>' + MSG['message_priority'] + ':</b> {message_priority}</p>',
    			'</div>'
    		)
    	}
	],

    config: {
        store: 'MessageLog'
    },

	initComponent: function() {
        var me = this;

		Ext.apply(me, {
			store: me.getStore(),
			columns: [
    			{
    				xtype: 'rownumberer'
    			}, {
    				header: MSG['device_app_name'],
    				dataIndex: 'device_app_name'
    			}, {
    				header: MSG['message_created_date'],
    				dataIndex: 'message_created_date',
    				flex: 1
    			}, {
    				header: MSG['message_notified_date'],
    				dataIndex: 'message_notified_date',
    				flex: 1
    			}, {
    				header: MSG['message_received_date'],
    				dataIndex: 'message_received_date',
    				flex: 1
    			}, {
    				header: MSG['message_sender'],
    				dataIndex: 'message_sender',
    				flex: 1
    			}, {
    				header: MSG['message_receiver'],
    				dataIndex: 'message_receiver',
    				flex: 1
    			}, {
    				header: MSG['message_type'],
    				dataIndex: 'message_type',
    				renderer: function(value, p, r) {
    					var v = r.data['message_type'];
    					return v == 1 ? 'Text'
                            :  v == 2 ? 'Form'
                            :  v == 3 ? 'File'
                            : '';
    				}
    			}, {
    				header: MSG['message_status'],
    				dataIndex: 'message_status'
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