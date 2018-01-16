Ext.define('Console.store.Catie.ServiceInfo_Catie', {
    extend: 'Ext.data.Store',
    model: 'Console.model.Catie.ServiceInfo_Catie',
    proxy: {
        actionMethods: 'POST',
        type: 'ajax',
        api: {
            read: './modules/source/store/Catie/getServiceInfo_Catie.php',
            destroy: './modules/source/controller/Catie/deleteService_Catie.php'
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