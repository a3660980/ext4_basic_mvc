Ext.define('Console.model.ExternalSun', {
	extend: 'Ext.data.Model',
	fields: [
    	{
            name:'uuid',
            type:'string'
        },{
            name:'subject',
            type:'string'
        },{
            name:'student_id',
            type:'Number'
        },{
            name:'score',
            type:'Number'
        },{
            name:'test_date',
            type:'string'
        }
	]
});