Ext.define('Console.view.AccessSetting.ActionPanel', {
	extend: 'Console.override.ActionPanel',
	alias: 'widget.asactionpanel',

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
    				xtype: 'asformaddaccessaccount'
    			}, {
    				xtype: 'asformeditaccessaccount'
    			}
			]
		});

		me.callParent(arguments);
	}
});