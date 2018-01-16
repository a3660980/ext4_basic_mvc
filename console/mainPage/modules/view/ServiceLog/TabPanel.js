Ext.define('Console.view.ServiceLog.TabPanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.sltabpanel',

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
    				xtype: 'slgridmaster'
    			}
			]
		});

		me.callParent(arguments);
	}
});