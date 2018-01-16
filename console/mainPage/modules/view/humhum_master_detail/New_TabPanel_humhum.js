Ext.define('Console.view.humhum_master_detail.New_TabPanel_humhum', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.New_TabPanel_humhum',

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
    				xtype: 'ActionPanel_humhum'
    			}, {
					region: 'east',
					xtype: 'detail_actionpanel'
				}
			]
		});

		me.callParent(arguments);
	}

});