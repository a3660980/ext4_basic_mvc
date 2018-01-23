Ext.define('Console.view.HotelRoom.ActionPanel', {
	extend: 'Console.override.ActionPanel',
	alias: 'widget.hotrooactionpanel',

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
        			xtype: 'hotrooformadd' 
        		}, {
        			xtype: 'hotrooformedit' 
        		}
			]
		});

		me.callParent(arguments);
	}
});