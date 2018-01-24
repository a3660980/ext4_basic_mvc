Ext.define('Console.controller.Zoe',{
	extend: 'Ext.app.Controller',
	
	stores: [
	    //'zoe.Service_zoe',
	],

	models: [
	    'zoe.Service_zoe'
	],

	views:[
	    'zoe.TabPanel_zoe',
	    'zoe.GridMaster_zoe'

	],
	
	refs:[
	    {
	    	ref: 'actionPanel',
	        selector: 'zoeactionpanel'
	    },{
	    	ref: 'grid',
	    	selector: 'zoegridMaster'
	    }

	],

	init: function(){
		var me = this;
	}



});