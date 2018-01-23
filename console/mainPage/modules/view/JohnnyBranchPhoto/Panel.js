Ext.define('Console.view.JohnnyBranchPhoto.Panel', {
	extend: 'Console.override.PanelMasterDetail',
	alias: 'widget.johnnyBranchPhotoPanel',

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
				xtype: 'johnnyBranchPhotoGridMaster'
			}, {
				region: 'center',
				flex: 1,
				xtype: 'johnnyBranchPhotoDetailPanel'
			}

			]
		}
		);

		this.callParent(arguments);
	}
});