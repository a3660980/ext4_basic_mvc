Ext.define('Console.model.ServiceInfo.ServiceInfo',
{
	extend: 'Ext.data.Model',
	fields: [
	{
		name:'service_id',
		type:'string'
	},{
		name:'service_code',
		type:'string'
	},{
		name:'service_name',
		type:'string'
	},{
		name:'service_introduction',
		type:'string'
	},{
		name: 'service_icon',
		type: 'string'
	}, {
		name: 'service_sort',
		type: 'string'
	}, {
		name: 'service_url',
		type: 'string'
	}, {
		name: 'service_security',
		type: 'string'
	}, {
		name: 'service_identity',
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