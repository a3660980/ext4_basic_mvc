Ext.define('Console.store.HotelPhoto.HotelPhoto', {
    extend: 'Ext.data.Store',
    model: 'Console.model.HotelPhoto.HotelPhoto',
    proxy: {
        actionMethods: 'POST',
        type: 'ajax',
        api: {
            read: './modules/source/store/HotelPhoto/getHotelPhoto.php',
            destroy: './modules/source/controller/HotelPhoto/deleteHotelPhoto.php'
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