Ext.define('Console.view.ExternalContact.TabPanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.ectabpanel',
// 小框框
	requires: ['Ext.layout.container.Border'],

	layout: 'border',

	initComponent: function() {
        var me = this;

		Ext.apply(me, {
			header: true,
			closable: true,
			items: [
    			{
    				region: 'center',
    				xtype: 'ecgridmaster'
    			}, {
    				region: 'west',
    				xtype: 'ecactionpanel'
    				// 視窗跳出方向
    			}
			]
		});

		me.callParent(arguments);
	}
});