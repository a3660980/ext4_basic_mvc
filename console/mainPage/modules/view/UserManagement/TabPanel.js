Ext.define('Console.view.UserManagement.TabPanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.umtabpanel',

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
    				xtype: 'umgridmaster'
    			}, {
    				region: 'east',
    				xtype: 'umactionpanel'
    			}
			]
		});

		me.callParent(arguments);
	}
});