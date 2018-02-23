Ext.define('Console.store.Feed.Feed', {
    extend: 'Ext.data.Store',
    model: 'Console.model.Feed.Feed',
    proxy: {
        actionMethods: 'POST',
        type: 'ajax',
        api: {
            read: './modules/source/store/Feed/getFeed.php',
            destroy: './modules/source/controller/Feed/deleteFeed.php'
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