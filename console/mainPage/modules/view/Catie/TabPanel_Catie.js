Ext.define('Console.view.Catie.TabPanel_Catie', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.cttabpanel',

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
    				xtype: 'ctgridmaster'
    			}, {
    				region: 'east',
    				xtype: 'ctactionpanel'
    			}
			]
		});

		me.callParent(arguments);
	}
});