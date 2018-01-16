Ext.define('Console.view.dina2.MasterDetail_dina', {
	extend: 'Console.override.PanelMasterDetail',
	alias: 'widget.dinmasterdetail',

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
				xtype: 'dingridmaster2'
			}, {
				region: 'center',
				flex: 1,
				xtype: 'dingriddetail'
			}
			]
		}
		);

		this.callParent(arguments);
	}
});