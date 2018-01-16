Ext.define('Console.view.ServiceCategory.TabPanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.scytabpanel',

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
    				xtype: 'scypanelmasterdetail'
    			}, {
    				region: 'east',
    				xtype: 'scyactionpanel'
    			}
			]
		});

		me.callParent(arguments);
	}
});