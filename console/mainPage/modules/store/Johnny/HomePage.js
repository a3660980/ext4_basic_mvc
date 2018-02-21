Ext.define('Console.store.Johnny.HomePage', {
    extend: 'Ext.data.Store',
    model: 'Console.model.Johnny.HomePage',
    proxy: {
        actionMethods: 'POST',
        type: 'ajax',
        api: {
            read: './modules/source/store/Johnny/getHomePagePhoto.php',
            destroy: './modules/source/controller/JohnnyHomePage/deleteHomePagePhoto.php'
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
    autoLoad: true,
    
});