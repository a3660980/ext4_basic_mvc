Ext.define('Console.store.GasStation', {
	extend: 'Ext.data.Store',
	model: 'Console.model.GasStation',
	proxy: {
		actionMethods: 'POST',
        type: 'ajax',
		api: {
			read: './modules/source/store/UserManagement/getGasStation.php',
			destroy: './modules/source/controller/GasStation/deleteExternalContact.php'
		},
		reader: {
			type: 'json',
			totalProperty: 'total',
			root: 'result'
		},
		writer: {
			type: 'json',
			totalProperty: 'total',
			encode: true,
			root: 'data'
		}
	},
	autoLoad: true
});