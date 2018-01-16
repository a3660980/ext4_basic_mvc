Ext.define('Console.store.ServiceLog', {
    extend: 'Ext.data.Store',
    model: 'Console.model.ServiceLog',
    proxy: {
        actionMethods: 'POST',
        type: 'ajax',
        api: {
            read: './modules/source/store/getServiceLog.php'
        },
        reader: {
            type: 'json',
            totalProperty: 'total',
            root: 'result'
        }
    },
    autoLoad: true
});