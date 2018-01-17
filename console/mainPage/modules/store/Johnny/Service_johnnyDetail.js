Ext.define('Console.store.Johnny.Service_johnnyDetail', {
    extend: 'Ext.data.Store',
    model: 'Console.model.Johnny.Service_johnnyDetail',
    proxy: {
        actionMethods: 'POST',
        type: 'ajax',
        api: {
            read: './modules/source/store/Johnny/getStudentDetail.php',
            destroy: './modules/source/controller/JohnnyDetail/deleteDetail.php'
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