Ext.define('Console.view.JohnnyBranch.ActionPanel', {
	extend: 'Console.override.ActionPanel',
	
	alias: 'widget.johnnyBranchActionPanel',

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
        			xtype: 'johnnyBranchFormAdd'
        		}, {
        			xtype: 'johnnyBranchFormEdit'
        		}
			]
		});

		me.callParent(arguments);
	}
});