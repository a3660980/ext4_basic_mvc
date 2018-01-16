Ext.define('Console.view.betty_detail.masterbetty_plus_detail', {
	extend: 'Console.override.PanelMasterDetail',
	alias: 'widget.bt_master_plus_detail',

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
				xtype: 'btgridmaster'
			}, {
				region: 'center',
				flex: 1,
				xtype: 'btdetail'
			}

			]
		}
		);

		this.callParent(arguments);
	}
});