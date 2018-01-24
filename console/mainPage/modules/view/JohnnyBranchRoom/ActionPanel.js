Ext.define('Console.view.JohnnyBranchRoom.ActionPanel', {
	extend: 'Console.override.ActionPanel',
	
	alias: 'widget.johnnyBranchRoomActionPanel',

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
        			xtype: 'johnnyBranchRoomFormAdd'
        		}, {
        			xtype: 'johnnyBranchRoomFormEdit'
        		}
			]
		});

		me.callParent(arguments);
	}
});