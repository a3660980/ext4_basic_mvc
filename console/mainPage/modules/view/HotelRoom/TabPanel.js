Ext.define('Console.view.HotelRoom.TabPanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.hotrootabpanel',

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
    				xtype: 'hotroogridmaster'
    			}, {
    				region: 'east',
    				xtype: 'hotrooactionpanel'
    			}
			]
		});

		me.callParent(arguments);
	}

});