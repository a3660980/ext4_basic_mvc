Ext.define('Console.view.zoe2.TabPanel_zoe2', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.zoetabpanel2',

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
    				xtype: 'zoegridmaster2'
    			}, {
    				region: 'west', // 視窗跳出方向
    				xtype: 'zoeactionpanel2'
    			}
			]
		});

		me.callParent(arguments);
	}
});