Ext.define('Console.model.humhum.Detail',
{
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
        type:'string'
    },{
        name:'score',
        type:'string'
    },{
        name:'semester',
        type:'string'
    }
    ]
}
);