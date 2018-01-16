Ext.define('Console.view.CenterPanel', {
	extend: 'Ext.tab.Panel',
	alias: 'widget.centerpanel',

	requires: ['Ext.layout.container.Fit'],

	activeItem: 0,
	margins: '5 5 5 5',

	layout: 'fit',

	initComponent: function() {
        var me = this;
		Ext.apply(me, {
            defaults: {
                listeners: {
                    show: function(obj, eOpts) {
                        var grid = obj.down('overgrid');

                        if (grid != null) {
                            grid.getStore().reload();
                        }
                    }
                }
            },
			items: [
    			{
    				itemId: 'tab-device-information',
    				title: MSG['device_information'],
    				xtype: 'ditabpanel'
    			}
			],
            listeners: {
                resize: function(obj, width, height, oldWidth, oldHeight, eOpts) {
                    var now_tab = obj.getActiveTab();
                    if (now_tab) {
                        now_tab.doComponentLayout();
                        now_tab.doLayout();
                    }
                },
                single: true,
                delay: 5
            }
		});


		me.callParent(arguments);
	}
});