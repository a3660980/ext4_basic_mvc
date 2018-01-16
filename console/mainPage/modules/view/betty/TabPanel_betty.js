Ext.define('Console.view.betty.TabPanel_betty', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.bettytabpanel',
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
    				xtype: 'bettygridmaster' //中間的檔案
    			}, {
    				region: 'west',
    				xtype: 'bettyactionpanel'// 視窗跳出方向
    			}
			]
		});

		me.callParent(arguments);
	}
});