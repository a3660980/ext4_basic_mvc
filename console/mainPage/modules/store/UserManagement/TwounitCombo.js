Ext.define('Console.store.UserManagement.TwounitCombo', {
    extend: 'Ext.data.Store',
    model: 'Console.model.UserManagement.CpsUserOrganization',
    
    proxy: {
        actionMethods: 'POST',
        type: 'ajax',
        api: {
            read:  './modules/source/store/UserManagement/getTwounitCombo.php'
        },
        reader: {
            type: 'json',
            totalProperty: 'total',
            root: 'result'
        }
    },
    autoLoad: false
});