Ext.define('Console.store.UserManagement.CpsUserWorkgroup', {
    extend: 'Ext.data.Store',
    model: 'Console.model.UserManagement.CpsUserWorkgroup',
    proxy: {
        actionMethods: 'POST',
        type: 'ajax',
        api: {
            read: './modules/source/store/SettingGroup/getCpsUserWorkgroup.php',
            destroy: './modules/source/controller/SettingGroup/deleteCpsUserWorkgroup.php'
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