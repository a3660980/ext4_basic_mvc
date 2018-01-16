Ext.define('Console.view.betty_detail.TabPanel_Detail_betty', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.bttabpanel',
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
    				xtype: 'bt_master_plus_detail'
    			},{
    				region: 'west',
    				xtype: 'btactionpanel'
    			}
			]
		});

		me.callParent(arguments);
	}
});