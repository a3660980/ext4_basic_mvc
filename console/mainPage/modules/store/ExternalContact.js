Ext.define('Console.store.ExternalContact', {
	extend: 'Ext.data.Store',
	model: 'Console.model.ExternalAnt',
	proxy: {
		actionMethods: 'POST',
        type: 'ajax',
		api: {
			read: './modules/source/store/UserManagement/getExternalContact.php',
			destroy: './modules/source/controller/UserManagement/deleteExternalContact.php'
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