Ext.define('Console.store.betty.Service_RoomName', {
    extend: 'Ext.data.Store',
    model:'Console.model.betty.RoomCombo',
    proxy: {
        actionMethods: 'POST',
        type: 'ajax',
        api: {
            read: './modules/source/store/betty/getService_RoomName.php',//顯示
        },
        reader: {
            type: 'json',
            totalProperty: 'total',
            root: 'result'
        }
    },
    autoLoad: true
});