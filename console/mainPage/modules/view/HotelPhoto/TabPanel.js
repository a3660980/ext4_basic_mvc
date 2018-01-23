Ext.define('Console.view.HotelPhoto.TabPanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.hotphotabpanel',

	requires: ['Ext.layout.container.Border'],

	layout: 'border',

	initComponent: function()
	{
		Ext.apply(this,
		{
			items: [
			{
				region: 'center',
				xtype: 'hotphopanelmasterdetail'
			}, {
				region: 'east',
				xtype: 'hotphoactionpanel'
			}
			]
		}
		);

		this.callParent(arguments);
	}
});