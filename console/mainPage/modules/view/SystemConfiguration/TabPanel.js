Ext.define('Console.view.SystemConfiguration.TabPanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.sctabpanel',

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
    				xtype: 'scpanelmasterdetail'
    			}, {
    				region: 'east',
    				xtype: 'scactionpanel'
    			}
			]
		});

		me.callParent(arguments);
	}
});