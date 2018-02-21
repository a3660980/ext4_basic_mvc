Ext.define('Console.view.Feed.Viewer', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.feedviewer',
    
    requires: ['Console.view.Feed.Show'],
    
    activeItem: 0,
    margins: '5 5 5 5',
    
    // cls: 'preview',
    
    initComponent: function() {
        this.items = [{
            closable: true,
            xtype: 'feedshow',
            title: 'Sencha Blog'
        }];
        
        this.callParent(arguments);
    }
});