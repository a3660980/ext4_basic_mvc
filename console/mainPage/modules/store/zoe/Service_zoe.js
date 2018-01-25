Ext.define('Console.store.zoe.Service_zoe', {
    extend: 'Ext.data.Store',
    model: 'Console.model.zoe.Service_zoe',
    proxy: {
        actionMethods: 'POST',
        type: 'ajax',
        api: {
            read: './modules/source/store/zoe/getService_zoe.php'
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