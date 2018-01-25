Ext.define('Console.store.HotelDetail.RoomId', {
    extend: 'Ext.data.Store',
    model: 'Console.model.HotelDetail.HotelDetail',
    proxy: {
        type: 'ajax',
        url: './modules/source/store/HotelDetail/getRoomId.php',
        reader: {
            type: 'json',
        }
    }
});
