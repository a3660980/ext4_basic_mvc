Ext.define('Console.store.UserManagement.CpsWorkgroupMember', {
    extend: 'Ext.data.Store',
    model: 'Console.model.UserManagement.CpsWorkgroupMember',
    proxy: {
        actionMethods: 'POST',
        type: 'ajax',
        api: {
            read: './modules/source/store/GroupsList/getCpsWorkgroupMember.php',
            destroy: './modules/source/controller/GroupsList/deleteCpsWorkgroupMember.php'
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
    autoLoad: false
});