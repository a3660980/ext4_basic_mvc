Ext.define('Console.store.betty.ServiceDetail_test', {
    extend: 'Ext.data.Store',
    model: 'Console.model.betty.Service_testdetail',
    proxy: {//proxy是設定資料取得的方法
        actionMethods: 'POST',
        type: 'ajax',
        api: {//連結後台
            read: './modules/source/store/betty/getServicedetail_test.php',//顯示
            destroy: './modules/source/controller/betty_test_detail/deletedetail_test.php'//刪除
            //destroy function (override)選擇delete.php or get.php的url
        },
        reader: {
            type: 'json',//用JSONReader解析Model
            totalProperty: 'total',//抓總數
            root: 'result'
        },
        writer: {
            type: 'json',
            totalProperty: 'total',
            encode: true,//請求參數的一部分，root有值的時候為true
            root: 'data'//取得值的參數
        }
    },
    autoLoad: true//自動載入
});