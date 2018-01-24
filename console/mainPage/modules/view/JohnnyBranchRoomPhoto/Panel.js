Ext.define('Console.view.JohnnyBranchRoomPhoto.Panel', {
	extend: 'Console.override.PanelMasterDetail',
	alias: 'widget.johnnyBranchRoomPhotoPanel',

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
				xtype: 'johnnyBranchRoomPhotoGridMaster'
			}, {
				region: 'center',
				flex: 1,
				xtype: 'johnnyBranchRoomPhotoDetailPanel'
			}

			]
		}
		);

		this.callParent(arguments);
	}
});