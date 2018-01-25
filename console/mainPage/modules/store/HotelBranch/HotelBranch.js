Ext.define('Console.store.HotelBranch.HotelBranch', {
    extend: 'Ext.data.Store',
    model: 'Console.model.HotelBranch.HotelBranch',
    proxy: {
        actionMethods: 'POST',
        type: 'ajax',
        api: {
            read: './modules/source/store/HotelBranch/getHotelBranch.php',
            destroy: './modules/source/controller/HotelBranch/deleteHotelBranch.php'
            
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