Ext.define('Console.view.ExternalContact2.Ant_detail', {
	extend: 'Console.override.PanelMasterDetail',
	alias: 'widget.Ant_detail',

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
				// 表格分裂
				xtype: 'ecgridmaster2'
			}, {
				region: 'center',
				flex: 1,
				xtype: 'detail2'
			}

			]
		}
		);

		this.callParent(arguments);
	}
});