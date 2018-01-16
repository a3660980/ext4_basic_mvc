Ext.define('Console.controller.MessageQueue', {
	extend: 'Ext.app.Controller',

	stores: [
		'MessageQueue'
	],
    models: [
    	'MessageQueue'
    ],
	views: [
		'MessageQueue.TabPanel',
		'MessageQueue.GridMaster'
	]
});