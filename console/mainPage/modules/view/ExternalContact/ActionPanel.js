Ext.define('Console.view.ExternalContact.ActionPanel', {
	extend: 'Console.override.ActionPanel',
	alias: 'widget.ecactionpanel',
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
			collapsible: false,
            defaults: {
                hidden: true
            },
			items: [
        		{
        			xtype: 'ecformadd'
        		}, {
        			xtype: 'ecformedit'
        		}
			]
		});

		me.callParent(arguments);
	}
});