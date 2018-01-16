Ext.define('Console.view.MessageLog.TabPanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.mltabpanel',

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
    				xtype: 'mlgridmaster'
    			}
			]
		});

		me.callParent(arguments);
	}
});