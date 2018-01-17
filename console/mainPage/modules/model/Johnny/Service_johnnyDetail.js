Ext.define('Console.model.Johnny.Service_johnnyDetail', {
	extend: 'Ext.data.Model',
	fields: [
		{
            name:'detail_id',
            type:'string'
        },{
            name:'student_id',
            type:'string'
        },{
            name:'subject', //科目
            type:'string'
        },{
            name:'score',
            type:'string'
        },{
            name:'semester', //學期
            type:'string'
        },{
            name:'created_date',
            type:'string'
        },{
            name:'updated_date',
            type:'string'
        },{
            name:'operator', //操作員
            type:'string'
        }
	]
});