Ext.define('Console.store.SystemConfiguration.CpsAppPlatform', {
	extend: 'Ext.data.Store',
	model: 'Console.model.SystemConfiguration.CpsAppPlatform',
	proxy: {
		actionMethods: 'POST',
        type: 'ajax',
        api: {
        	read: './modules/source/store/SystemConfiguration/getCpsAppPlatform.php'
        },
		reader: {
			type: 'json',
			totalProperty: 'total',
			root: 'result'
		}
	}
});