Ext.define('Console.view.JohnnyBranchPhoto.TabPanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.johnnyBranchPhotoTabPanel',
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
    				xtype: 'johnnyBranchPhotoPanel' //中間的檔案
    			}, {
    				region: 'west',
    				xtype: 'johnnyBranchPhotoActionPanel'// 視窗跳出方向
    			}
    			
			]
		});

		me.callParent(arguments);
	}
});