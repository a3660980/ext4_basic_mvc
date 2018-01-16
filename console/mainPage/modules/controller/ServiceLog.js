Ext.define('Console.controller.ServiceLog', {
    extend: 'Ext.app.Controller',

    stores: [
        'ServiceLog'
    ],
    models: [
        'ServiceLog'
    ],
    views: [
        'ServiceLog.TabPanel',
        'ServiceLog.GridMaster'
    ]
});