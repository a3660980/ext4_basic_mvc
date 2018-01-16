Ext.define('Console.store.MessageLog', {
	extend: 'Ext.data.Store',
	model: 'Console.model.MessageLog',

	proxy: {
		actionMethods: 'POST',
        type: 'ajax',
        api: {
            read: './modules/source/store/getMessageLog.php'
        },
		reader: {
			type: 'json',
			totalProperty: 'total',
			root: 'result'
		}
	},
	autoLoad: true
});