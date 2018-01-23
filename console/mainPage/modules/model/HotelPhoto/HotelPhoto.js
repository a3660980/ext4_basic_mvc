Ext.define('Console.model.HotelPhoto.HotelPhoto',
{
	extend: 'Ext.data.Model',
	fields: [
	{
		name:'branch_photo_id',
		type:'string'
	},{
		name:'branch_id',
		type:'string'
	},{
		name:'photo_sort',
		type:'string'
	},{
		name:'photo_name',
		type:'string'
	},{
		name:'photo_url',
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