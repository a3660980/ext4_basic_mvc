Ext.define('Console.store.UserManagement.TreeCpsUserOrganization', {
    extend: 'Ext.data.TreeStore',
    model: 'Console.model.UserManagement.CpsUserOrganization',

    proxy: {
        type: 'ajax',
        url : './modules/source/store/UserManagement/getCpsUserOrganization.php',
        reader: {
            type: 'json'
        }
    },

    autoLoad: true
});