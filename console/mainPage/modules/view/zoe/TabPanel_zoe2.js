Ext.define('Console.view.zoe.TabPanel_zoe2',{
    extend:'Ext.panel.Panel',
    alias: 'widget.zoetabpanel2',
    requires: ['Ext.layout.container.Border'],//api框架

	layout: 'border',

	initComponent: function() {
        var me = this;//這行一定要寫

		Ext.apply(me, {
			header: true,
			closable: true,
			items: [
    			{
    				region: 'center',
    				xtype: 'zoegridmaster' //中間的檔案
    			}
    			
			]
		});

		me.callParent(arguments);
	}

});