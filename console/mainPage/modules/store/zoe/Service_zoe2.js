Ext.define('Console.store.zoe.Service_zoe2', {
    extend: 'Ext.data.Store',
    model: 'Console.model.zoe.Service_zoe2',
    proxy: {
        actionMethods: 'POST',
        type: 'ajax',
        api: {
            read: './modules/source/store/zoe/getService_zoe2.php',
            //destroy function (override)選擇delete.php or get.php的url
            //destroy: './modules/source/controller/zoe_detail/deleteServicedetail_zoe.php'
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