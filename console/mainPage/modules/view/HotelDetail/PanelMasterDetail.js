Ext.define('Console.view.HotelDetail.PanelMasterDetail', {
	extend: 'Console.override.PanelMasterDetail',
	alias: 'widget.hotdetpanelmasterdetail',

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
				xtype: 'hotdetgridmaster'
			}, {
				region: 'center',
				flex: 1,
				xtype: 'hotdetgriddetail'
			}
			]
		}
		);

		this.callParent(arguments);
	}
});