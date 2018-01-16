Ext.define('Console.view.humhum.ActionPanel_humhum', {
	extend: 'Console.override.ActionPanel',
	alias: 'widget.ActionPanel_humhum',

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
    				xtype: 'FormAdd_humhum'
    			}, {
    				xtype: 'FormEdit_humhum'
    			}
			]
		});

		me.callParent(arguments);
	}
});