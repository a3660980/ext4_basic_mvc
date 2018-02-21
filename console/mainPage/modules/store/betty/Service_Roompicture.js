Ext.define('Console.store.betty.Service_Roompicture', {
    extend: 'Ext.data.Store',
    model: 'Console.model.betty.RoomPicture',
    proxy: {
        actionMethods: 'POST',
        type: 'ajax',
        api: {
            read: './modules/source/store/betty/hotelRoompicture.php',//顯示
            destroy: './modules/source/controller/betty_RoomPicture/delete_roomPicture.php'//刪除
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