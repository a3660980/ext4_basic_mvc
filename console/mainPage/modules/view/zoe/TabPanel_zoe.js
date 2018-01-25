Ext.define('Console.view.zoe.TabPanel_zoe', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.zoetabpanel',

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
    				xtype: 'zoeGridMaster'
    			}, {
    				region: 'west',
    				xtype: 'zoeactionpanel'// 視窗跳出方向
    			}
			]
		});

		me.callParent(arguments);
	}
});