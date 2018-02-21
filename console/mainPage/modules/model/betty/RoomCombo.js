Ext.define('Console.model.betty.RoomCombo',
{
	extend: 'Ext.data.Model',
	fields: [ //對應資料庫
	{
		name:'room_id',
		type:'String'
	},{
		name:'branch_id',
		type:'String'
	},{
		name:'room_name',
		type:'String'
	}
	]
}
);