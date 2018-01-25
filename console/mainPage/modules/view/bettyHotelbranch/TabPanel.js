Ext.define('Console.view.bettyHotelbranch.TabPanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.bhbtabpanel',
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
    				xtype: 'bhbgridmaster' //中間的檔案
    			}, {
    				region: 'west',
    				xtype: 'bhbactionpanel'// 視窗跳出方向
    			}
			]
		});

		me.callParent(arguments);
	}
});