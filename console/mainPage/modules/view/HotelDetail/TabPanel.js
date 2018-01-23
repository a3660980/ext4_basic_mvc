Ext.define('Console.view.HotelDetail.TabPanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.hotdettabpanel',

	requires: ['Ext.layout.container.Border'],

	layout: 'border',

	initComponent: function()
	{
		Ext.apply(this,
		{
			items: [
			{
				region: 'center',
				xtype: 'hotdetpanelmasterdetail'
			}, {
				region: 'east',
				xtype: 'hotdetactionpanel'
			}
			]
		}
		);

		this.callParent(arguments);
	}
});