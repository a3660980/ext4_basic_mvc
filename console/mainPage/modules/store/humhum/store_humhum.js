Ext.define('Console.store.humhum.store_humhum', {
    extend: 'Ext.data.Store',
    model: 'Console.model.humhum.model_humhum',
    proxy: {
        actionMethods: 'POST',
        type: 'ajax',
        api: {
            read: './modules/source/store/humhum/getServiceInfo_humhum.php',
            destroy: './modules/source/controller/humhum/deleteServiceInfo_humhum.php'
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