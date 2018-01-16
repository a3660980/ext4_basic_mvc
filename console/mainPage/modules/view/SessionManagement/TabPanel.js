Ext.define('Console.view.SessionManagement.TabPanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.smtabpanel',

	requires: ['Ext.layout.container.Border'],

	layout: 'border',

	initComponent: function() {
        var me = this;

		Ext.applyIf(me, {
			header: false,
			closable: true,
			items: [
    			{
    				region: 'center',
    				xtype: 'smgridmaster'
    			}
			]
		});

		me.callParent(arguments);
	}
});