Ext.define('Console.store.AccessSetting.CpsUserProfile', {
	extend: 'Ext.data.Store',
	model: 'Console.model.AccessSetting.CpsUserProfile',
	proxy: {
		actionMethods: 'POST',
        type: 'ajax',
        api: {
        	read: './modules/source/store/AccessSetting/getCpsUserProfile.php',
        	destroy: './modules/source/controller/AccessSetting/deleteAccessAccount.php'
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