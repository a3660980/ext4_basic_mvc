Ext.define('Console.store.humhum.sort', {
    extend: 'Ext.data.Store',
    model: 'Console.model.humhum.model_humhum',
    proxy: {
        actionMethods: 'POST',
        type: 'ajax',
        api: {
            read: './modules/source/store/humhum/sort.php',
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