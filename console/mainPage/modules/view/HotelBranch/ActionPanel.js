Ext.define('Console.view.HotelBranch.ActionPanel', {
	extend: 'Console.override.ActionPanel',
	alias: 'widget.hotbraactionpanel',

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
        			xtype: 'hotbraformadd' 
        		}, {
        			xtype: 'hotbraformedit' 
        		}
			]
		});

		me.callParent(arguments);
	}
});