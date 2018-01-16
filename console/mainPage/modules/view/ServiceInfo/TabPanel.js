Ext.define('Console.view.ServiceInfo.TabPanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.sitabpanel',

	requires: ['Ext.layout.container.Border'],

	layout: 'border',

	initComponent: function() {
        var me = this;

		Ext.apply(me, {
			header: false,
			closable: true,
			items: [
    			 {
                    region: 'center',
                    xtype: 'sigridmaster'
                },{
                	region:'east',
                	xtype:'siactionpanel'	
                }
			]
		});

		me.callParent(arguments);
	}
});