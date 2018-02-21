Ext.define('Console.view.bettyRoompicture.master_plus_detail', {
	extend: 'Console.override.PanelMasterDetail',
	alias: 'widget.brp_master_plus_detail',

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
				xtype: 'brpgridmaster'
			}, {
				region: 'center',
				flex: 1,
				xtype: 'brpgriddetail'
			}

			]
		}
		);

		this.callParent(arguments);
	}
});