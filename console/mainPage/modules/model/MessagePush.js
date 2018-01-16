Ext.define('Console.model.MessagePush', {
	extend: 'Ext.data.Model',
	fields: [
    	{
    		name: 'uuid',
    		type: 'string'
    	},{
            name: 'message_push_payload',
            type: 'string'
        },{
            name: 'message_id',
            type: 'string'
        },{
            name: 'group_id',
            type: 'string'
        },{
            name: 'message_title',
            type: 'string'
        },{
    		name: 'message_source',
    		type: 'string'
    	},{
            name: 'message_sender',
            type: 'string'
        },{
            name: 'message_receiver',
            type: 'string'
        },{
            name: 'message_created_date',
            type: 'string'
        },{
            name: 'message_sent_date',
            type: 'string'
        },{
            name: 'message_received_date',
            type: 'string'
        },{
    		name: 'message_notified_date',
    		type: 'string'
    	},{
            name: 'message_notified_status',
            type: 'string'
        },{
    		name: 'message_status',
    		type: 'string'
    	}
	]
});