Ext.define('Console.view.GasBrand_Detail.ActionPanel', {
	extend: 'Console.override.ActionPanel',
	alias: 'widget.gbactionpanel',
// 框 跑出動作
	requires: ['Ext.layout.container.Fit'],

	layout: 'fit',

	title: 'Action',

	activeItem: 0,

	initComponent: function() {
        var me = this;

		Ext.apply(me, {
			collapseMode:'mini',
			collapsed: true,
			// 是否折疊
			collapsible: false,
            defaults: {
                hidden: true
            },
			items: [
        		{
        			xtype: 'gbformadd'
        		}, {
        			xtype: 'gbformedit'
        		},{
        			xtype: 'gbformadd2'
        		}, {
        			xtype: 'gbformedit2'
        		}
			]
		});

		me.callParent(arguments);
	}
});