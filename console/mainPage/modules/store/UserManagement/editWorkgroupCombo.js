Ext.define('Console.store.UserManagement.editWorkgroupCombo', {
    extend: 'Ext.data.Store',
    model: 'Console.model.UserManagement.CpsUserWorkgroup',
    proxy: {
        actionMethods: 'POST',
        type: 'ajax',
        api: {
            read: './modules/source/store/UserManagement/geteditWorkgroupCombo.php'
        },
        reader: {
            type: 'json',
            totalProperty: 'total',
            root: 'result'
        }
    },
    autoLoad: true
});