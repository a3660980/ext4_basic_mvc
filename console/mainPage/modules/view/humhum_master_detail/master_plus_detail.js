Ext.define('Console.view.humhum_master_detail.master_plus_detail', {
	extend: 'Console.override.PanelMasterDetail',
	alias: 'widget.master_plus_detail',

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
				xtype: 'detailgridmaster'
			}, {
				region: 'center',
				flex: 1,
				xtype: 'detail'
			}

			]
		}
		);

		this.callParent(arguments);
	}
});