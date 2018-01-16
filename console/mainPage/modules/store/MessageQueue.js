Ext.define('Console.store.MessageQueue', {
	extend: 'Ext.data.Store',
	model: 'Console.model.MessageQueue',
	proxy: {
		actionMethods: 'POST',
        type: 'ajax',
		api: {
            read: './modules/source/store/getMessageQueue.php'
        },
		reader: {
			type: 'json',
			totalProperty: 'total',
			root: 'result'
		}
	},
	autoLoad: true
});