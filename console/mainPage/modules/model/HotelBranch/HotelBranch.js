Ext.define('Console.model.HotelBranch.HotelBranch',
{
	extend: 'Ext.data.Model',
	fields: [
	{
		name:'branch_id',
		type:'string'
	},{
		name:'branch_sort',
		type:'string'
	},{
		name:'branch_name',
		type:'string'
	},{
		name:'branch_photo',
		type:'string'
	},{
		name: 'user_i18n',
		type: 'string'
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
}
);