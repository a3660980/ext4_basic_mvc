Ext.define('Console.view.Johnny.ActionPanel_johnny', {
	extend: 'Console.override.ActionPanel',
	
	alias: 'widget.johnnyActionPanel',

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
        			xtype: 'johnnyFormAdd'
        		}, {
        			xtype: 'johnnyFormEdit'
        		}, {
        			xtype: 'johnnyDetailAdd'
        		}, {
        			xtype: 'johnnyDetailEdit'
        		}
			]
		});

		me.callParent(arguments);
	}
});