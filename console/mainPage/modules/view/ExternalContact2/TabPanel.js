Ext.define('Console.view.ExternalContact2.TabPanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.ectabpanel2',
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
    				xtype: 'Ant_detail'
    			},{
    				region: 'west',
    				xtype: 'ecactionpanel2'
    			}
			]
		});

		me.callParent(arguments);
	}
});