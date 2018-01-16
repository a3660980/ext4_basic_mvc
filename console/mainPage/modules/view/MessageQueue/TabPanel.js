Ext.define('Console.view.MessageQueue.TabPanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.mqtabpanel',

	requires: ['Ext.layout.container.Border'],

	layout: 'border',

	initComponent: function() {
		var me = this

        Ext.applyIf(me, {
			header: false,
			closable: true,
			items: [
    			{
    				region: 'center',
    				xtype: 'mqgridmaster'
    			}
			]
		});

		me.callParent(arguments);
	}
});