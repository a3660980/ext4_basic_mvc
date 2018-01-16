Ext.define('Console.controller.SessionManagement', {
	extend: 'Ext.app.Controller',

	stores: [
		'SessionManagement'
	],
    models: [
    	'SessionManagement'
    ],

	views: [
		'SessionManagement.TabPanel',
		'SessionManagement.GridMaster'
	]
});