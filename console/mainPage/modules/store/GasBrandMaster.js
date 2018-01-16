Ext.define('Console.store.GasBrandMaster', {
	extend: 'Ext.data.Store',
	model: 'Console.model.GasBrandMaster',
	proxy: {
		actionMethods: 'POST',
        type: 'ajax',
		api: {
			read: './modules/source/store/UserManagement/getGasBrand.php',
			destroy: './modules/source/controller/GasBrand/deleteGasBrand.php'
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