Ext.define('Console.store.betty.Service_hotelHomepage', {
    extend: 'Ext.data.Store',
    model: 'Console.model.betty.hotelHomepage',//model資料夾中要用的model
    proxy: {
        actionMethods: 'POST',
        type: 'ajax',
        api: {
            read: './modules/source/store/betty/hotelHomepage.php',//顯示
            destroy: './modules/source/controller/betty_hotel/delete_hotel.php'//刪除
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