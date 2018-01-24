Ext.define('Console.view.JohnnyBranchRoomPhoto.ActionPanel', {
	extend: 'Console.override.ActionPanel',
	
	alias: 'widget.johnnyBranchRoomPhotoActionPanel',

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
        			xtype: 'johnnyBranchRoomPhotoDetailFormAdd'
        		}, {
        			xtype: 'johnnyBranchRoomPhotoDetailFormEdit'
        		}
			]
		});

		me.callParent(arguments);
	}
});