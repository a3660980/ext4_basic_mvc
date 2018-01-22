Ext.define('Console.view.Johnny_HomePage.ActionPanel', {
	extend: 'Console.override.ActionPanel',
	
	alias: 'widget.johnnyHomePageActionPanel',

	requires: ['Ext.layout.container.Fit'],

	layout: 'fit',

	title: 'Action',

	activeItem: 0,

	initComponent: function() {
        var me = this;

		Ext.apply(me, {
			collapseMode: 'mini', //面板的折疊
			collapsed: true,
			collapsible: false,
            defaults: {
                hidden: true
            },
			items: [
        		{
        			xtype: 'johnnyHomePageFormAdd'
        		}, {
        			xtype: 'johnnyHomePageFormEdit'
        		}
			]
		});

		me.callParent(arguments);
	}
});