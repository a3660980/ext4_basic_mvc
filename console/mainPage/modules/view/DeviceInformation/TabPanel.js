Ext.define('Console.view.DeviceInformation.TabPanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.ditabpanel',

	requires: ['Ext.layout.container.Border'],

	layout: 'border',

	initComponent: function() {
        var me = this;
		Ext.applyIf(me, {
			header: false,
			closable: true,
			items: [
    			{
    				region: 'center',
    				xtype: 'digridmaster'
    			}
			]
		});

		me.callParent(arguments);
	}
});