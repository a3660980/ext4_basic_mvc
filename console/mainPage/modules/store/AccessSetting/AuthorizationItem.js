Ext.define('Console.store.AccessSetting.AuthorizationItem', {
	extend: 'Ext.data.TreeStore',
	model: 'Console.model.AccessSetting.AuthorizationItem',
	proxy: {
        type: 'ajax',
        api: {
            read: './modules/source/store/AccessSetting/authorizationItem.json'
        },
		reader: {
			type: 'json'
		}
	},
	autoLoad: true
});