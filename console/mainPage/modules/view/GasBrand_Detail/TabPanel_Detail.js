Ext.define('Console.view.GasBrand_Detail.TabPanel_Detail', {
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
    				xtype: 'gb_master_plus_detail'
    			},{
    				region: 'west',
    				xtype: 'gbactionpanel'
    			}
			]
		});

		me.callParent(arguments);
	}
});