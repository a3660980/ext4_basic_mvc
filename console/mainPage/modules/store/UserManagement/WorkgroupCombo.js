Ext.define('Console.store.UserManagement.WorkgroupCombo', {
    extend: 'Ext.data.Store',
    model: 'Console.model.UserManagement.CpsUserWorkgroup',
    proxy: {
        actionMethods: 'POST',
        type: 'ajax',
        api: {
            read: './modules/source/store/UserManagement/getWorkgroupCombo.php'
        },
        reader: {
            type: 'json',
            totalProperty: 'total',
            root: 'result'
        }
    },
    autoLoad: true
});