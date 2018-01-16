Ext.define('Console.store.dina.Service_dina', {
    extend: 'Ext.data.Store',
    model: 'Console.model.dina.Service_dina',
    proxy: {
        actionMethods: 'POST',
        type: 'ajax',
        api: {
            read: './modules/source/store/dina/getService_dina.php',
            destroy: './modules/source/controller/dina/deleteService_dina.php'
            //destroy function (override)選擇delete.php or get.php的url
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