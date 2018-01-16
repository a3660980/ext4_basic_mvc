Ext.define('Console.view.ServiceInfo.ActionPanel', {
	extend: 'Console.override.ActionPanel',
	alias: 'widget.siactionpanel',

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
    				xtype: 'siformadd'
    			}, {
    				xtype: 'siformedit'
    			}
			]
		});

		me.callParent(arguments);
	}
});