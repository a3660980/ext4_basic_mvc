Ext.define('Console.view.RemoteControl.TabPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.rctabpanel',

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
                    xtype: 'rcgridmaster'
                }
            ]
        });

        me.callParent(arguments);
    }
});