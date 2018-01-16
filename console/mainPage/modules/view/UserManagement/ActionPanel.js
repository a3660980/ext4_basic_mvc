Ext.define('Console.view.UserManagement.ActionPanel', {
	extend: 'Console.override.ActionPanel',
	alias: 'widget.umactionpanel',

	requires: ['Ext.layout.container.Fit'],

	layout: 'fit',

	title: 'Action',

	activeItem: 0,

	initComponent: function() {
        var me = this;

		Ext.apply(me, {
			collapseMode: 'mini',
			collapsed: true,
			collapsible: false,
            defaults: {
                hidden: true
            },
			items: [
        		{
        			xtype: 'umformadd'
        		}, {
        			xtype: 'umformedit'
        		}
			]
		});

		me.callParent(arguments);
	}
});