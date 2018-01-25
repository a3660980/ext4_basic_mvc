Ext.define('Console.store.betty.Service_hotelBranchpicture', {
    extend: 'Ext.data.Store',
    model: 'Console.model.betty.hotelBranchpicture',
    proxy: {
        actionMethods: 'POST',
        type: 'ajax',
        api: {
            read: './modules/source/store/betty/hotelBranchpicture.php',//顯示
            destroy: './modules/source/controller/betty_branchPicture/delete_picture_detail.php'//刪除
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