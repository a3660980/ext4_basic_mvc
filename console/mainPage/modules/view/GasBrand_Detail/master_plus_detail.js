Ext.define('Console.view.GasBrand_Detail.master_plus_detail', {
	extend: 'Console.override.PanelMasterDetail',
	alias: 'widget.gb_master_plus_detail',

	requires: ['Ext.layout.container.Border'],

	layout: 'border',

	initComponent: function()
	{
		Ext.applyIf(this,
		{
			items: [
			{
				region: 'north',
				flex: 2,
			    split: true,
				// 表格分裂
				xtype: 'gbgridmaster'
			}, {
				region: 'center',
				flex: 1,
				xtype: 'gbdetail'
			}

			]
		}
		);

		this.callParent(arguments);
	}
});