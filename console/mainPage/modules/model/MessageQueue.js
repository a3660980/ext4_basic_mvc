Ext.define('Console.model.MessageQueue', {
	extend: 'Ext.data.Model',
	fields: [
    	{
    		name: 'uuid',
    		type: 'string'
    	},{
    		name: 'message_title',
    		type: 'string'
    	},{
    		name: 'message_source',
    		type: 'string'
    	},{
    		name: 'message_priority',
    		type: 'string'
    	},{
    		name: 'device_app_name',
    		type: 'string'
    	},{
    		name: 'message_created_date',
    		type: 'string'
    	},{
    		name: 'message_notified_date',
    		type: 'string'
    	},{
    		name: 'message_received_date',
    		type: 'string'
    	},{
    		name: 'message_sender',
    		type: 'string'
    	},{
    		name: 'message_receiver',
    		type: 'string'
    	},{
    		name: 'message_type',
    		type: 'string'
    	},{
    		name: 'message_status',
    		type: 'string'
    	}
	]
});
