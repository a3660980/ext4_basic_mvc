Ext.define('Console.model.AccountProfile',
{
	extend: 'Ext.data.Model',
	fields: [
	{
		name: 'corp_id',
		type: 'string'
	}, {
		name: 'corp_name',
		type: 'string'
	}, {
		name: 'copr_code',
		type: 'string'
	}, {
		name: 'corp_status',
		type: 'string'
	}, {
		name: 'created_date',
		type: 'string'
	}, {
		name: 'updated_date',
		type: 'string'
	}, {
		name: 'server_id',
		type: 'string'
	}, {
		name: 'server_ip',
		type: 'string'
	}, {
		name: 'server_port',
		type: 'string'
	}, {
		name: 'server_domain',
		type: 'string'
	}, {
		name: 'server_mac1',
		type: 'string'
	}, {
		name: 'server_mac2',
		type: 'string'
	}, {
		name: 'server_max_session',
		type: 'string'
	}, {
		name: 'server_expire_date',
		type: 'string'
	}
	]
}
);
