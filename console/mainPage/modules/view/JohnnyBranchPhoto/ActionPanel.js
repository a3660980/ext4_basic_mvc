Ext.define('Console.view.JohnnyBranchPhoto.ActionPanel', {
	extend: 'Console.override.ActionPanel',
	
	alias: 'widget.johnnyBranchPhotoActionPanel',

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
        			xtype: 'johnnyBranchPhotoDetailFormAdd'
        		}, {
        			xtype: 'johnnyBranchPhotoDetailFormEdit'
        		}
			]
		});

		me.callParent(arguments);
	}
});