Ext.define('Console.view.SystemConfiguration.PanelMasterDetail', {
	extend: 'Console.override.PanelMasterDetail',
	alias: 'widget.scpanelmasterdetail',

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
				xtype: 'scgridmaster'
			}, {
				region: 'center',
				flex: 1,
				xtype: 'scgriddetail'
			}
			]
		}
		);

		this.callParent(arguments);
	}
});