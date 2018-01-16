Ext.define('Console.store.betty.ServiceContract_status', {//因為值是固定的，所以可以直接寫死，不必另外寫PHP處理
    extend: 'Ext.data.Store',
    fields: [
        {
            name: 'display'
        }, {
            name: 'category_identity'
        }
    ],
    data: [
        {
            display: '配合',
            category_identity: '1'
        }, {
            display: '終止',
            category_identity: '2'
        }
        
    ]
});