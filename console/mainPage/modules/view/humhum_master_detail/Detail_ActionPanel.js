Ext.define('Console.view.humhum_master_detail.Detail_ActionPanel', {
	extend: 'Console.override.ActionPanel',
	alias: 'widget.detail_actionpanel',

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
    				xtype: 'detail_formadd'
    			}, {
    				xtype: 'detail_formedit'
    			}
			]
		});

		me.callParent(arguments);
	}
});