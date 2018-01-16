Ext.define('Console.view.MessageQueue.GridMaster', {
	extend: 'Console.override.Grid',
	alias: 'widget.mqgridmaster',

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
        store: 'MessageQueue'
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
    					return r.data['message_type'] == 1 ? 'Text'
                            : r.data['message_type'] == 2 ? 'Form'
                            : r.data['message_type'] == 3 ? 'File'
                            : 'Undefined';
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