Ext.define('Console.store.UserManagement.CpsUserAccount', {
    extend: 'Ext.data.Store',
    model: 'Console.model.UserManagement.CpsUserAccount',
    proxy: {
        actionMethods: 'POST',
        type: 'ajax',
        api: {
            read: './modules/source/store/UserManagement/getCpsUserAccount.php',
            destroy: './modules/source/controller/UserManagement/deleteCpsUserAccount.php'
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