Ext.define('Console.store.HotelDetail.HotelRoom', {
    extend: 'Ext.data.Store',
    model: 'Console.model.HotelDetail.HotelRoom',
    proxy: {
        actionMethods: 'POST',
        type: 'ajax',
        api: {
            read: './modules/source/store/HotelDetail/getHotelRoom.php'
        },
        reader: {
            type: 'json',
            totalProperty: 'total',
            root: 'result'
        }
    },
    autoLoad: true
});