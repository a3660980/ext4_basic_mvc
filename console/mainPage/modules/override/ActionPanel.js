Ext.define('Console.override.ActionPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.overactionpanel',

    listeners: {
        afterrender: function(obj, eOpts) {
            obj.splitter.hide();
            obj.doLayout();
        },
        collapse: function(obj, eOpts) {
            obj.splitter.hide();
            obj.doLayout();
        },
        expand: function(obj, eOpts) {
            obj.splitter.show();
            obj.doLayout();
        },
        resize: function(obj, width, height, oldWidth, oldHeight, eOpts) {

            var components = obj.items.items;

            Ext.each(components, function(item) {
                item.setHeight(height - obj.getHeader().getHeight());
                item.doLayout();
            });

            obj.doComponentLayout();
            obj.doLayout();
        }
    }
});