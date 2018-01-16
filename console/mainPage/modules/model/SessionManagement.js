Ext.define('Console.model.SessionManagement',
{
	extend: 'Ext.data.Model',
	fields: [
	{
		name: 'session_id',
		type: 'string'
	},{
		name: 'user_name',
		type: 'string'
	},{
		name: 'device_app_name',
		type: 'string'
	},{
		name: 'session_start_date',
		type: 'string'
	},
	{
		name: 'session_user_name',
		type: 'string'
	}
	]
}
);
