Ext.define('Console.view.bettyRoompicture.TabPanelDetail', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.brptabpanedetail',
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
    				xtype: 'brp_master_plus_detail'
    			},{
    				region: 'west',
    				xtype: 'brpactionpaneldetail'
    			}
			]
		});

		me.callParent(arguments);
	}
});