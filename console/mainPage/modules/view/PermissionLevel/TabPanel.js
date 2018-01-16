Ext.define('Console.view.PermissionLevel.TabPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pltabpanel',

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
                    xtype: 'plgridmaster'
                }, {
                    region: 'east',
                    xtype: 'plactionpanel'
                }
            ]
        });

        me.callParent(arguments);
    }
});