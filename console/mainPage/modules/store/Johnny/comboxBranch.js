Ext.define('Console.store.Johnny.comboxBranch', {
    extend: 'Ext.data.Store',
    fields: [
        {
            name: 'com_name', // 等於 organization_name
            type: 'string'
        },{
            name: 'com_id', // 等於 organization_code
            type: 'string'
        }
    ],

    proxy: {
        actionMethods: 'POST',
        type: 'ajax',
        api: {
            read: './modules/source/store/Johnny/getComboxBranch.php',
        },
        reader: {
            type: 'json',
            totalProperty: 'total',
            root: 'result'
        }
    },
    autoLoad: true
});
