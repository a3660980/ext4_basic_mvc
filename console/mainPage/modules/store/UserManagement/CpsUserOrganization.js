// Ext.define('Console.store.UserManagement.CpsUserOrganization', {
//     extend: 'Ext.data.Store',
//     model: 'Console.model.UserManagement.CpsUserOrganization',
//     proxy: {
//         actionMethods: 'POST',
//         type: 'ajax',
//         api: {
//             read: './modules/source/store/SettingUnit/getCpsUserOrganization.php',
//             destroy: './modules/source/controller/SettingUnit/deleteCpsUserOrganization.php'
//         },
//         reader: {
//             type: 'json',
//             totalProperty: 'total',
//             root: 'result'
//         },
//         writer: {
//             type: 'json',
//             totalProperty: 'total',
//             encode: true,
//             root: 'data'
//         }
//     },
//     autoLoad: true
// });

Ext.define('Console.store.UserManagement.CpsUserOrganization', {
    extend: 'Ext.data.Store',
    model: 'Console.model.UserManagement.CpsUserOrganization',
    proxy: {
        actionMethods: 'POST',
        type: 'ajax',
        api: {
            read: './modules/source/store/UserManagement/getCpsUserOrganization.php'
        },
        reader: {
            type: 'json',
            totalProperty: 'total',
            root: 'result'
        }
    },
    autoLoad: true
});