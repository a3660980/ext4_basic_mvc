Ext.define('Console.store.ServiceInfo.ServiceInfo', {
    extend: 'Ext.data.Store',
    model: 'Console.model.ServiceInfo.ServiceInfo',
    proxy: {
        actionMethods: 'POST',
        type: 'ajax',
        api: {
            read: './modules/source/store/ServiceInfo/getServiceInfo.php',
            destroy: './modules/source/controller/ServiceInfo/deleteServiceInfo.php'
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