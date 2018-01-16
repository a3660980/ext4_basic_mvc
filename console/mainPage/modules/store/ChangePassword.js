Ext.define('Console.store.ChangePassword', {
	extend: 'Ext.data.Store',
	model: 'Console.model.ChangePassword',
	proxy: {
		actionMethods: 'POST',
        type: 'ajax',
        api: {
            read: './modules/source/store/getAdminProfile.php'
        },
		reader: {
			type: 'json',
			totalProperty: 'total',
			root: 'result'
		}
	},
	autoLoad: true
});