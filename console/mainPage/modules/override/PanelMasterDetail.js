Ext.define('Console.override.PanelMasterDetail', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.overpanelmasterdetail',

    requires: ['Ext.layout.container.Border'],

    layout: 'border',

    listeners: {
        beforerender: function(obj, eOpts) {
            var masterGrid = obj.getComponent(0);
            var detailGrid = obj.getComponent(2);

            var store = masterGrid.getStore();

            store.on({
                load: function(store, eOpts) {
                    var detailStore = detailGrid.getStore();
                    detailStore.removeAll();
                }
            }, this, {
                single: true,
                delay: 100
            });
        }
    },

    initComponent: function() {
        var me = this;

        me.callParent(arguments);
    }
});