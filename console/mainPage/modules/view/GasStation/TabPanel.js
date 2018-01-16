Ext.define('Console.view.GasStation.TabPanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.gstabpanel',
// 小框框
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
    				xtype: 'gsgridmaster'
    			}, {
    				region: 'west',
    				xtype: 'gsactionpanel'
    				// 視窗跳出方向
    			}
			]
		});

		me.callParent(arguments);
	}
});