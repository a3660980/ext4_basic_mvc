Ext.define('Console.view.Feed.TabPanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.feedtabpanel',
// 小框框
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
		        xtype: 'feedviewer'
		    },
		     {
		        region: 'west',
		        width: 225,
		        xtype: 'feedlist'
		    }]
		});

		me.callParent(arguments);
	}
});