Ext.define('Console.store.SessionManagement', {
	extend: 'Ext.data.Store',
	model: 'Console.model.SessionManagement',
	proxy: {
		actionMethods: 'POST',
        type: 'ajax',
        api: {
            read: './modules/source/store/getSessionManagement.php'
        },
		reader: {
			type: 'json',
			totalProperty: 'total',
			root: 'result'
		}
	},
	autoLoad: true
});