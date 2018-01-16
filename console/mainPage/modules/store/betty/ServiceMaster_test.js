Ext.define('Console.store.betty.ServiceMaster_test', {
    extend: 'Ext.data.Store',//繼承Ext.data.Store的所有功能
    model: 'Console.model.betty.Service_testmaster',//要使用到的model
    proxy: { //proxy是設定資料取得的方法
        actionMethods: 'POST',
        type: 'ajax',
        api: {//連結後台
            read: './modules/source/store/betty/getServicemaster_test.php',//顯示
            destroy: './modules/source/controller/betty_test_master/deletemaster_test.php'//刪除
            //destroy function (override)選擇delete.php or get.php的url
        },
        reader: {//reader是設定資料讀取的方法
            type: 'json',//用JSONReader解析Model
            totalProperty: 'total',//抓總數
            root: 'result'
        },
        writer: {
            type: 'json',
            totalProperty: 'total',
            encode: true,//請求參數的一部分，root有值的時候為true
            root: 'data'
        }
    },
    autoLoad: true
});