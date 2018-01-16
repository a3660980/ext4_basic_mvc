Ext.define('Console.view.ChangePassword.TabPanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.cptabpanel',

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
    				xtype: 'cpformchangepassword'
    			}
			]
		});

		me.callParent(arguments);
	}
});