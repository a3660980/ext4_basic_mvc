Ext.define('Console.view.UserBlockade.TabPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ubtabpanel',

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
                    xtype: 'ubgridmaster'
                }
            ]
        });

        me.callParent(arguments);
    }
});