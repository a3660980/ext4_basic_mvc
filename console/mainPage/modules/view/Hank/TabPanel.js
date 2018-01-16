Ext.define('Console.view.Hank.TabPanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.hktabpanel',

	requires: ['Ext.layout.container.Border'],

	layout: 'border',

	initComponent: function() {
		var me = this;

		Ext.apply(me, {
			header: false,
			closable: true,
			items: [{
				region: 'center',
				xtype: 'hkgridmaster'
			}, {
				region: 'east',
				xtype: 'hkactionpanel'
			}]
		});

		me.callParent(arguments);
	}
});