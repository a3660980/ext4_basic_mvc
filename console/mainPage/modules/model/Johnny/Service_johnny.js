Ext.define('Console.model.Johnny.Service_johnny',
{
	extend: 'Ext.data.Model',
	fields: [ //對應資料庫
	{
		name:'id',
		type:'varchar'
	},{
		name:'name',
		type:'varchar'
	},{
		name:'sex',
		type:'varchar'
	},{
		name:'email',
		type:'varchar'
	},{
		name:'cellphone',
		type:'varchar'
	}
	]
}
);