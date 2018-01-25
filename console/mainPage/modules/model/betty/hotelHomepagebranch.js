Ext.define('Console.model.betty.hotelHomepagebranch',
{
	extend: 'Ext.data.Model',
	fields: [ //對應資料庫
	{
		name:'branch_id',
		type:'String'
	},{
		name:'branch_sort',
		type:'String'
	},{
		name:'branch_name',
		type:'String'
	},{
		name:'branch_photo',
		type:'String'
	},{
		name:'user_i18n',
		type:'String'
	},{
		name:'created_date',
		type:'String'
	},{
        name:'updated_date',
        type:'String'
	},{
		name:'operator',
		type:'String'

	}
	]
}
);