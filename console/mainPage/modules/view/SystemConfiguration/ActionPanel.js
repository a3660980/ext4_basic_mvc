Ext.define('Console.view.SystemConfiguration.ActionPanel', {
	extend: 'Console.override.ActionPanel',
	alias: 'widget.scactionpanel',

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
    				id: 'form-sc-edit-description',
    				xtype: 'scformeditdescription'
    			}, {
    				id: 'form-sc-edit-platform',
    				xtype: 'scformeditplatform'
    			}
			]
		});

		me.callParent(arguments);
	}
});