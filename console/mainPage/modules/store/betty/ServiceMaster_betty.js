Ext.define('Console.store.betty.ServiceMaster_betty', {
    extend: 'Ext.data.Store',
    model: 'Console.model.betty.Service_bettymaster',//model資料夾中要用的model
    proxy: {
        actionMethods: 'POST',
        type: 'ajax',
        api: {
            read: './modules/source/store/betty/getServicemaster_betty.php',//顯示
            destroy: './modules/source/controller/betty2/deletemaster_betty.php'//刪除
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