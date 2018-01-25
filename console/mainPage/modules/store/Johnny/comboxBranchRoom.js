Ext.define('Console.store.Johnny.comboxBranchRoom', {
    extend: 'Ext.data.Store',
    model: 'Console.model.Johnny.BranchRoomPhoto',
    proxy: {
        type: 'ajax',
        api: {
            read: './modules/source/store/Johnny/getComboxRoom.php',
        },
        reader: {
            type: 'json',
            root: 'result'
        }
    },
    autoLoad: true
});
