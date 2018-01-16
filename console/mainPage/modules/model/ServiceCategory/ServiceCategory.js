Ext.define('Console.model.ServiceCategory.ServiceCategory',
{
	extend: 'Ext.data.Model',
	fields: [
	{
		name:'category_id',
		type:'string'
	},{
		name:'category_code',
		type:'string'
	},{
		name:'service_id',
		type:'string'
	},{
		name:'category_name',
		type:'string'
	},{
		name:'category_introduction',
		type:'string'
	},{
		name: 'category_icon',
		type: 'string'
	}, {
		name: 'category_sort',
		type: 'string'
	}, {
		name: 'category_url',
		type: 'string'
	}, {
		name: 'category_security',
		type: 'string'
	}, {
		name: 'category_identity',
		type: 'string'
	}, {
		name: 'created_date',
		type: 'string'
	}, {
		name:'updated_date',
		type:'string'
	}, {
		name:'operator',
		type:'string'
	}
	]
}
);