Ext.define('Console.view.bettyBranchpicture.master_plus_detail', {
	extend: 'Console.override.PanelMasterDetail',
	alias: 'widget.bbpmasterplusdetail',

	requires: ['Ext.layout.container.Border'],

	layout: 'border',//排版

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
				xtype: 'bbpgridmaster'
			}, {
				region: 'center',
				flex: 1,
				xtype: 'bbpgriddetail'
			}

			]
		}
		);

		this.callParent(arguments);
	}
});