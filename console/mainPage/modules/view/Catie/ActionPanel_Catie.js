Ext.define('Console.view.Catie.ActionPanel_Catie', {
	extend: 'Console.override.ActionPanel',
	alias: 'widget.ctactionpanel',

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
        			xtype: 'ctformadd'
        		}, {
        			xtype: 'ctformedit'
        		}
			]
		});

		me.callParent(arguments);
	}
});