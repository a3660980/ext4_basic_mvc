Ext.define('Console.view.Viewport', {
	extend: 'Ext.container.Viewport',
    alias: 'widget.mainviewport',

	requires: [
		'Console.view.NorthPanel',
		'Console.view.CenterPanel',
		'Console.view.SouthPanel',
		'Ext.layout.container.Border'
	],

	layout: 'border',
// region->在網頁中的位置
	items: [
    	{
    		region: 'north',
    		xtype: 'northpanel'
    	}, {
    		region: 'center',
    		xtype: 'centerpanel'
    	}, {
    		region: 'south',
    		xtype: 'southpanel'
    	}
	],
    listeners: {
        resize: function(obj, width, height, oldWidth, oldHeight, eOpts) {
            obj.doLayout();
            obj.doComponentLayout();
        }
    }
});