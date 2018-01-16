Ext.define('Console.store.DeviceInformation', {
	extend: 'Ext.data.Store',
	model: 'Console.model.DeviceInformation',
	proxy: {
		actionMethods: 'POST',
        type: 'ajax',
        api: {
        	read: './modules/source/store/getDeviceInformation.php'
        },
		reader: {
			type: 'json',
			totalProperty: 'total',
			root: 'result'
		}
	},
	autoLoad: true
});