Ext.define('Console.view.humhum_master_detail.New_TabPanel_humhum', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.New_TabPanel_hank',

	requires: ['Ext.layout.container.Border'],

	layout: 'border',

	initComponent: function() {
		var me = this;

		Ext.apply(me, {
			header: false,
			closable: true,
			items: [
    			{
    				region: 'center',
    				xtype: 'master_plus_detail'
    			}, {
					region: 'east',
					xtype: 'detail_actionpanel'
				}
			]
		});

		me.callParent(arguments);
	}

});