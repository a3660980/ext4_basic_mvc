Ext.define('Console.view.betty_test.ActionPanel', {
	extend: 'Console.override.ActionPanel',
	alias: 'widget.bettyactionpanel2',
// 框 跑出動作
	requires: ['Ext.layout.container.Fit'],

	layout: 'fit',

	title: 'Action',

	activeItem: 0,

	initComponent: function() {
        var me = this;

		Ext.apply(me, {
			collapseMode:'mini',//面板的折疊
			collapsed: true,
			// 是否折疊
			collapsible: false,//是否隱藏，否
            defaults: {
                hidden: true
            },
			items: [
        		{
        			xtype: 'bettyformadd1'
        		}, {
        			xtype: 'bettyformedit1'
        		},{
        			xtype: 'bettyformadd2'
        		}, {
        			xtype: 'bettyformedit2'
        		}
			]
		});

		me.callParent(arguments);
	}
});