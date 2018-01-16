Ext.define('Console.view.AccountProfile.TabPanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.aptabpanel',

	requires: ['Ext.layout.container.HBox'],

	layout: {
		type: 'hbox',
		pack: 'center'
	},

	initComponent: function() {
        var me = this;
		Ext.applyIf(me, {
			autoScroll: true,
			header: false,
			closable: true,
			items: [
    			{
    				xtype: 'apformprofile'
    			}
			]
		});

		me.callParent(arguments);
	}
});