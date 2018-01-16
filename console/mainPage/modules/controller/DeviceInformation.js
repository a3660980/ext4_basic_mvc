Ext.define('Console.controller.DeviceInformation', {
	extend: 'Ext.app.Controller',

	stores: [
		'DeviceInformation'
	],
    models: [
    	'DeviceInformation'
    ],
	views: [
		'DeviceInformation.TabPanel',
		'DeviceInformation.GridMaster'
	],
});