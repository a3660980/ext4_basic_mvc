Ext.define('Console.store.Johnny.Branch', {
    extend: 'Ext.data.Store',
    model: 'Console.model.Johnny.Branch',
    proxy: {
        actionMethods: 'POST',
        type: 'ajax',
        api: {
            read: './modules/source/store/Johnny/getBranch.php',
            destroy: './modules/source/controller/JohnnyBranch/deleteBranch.php'
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