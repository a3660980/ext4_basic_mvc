Ext.define('Console.view.humhum.TabPanel_humhum', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.yoyotabpanel',

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
    				xtype: 'yoyogridmaster'
    			}, {
    				region: 'east',
    				xtype: 'ActionPanel_humhum'
    			}, {
    				region: 'west',
    				xtype: 'leftactionpanel'
    			}
			]
		});

		me.callParent(arguments);
	}

});