Ext.define('Console.store.Johnny.BranchRoomPhoto', {
    extend: 'Ext.data.Store',
    model: 'Console.model.Johnny.BranchRoomPhoto',
    proxy: {
        actionMethods: 'POST',
        type: 'ajax',
        api: {
            read: './modules/source/store/Johnny/getBranchRoomPhoto.php',
            destroy: './modules/source/controller/JohnnyBranchPhoto/deleteBranchRoomPhoto.php'
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