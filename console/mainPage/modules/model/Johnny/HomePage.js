Ext.define('Console.model.Johnny.HomePage',
{
	extend: 'Ext.data.Model',
	fields: [ 
		{
			name:'home_id',
			type:'string'
		},{
			name:'home_name',
			type:'string'
		},{
			name:'home_sort',
			type:'int'
		},{
			name:'home_photo',
			type:'string'
		},{
			name:'start_date',
			type:'string'
		},{
			name:'expire_date',
			type:'string'
		},{
			name:'created_date',
			type:'string'
		},{
			name:'updated_date',
			type:'string'
		},{
			name:'operator',
			type:'string'
		}
	]
});