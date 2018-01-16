Ext.define('Console.view.AccessSetting.TabPanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.astabpanel',

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
    				xtype: 'asgridmaster'
    			}, {
    				region: 'east',
    				xtype: 'asactionpanel'
    			}
			]
		});

		me.callParent(arguments);
	}
});