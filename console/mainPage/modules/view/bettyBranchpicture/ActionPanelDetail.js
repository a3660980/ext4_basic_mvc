Ext.define('Console.view.bettyBranchpicture.ActionPanelDetail', {
	extend: 'Console.override.ActionPanel',
	alias: 'widget.bbpactionpaneldetail',
// 框 跑出動作
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
        			xtype: 'bbpformadddetail'
        		}, {
        			xtype: 'bbpformeditdetail'
        		}
			]
		});

		me.callParent(arguments);
	}
});