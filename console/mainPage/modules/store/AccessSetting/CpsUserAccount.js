Ext.define('Console.store.AccessSetting.CpsUserAccount', {
	extend: 'Ext.data.Store',
	model: 'Console.model.AccessSetting.CpsUserAccount',
	proxy: {
		actionMethods: 'POST',
        type: 'ajax',
        api: {
        	read: './modules/source/store/AccessSetting/getCpsUserAccount.php',
        },
		reader: {
			type: 'json',
			totalProperty: 'total',
			root: 'result'
		}
	},
	pageSize: 10,
	autoLoad: true
});