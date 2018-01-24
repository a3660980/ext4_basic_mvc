Ext.define('Console.model.HotelDetail.HotelDetail',
{
	extend: 'Ext.data.Model',
	fields: [
	{
		name:'detail_id',
		type:'string'
	},{
		name:'branch_id',
		type:'string'
	},{
		name:'room_id',
		type:'string'
	},{
		name:'room_name',
		type:'string'
	},{
		name:'detail_sort',
		type:'string'
	},{
		name:'detail_name',
		type:'string'
	},{
		name:'detail_photo',
		type:'string'
	},{
		name:'user_i18n',
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
}
);