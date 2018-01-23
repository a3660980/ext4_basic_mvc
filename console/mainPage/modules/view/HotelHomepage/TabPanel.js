Ext.define('Console.view.HotelHomepage.TabPanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.hothomtabpanel',

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
    				xtype: 'hothomgridmaster'
    			}, {
    				region: 'east',
    				xtype: 'hothomactionpanel'
    			}
			]
		});

		me.callParent(arguments);
	}
});