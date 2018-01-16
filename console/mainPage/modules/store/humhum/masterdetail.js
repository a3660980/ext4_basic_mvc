Ext.define('Console.store.humhum.masterdetail', {
    extend: 'Ext.data.Store',
    model: 'Console.model.humhum.Detail',
    proxy: {
        actionMethods: 'POST',
        type: 'ajax',
        api: {
            read: './modules/source/store/humhum/getmasterdetail_humhum.php',
            destroy: './modules/source/controller/humhum_master_detail/delete_detail_humhum.php'
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