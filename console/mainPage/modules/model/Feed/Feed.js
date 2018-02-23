Ext.define('Console.model.Feed.Feed', {
	extend: 'Ext.data.Model',
	fields: [{
		name: 'id',
		type: 'string'
	}, {
		name: 'name',
		type: 'string'
	}, {
		name: 'content',
		type: 'string'
	}, {
		name: 'title',
		type: 'string'
	}]
});