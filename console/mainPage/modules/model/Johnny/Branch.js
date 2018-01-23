Ext.define('Console.model.Johnny.Branch',
{
	extend: 'Ext.data.Model',
	fields: [ 
		{
			name:'branch_id',
			type:'string'
		},{
			name:'branch_name',
			type:'string'
		},{
			name:'branch_sort',
			type:'int'
		},{
			name:'branch_photo',
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