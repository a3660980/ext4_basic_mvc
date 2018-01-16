Ext.define('Console.model.AccessSetting.AuthorizationItem',
{
	extend: 'Ext.data.Model',
	fields: [
	{
		name: 'id',
		type: 'string'
	}, {
		name: 'text_en',
		type: 'string'
	}, {
		name: 'text_big5',
		type: 'string'
	}, {
		name: 'leaf',
		type: 'boolean'
	}, {
		name: 'loaded',
		type: 'boolean',
		defaultValue: false
	}, {
		name: 'Properties'
	}, {
		name: 'expanded',
		defaultValue: true
	}, {
		name: 'checked',
		type: 'boolean'
	}
	]
}
);
