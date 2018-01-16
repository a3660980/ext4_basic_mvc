Ext.define('Console.view.NorthPanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.northpanel',

	requires: ['Console.view.NorthToolbar'],

	activeItem: 0,
	margins: '5 5 5 5',

	initComponent: function() {
		var me = this;

		Ext.apply(me, {
			items: [{
				xtype: 'panel',
				height: 70,
				cls: 'north-panel-logo',
				html: '<div style="float:left; margin-left:24px;margin-top:13px;">' +
					'<img src="' + img_logo_bg_path + '">' +
					'</div>',
			}, {
				xtype: 'northtoolbar'
			}]
		});

		me.callParent(arguments);
	}
});