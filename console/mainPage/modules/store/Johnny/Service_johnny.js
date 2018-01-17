Ext.define('Console.store.Johnny.Service_johnny', {
    extend: 'Ext.data.Store',
    model: 'Console.model.Johnny.Service_johnny',
    proxy: {
        actionMethods: 'POST',
        type: 'ajax',
        api: {
            read: './modules/source/store/Johnny/getStudent.php',
            destroy: './modules/source/controller/Johnny/deleteStudent.php'
        },
        reader: {
            type: 'json',
            totalProperty: 'total',
            root: 'result'
        },
        writer: {
            type: 'json',
            totalProperty: 'total',
            encode: true,
            root: 'data'
        }
    },
    autoLoad: true
});