Ext.define('Console.view.dina2.PanelMasterDetail_dina', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.dinpanelmasterdetail',

	requires: ['Ext.layout.container.Border'],

	layout: 'border',

	initComponent: function()
	{
		Ext.applyIf(this,
		{
			items: [
			{
				region: 'center',
				flex: 1,
				split: true,
				xtype: 'dinmasterdetail'
			}, {
				region: 'west',
				flex: 1,
				xtype: 'dinactionpanel'
			}, {
    			region: 'west',
    			xtype: 'dinactiondetail'
    			}
			]
		}
		);

		this.callParent(arguments);
	}
});