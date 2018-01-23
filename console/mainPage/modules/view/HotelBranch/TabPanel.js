Ext.define('Console.view.HotelBranch.TabPanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.hotbratabpanel',

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
    				xtype: 'hotbragridmaster'
    			}, {
    				region: 'east',
    				xtype: 'hotbraactionpanel'
    			}
			]
		});

		me.callParent(arguments);
	}

});