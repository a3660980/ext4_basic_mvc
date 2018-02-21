Ext.define('Console.view.zoe_detail.DetailTabPanel_zoe', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.zoedetailtabpanel',

	requires: ['Ext.layout.container.Border'],

	layout: 'border',

	initComponent: function() {
        var me = this;
		Ext.apply(me, {
			//header: false,
			//closable: true,
			items: [
    			{
    				region: 'center',
    				split: true,
    				xtype: 'zoedetailgridmaster'
    			}, {
    				region: 'west', // 視窗跳出方向
    				xtype: 'zoedetailactionpanel'
    			}
			]

		});

		me.callParent(arguments);
	}
});