Ext.define('Console.model.HotelRoom.HotelRoom',
{
	extend: 'Ext.data.Model',
	fields: [
	{
		name:'room_id',
		type:'string'
	},{
		name:'branch_id',
		type:'string'
	},{
		name:'branch_name',
		type:'string'
	},{
		name:'room_sort',
		type:'string'
	},{
		name:'room_name',
		type:'string'
	},{
		name:'room_spec',
		type:'string'
	},{
		name:'room_photo',
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