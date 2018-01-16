Ext.define('Console.view.betty_detail.ActionPanel_betty2', {
	extend: 'Console.override.ActionPanel',
	alias: 'widget.btactionpanel',
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
        			xtype: 'btformadd'
        		}, {
        			xtype: 'btformedit'
        		},{
        			xtype: 'btformadd2'
        		}, {
        			xtype: 'btformedit2'
        		}
			]
		});




		me.callParent(arguments);
	}
});