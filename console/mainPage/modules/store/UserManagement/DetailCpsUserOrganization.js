Ext.define('Console.store.UserManagement.DetailCpsUserOrganization', {
    extend: 'Ext.data.Store',
    model: 'Console.model.UserManagement.CpsUserOrganization',
    proxy: {
        actionMethods: 'POST',
        type: 'ajax',
        api: {
            read: './modules/source/store/SettingUnit/getDetailCpsUserOrganization.php',
            destroy: './modules/source/controller/SettingUnit/deleteDetailCpsUserOrganization.php'
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