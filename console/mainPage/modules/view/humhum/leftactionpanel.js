Ext.define('Console.view.humhum.leftactionpanel', {
	extend: 'Console.override.ActionPanel',
	alias: 'widget.leftactionpanel',

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
    				xtype: 'leftshow'
    			}
			]
		});

		me.callParent(arguments);
	}
});