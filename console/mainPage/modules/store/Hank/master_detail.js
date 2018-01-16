Ext.define('Console.store.Hank.master_detail', {
	extend: 'Ext.data.Store',
	model: 'Console.model.Hank.ExternalHank',
	proxy: {
		actionMethods: 'POST',
		type: 'ajax',
		api: {
			read: './modules/source/store/Hank/getExternalContact.php',
			destroy: './modules/source/controller/Hank/deleteExternalContact.php'
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