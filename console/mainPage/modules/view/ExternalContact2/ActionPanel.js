Ext.define('Console.view.ExternalContact2.ActionPanel', {
	extend: 'Console.override.ActionPanel',
	alias: 'widget.ecactionpanel2',
// 框 跑出動作
	requires: ['Ext.layout.container.Fit'],

	layout: 'fit',

	title: 'Action',

	activeItem: 0,

	initComponent: function() {
        var me = this;

		Ext.apply(me, {
			collapseMode: 'mini',
			collapsed: true,
			// 是否折疊
			collapsible: false,
            defaults: {
                hidden: true
            },
			items: [
        		{
        			xtype: 'ecformadd2'
        		}, {
        			xtype: 'ecformedit2'
        		}
			]
		});

		me.callParent(arguments);
	}
});