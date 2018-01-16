Ext.define('Console.store.GasBrandDetail', {
	extend: 'Ext.data.Store',
	model: 'Console.model.GasBrandDetail',
	proxy: {
		actionMethods: 'POST',
        type: 'ajax',
		api: {
			read: './modules/source/store/UserManagement/getGasBrand_Detail.php',
			destroy: './modules/source/controller/GasBrand_Detail/deleteGasBrand.php'
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