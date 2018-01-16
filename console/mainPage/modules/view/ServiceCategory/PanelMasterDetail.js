Ext.define('Console.view.ServiceCategory.PanelMasterDetail', {
	extend: 'Console.override.PanelMasterDetail',
	alias: 'widget.scypanelmasterdetail',

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
				xtype: 'scygridmaster'
			}, {
				region: 'center',
				flex: 1,
				xtype: 'scygriddetail'
			}
			]
		}
		);

		this.callParent(arguments);
	}
});