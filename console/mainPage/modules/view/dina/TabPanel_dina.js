Ext.define('Console.view.dina.TabPanel_dina', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.dintabpanel',

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
    				xtype: 'dingridmaster'
    			}, {
    				region: 'west',
    				xtype: 'dinactionpanel'
    			}
			]
		});

		me.callParent(arguments);
	}
});