Ext.define('Console.view.Feed.Show', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.feedshow',

    requires: [
        'Console.view.Feed.Grid',
        'Console.view.Feed.Preview'
    ],
    border: false,
    autoScroll: true,
    closable: true,
    // layout: {
    //     type: 'vbox',
    //     align: 'stretch'
    // },

    initComponent: function() {
        Ext.apply(this, {
            items: [{
                xtype: 'feedgrid',
                flex: 1
            }]
        });

        this.callParent(arguments);
    }
});
