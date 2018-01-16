Ext.define('Console.store.ExternalContact2', {
	extend: 'Ext.data.Store',
	model: 'Console.model.ExternalSun',
	proxy: {
		actionMethods: 'POST',
        type: 'ajax',
		api: {
			read: './modules/source/store/UserManagement/getExternalContact2.php',
			destroy: './modules/source/controller/UserManagement2/deleteExternalContact.php'
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