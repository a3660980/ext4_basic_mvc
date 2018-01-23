Ext.define('Console.view.bettyHotel.TabPanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.bhtabpanel',
	requires: ['Ext.layout.container.Border'],//api框架

	layout: 'border',

	initComponent: function() {
        var me = this;//這行一定要寫

		Ext.apply(me, {
			header: true,
			closable: true,
			items: [
    			{
    				region: 'center',
    				xtype: 'bhgridmaster' //中間的檔案
    			}, {
    				region: 'west',
    				xtype: 'bhactionpanel'// 視窗跳出方向
    			}
			]
		});

		me.callParent(arguments);
	}
});