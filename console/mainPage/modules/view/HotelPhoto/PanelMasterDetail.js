Ext.define('Console.view.HotelPhoto.PanelMasterDetail', {
	extend: 'Console.override.PanelMasterDetail',
	alias: 'widget.hotphopanelmasterdetail',

	requires: ['Ext.layout.container.Border'],

	layout: 'border',

	initComponent: function()
	{
		Ext.applyIf(this,
		{
			items: [
			{
				region: 'north',
				flex: 1,
				split: true,
				xtype: 'hotphogridmaster'
			}, {
				region: 'center',
				flex: 1,
				xtype: 'hotphogriddetail'
			}
			]
		}
		);

		this.callParent(arguments);
	}
});