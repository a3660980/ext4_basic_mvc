Ext.define('Console.store.SystemConfiguration.CpsAppDescription', {
	extend: 'Ext.data.Store',
	model: 'Console.model.SystemConfiguration.CpsAppDescription',
	proxy: {
		actionMethods: 'POST',
        type: 'ajax',
        api: {
        	read: './modules/source/store/SystemConfiguration/getCpsAppDescription.php',
        },
		reader: {
			type: 'json',
			totalProperty: 'total',
			root: 'result'
		}
	},
	autoLoad: true
});