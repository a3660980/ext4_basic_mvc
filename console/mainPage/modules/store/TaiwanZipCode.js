Ext.define('Console.store.TaiwanZipCode', 
{
	extend		: 'Ext.data.Store',
	model 		: 'Console.model.TaiwanZipCode',
	proxy 		: {
        type			: 'ajax',
        url				: './modules/source/store/getTaiwanZipCode.php',
		reader			: {
			type			: 'json',
			totalProperty	: 'total',
			root			: 'result'
		}
	},
	autoLoad	: true
}
);