Ext.define('Console.store.HotelDetail.HotelDetail', {
    extend: 'Ext.data.Store',
    model: 'Console.model.HotelDetail.HotelDetail',
    proxy: {
        actionMethods: 'POST',
        type: 'ajax',
        api: {
            read: './modules/source/store/HotelDetail/getHotelDetail.php',
            destroy: './modules/source/controller/HotelDetail/deleteHotelDetail.php'
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