Ext.define('Console.store.ServiceCategory.ServiceCategory', {
    extend: 'Ext.data.Store',
    model: 'Console.model.ServiceCategory.ServiceCategory',
    proxy: {
        actionMethods: 'POST',
        type: 'ajax',
        api: {
            read: './modules/source/store/ServiceCategory/getServiceCategory.php',
            destroy: './modules/source/controller/ServiceCategory/deleteServiceCategory.php'
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