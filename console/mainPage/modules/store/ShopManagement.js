Ext.define('Console.store.ShopManagement', {
	extend: 'Ext.data.Store',
	model: 'Console.model.ShopManagement',
	proxy: {
		actionMethods: 'POST',
        type: 'ajax',
		url: './modules/source/store/getShopManagement.php',
		reader: {
			type: 'json',
			totalProperty: 'total',
			root: 'result'
		}
	},
	sorters: [{ property:'updated_date', direction:'DESC'}],
	remoteSort: true,
	autoLoad: true
});