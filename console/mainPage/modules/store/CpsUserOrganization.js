Ext.define('Console.store.CpsUserOrganization', {
	extend: 'Ext.data.Store',
	model: 'Console.model.CpsUserOrganization',
	proxy: {
		actionMethods: 'POST',
        type: 'ajax',
        api: {
            read: './modules/source/store/UserManagement/getCpsUserOrganization.php'
        },
		reader: {
			type: 'json',
			totalProperty: 'total',
			root: 'result'
		}
	},
	autoLoad: true
});