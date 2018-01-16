Ext.define('Console.store.UserManagement.OneunitCombo', {
    extend: 'Ext.data.Store',
    model: 'Console.model.UserManagement.CpsUserOrganization',

    proxy: {
        actionMethods: 'POST',
        type: 'ajax',
        api: {
            read:  './modules/source/store/UserManagement/getOneunitCombo.php'
        },
        reader: {
            type: 'json',
            totalProperty: 'total',
            root: 'result'
        }
    },
    autoLoad: true
});