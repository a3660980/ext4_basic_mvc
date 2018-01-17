Ext.define('Console.view.JohnnyDetail.DetailTabPanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.johnnyDetailTabPanel',
	requires: ['Ext.layout.container.Border'],//api框架

	layout: 'border',

	initComponent: function() {
        var me = this;//這行一定要寫

		Ext.apply(me, {
			header: false,
			closable: true,
			items: [
    			{
    				region: 'center',
    				xtype: 'johnnyDetailGridMaster' //中間的檔案
    			}, {
    				region: 'west',
    				xtype: 'johnnyActionPanel'// 視窗跳出方向
    			}
    			
			]
		});

		me.callParent(arguments);
	}
});