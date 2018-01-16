Ext.define('Console.model.TaiwanZipCode',
{
	extend : 'Ext.data.Model',
	fields : [
	{
		name : 'address_county',
		type : 'string'
	}, {
		name : 'address_city',
		type : 'string'
	}, {
		name : 'display_address_county',
		type : 'string'
	}, {
		name : 'display_address_city',
		type : 'string'
	}, {
		name : 'display_address_zip',
		type : 'string'
	}, {
		name : 'address_zip',
		type : 'string'
	}, {
		name : 'children',
		type : 'string'
	}, {
		name : 'index',
		type : 'string'
	}
	]
}
);