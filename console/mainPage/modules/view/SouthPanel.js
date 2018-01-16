Ext.define('Console.view.SouthPanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.southpanel',

	requires: ['Ext.ux.statusbar.StatusBar'],

	activeItem: 0,
	margins: '5 5 5 5',

    config: {
        copyRight: 'Copyright ©2013 Streams System Co.,Ltd. All Rights Reserved.',
        version: 'v1.0',
        contactUs: 'Contact Us'
    },

	initComponent: function() {
        var me = this;
		Ext.apply(me, {
			items: [
                {
    				xtype: 'statusbar',
    				defaultText: me.getCopyRight(),
    				items: [
        				{
        					xtype: 'tbtext',
        					text: me.getVersion()
        				}, '-', {
        					xtype: 'button',
        					text: me.getContactUs(),
        					action: 'send_mail'
        				}
    				]
    			}
			]
		});

		me.callParent(arguments);
	}
});