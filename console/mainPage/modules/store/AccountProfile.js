Ext.define('Console.store.AccountProfile', {
	extend: 'Ext.data.Store',
	model: 'Console.model.AccountProfile',
	proxy: {
		actionMethods: 'POST',
        type: 'ajax',
        api: {
            read: './modules/source/store/getAccountProfile.php'
        },
		reader: {
			type: 'json',
			totalProperty: 'total',
			root: 'result'
		}
	},
	autoLoad: true
});