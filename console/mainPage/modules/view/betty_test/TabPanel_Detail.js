Ext.define('Console.view.betty_test.TabPanel_Detail', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.bettytabpanel2',
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
    				xtype: 'betty_master_plus_detail'
    			},{
    				region: 'west',
    				xtype: 'bettyactionpanel2'
    			}
			]
		});

		me.callParent(arguments);
	}
});