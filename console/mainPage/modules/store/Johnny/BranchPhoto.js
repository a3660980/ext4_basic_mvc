Ext.define('Console.store.Johnny.BranchPhoto', {
    extend: 'Ext.data.Store',
    model: 'Console.model.Johnny.BranchPhoto',
    proxy: {
        actionMethods: 'POST',
        type: 'ajax',
        api: {
            read: './modules/source/store/Johnny/getBranchPhoto.php',
            destroy: './modules/source/controller/JohnnyBranchPhoto/deleteBranchPhoto.php'
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