Ext.define('Console.store.TaiwanAddress', 
{
	extend		: 'Ext.data.Store',
	model 		: 'Console.model.AddressMaster.AddressMaster',
	proxy 		: {
        type			: 'ajax',
        url				: './modules/source/store/getTaiwanAddress.php',
		reader			: {
			type			: 'json',
			totalProperty	: 'total',
			root			: 'result'
		}
	},
	autoLoad	: true
}
);