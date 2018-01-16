Ext.define('Console.view.ServiceCategory.ActionPanel', {
	extend: 'Console.override.ActionPanel',
	alias: 'widget.scyactionpanel',

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
    				xtype: 'scyformadddetail'
    			}, {
    				xtype: 'scyformeditdetail'
    			}
			]
		});

		me.callParent(arguments);
	}
});