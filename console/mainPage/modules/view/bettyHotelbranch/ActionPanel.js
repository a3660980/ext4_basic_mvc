Ext.define('Console.view.bettyHotelbranch.ActionPanel', {
	extend: 'Console.override.ActionPanel',
	alias: 'widget.bhbactionpanel',
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
        			xtype: 'bhbformadd'
        		}, {
        			xtype: 'bhbformedit'
        		}
			]
		});

		me.callParent(arguments);
	}
});