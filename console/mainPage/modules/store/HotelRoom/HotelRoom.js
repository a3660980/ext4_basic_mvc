Ext.define('Console.store.HotelRoom.HotelRoom', {
    extend: 'Ext.data.Store',
    model: 'Console.model.HotelRoom.HotelRoom',
    proxy: {
        actionMethods: 'POST',
        type: 'ajax',
        api: {
            read: './modules/source/store/HotelRoom/getHotelRoom.php',
            destroy: './modules/source/controller/HotelRoom/deleteHotelRoom.php'
            
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