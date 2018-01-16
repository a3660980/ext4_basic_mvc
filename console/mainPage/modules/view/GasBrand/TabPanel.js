Ext.define('Console.view.GasBrand.TabPanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.gbtabpanel',
// 小框框
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
    				xtype: 'gbgridmaster'
    			},{
    				region: 'west',
    				xtype: 'gbactionpanel'
    			}
			]
		});

		me.callParent(arguments);
	}
});