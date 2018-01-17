Ext.define('Console.view.Johnny.TabPanel_johnny', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.johnnyTabPanel',
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
    				xtype: 'johnnyGridMaster' //中間的檔案
    			}, {
    				region: 'west',
    				xtype: 'johnnyActionPanel'// 視窗跳出方向
    			}
			]
		});

		me.callParent(arguments);
	}
});