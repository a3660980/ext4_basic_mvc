Ext.define('Console.store.Johnny.BranchRoom', {
    extend: 'Ext.data.Store',
    model: 'Console.model.Johnny.BranchRoom',
    proxy: {
        actionMethods: 'POST',
        type: 'ajax',
        api: {
            read: './modules/source/store/Johnny/getBranchRoom.php',
            destroy: './modules/source/controller/JohnnyBranchRoom/deleteBranchRoom.php'
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