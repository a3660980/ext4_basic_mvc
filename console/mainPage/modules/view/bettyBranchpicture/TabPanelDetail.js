Ext.define('Console.view.bettyBranchpicture.TabPanelDetail', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.bbptabpaneldetail',
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
    				xtype: 'bbpmasterplusdetail'
    			},{
    				region: 'west',
    				xtype: 'bbpactionpaneldetail'
    			}
			]
		});

		me.callParent(arguments);
	}
});