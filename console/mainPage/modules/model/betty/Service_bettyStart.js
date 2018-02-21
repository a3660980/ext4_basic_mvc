Ext.define('Console.model.betty.Service_bettyStart',
{
	extend: 'Ext.data.Model',
	fields: [ //對應資料庫
	{
		name:'p_name',
		type:'String'
	},{
		name:'p_cost',
		type:'String'
	},{
		name:'p_amount',
		type:'char'
	},{
		name:'p_time',
		type:'String'
	}
	]
}
);