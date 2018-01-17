Ext.define('Console.view.JohnnyDetail.DetailGridMaster', {
	extend: 'Console.override.PanelMasterDetail',
	alias: 'widget.johnnyDetailGridMaster',

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
				xtype: 'johnnyGridMaster'
			}, {
				region: 'center',
				flex: 1,
				xtype: 'johnnyDetailPanel'
			}

			]
		}
		);

		this.callParent(arguments);
	}
});