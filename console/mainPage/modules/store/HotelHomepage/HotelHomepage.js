Ext.define('Console.store.HotelHomepage.HotelHomepage', {
    extend: 'Ext.data.Store',
    model: 'Console.model.HotelHomepage.HotelHomepage',
    proxy: {
        actionMethods: 'POST',
        type: 'ajax',
        api: {
            read: './modules/source/store/HotelHomepage/getHotelHomepage.php',
            destroy: './modules/source/controller/HotelHomepage/deleteHotelHomepage.php'
            
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