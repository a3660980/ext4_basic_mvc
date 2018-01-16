Ext.define('Console.controller.MessageLog', {
	extend: 'Ext.app.Controller',

	stores: [
		'MessageLog'
	],
    models: [
    	'MessageLog'
    ],
	views: [
		'MessageLog.TabPanel',
		'MessageLog.GridMaster'
	],
});