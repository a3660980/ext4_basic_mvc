Ext.define('Console.view.hotelhomepage_betty.TabPanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.hltabpanel',
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
    				xtype: 'hlgridmaster' 
    			}, {
    				region: 'west',
    				xtype: 'hlactionpanel'// 視窗跳出方向
    			}
			]
		});

		me.callParent(arguments);
	}
});