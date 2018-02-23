Ext.define('Console.view.Feed.Grid', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.feedgrid',

    // cls: 'feed-grid',
    

    // requires: ['Ext.ux.PreviewPlugin'],
    
    border: false,
    autoScroll: true,
    closable: true,
    config: {
        store: 'Feed.Feed'
    },
    initComponent: function() {
        
        Ext.apply(this, {
            tpl: new Ext.XTemplate(
                '<div class="post-data">',
                    '<h3 class="post-title">{title}</h3>',
                '</div>',
                '<div class="post-body">{content}</div>', {
            }),
            // store: gridStore,

            // // viewConfig: {
            // //     plugins: [{
            // //         pluginId: 'preview',
            // //         ptype: 'preview',
            // //         bodyField: 'description',
            // //         previewExpanded: true
            // //     }]
            // // },

            // columns: [{
            //     text: 'Title',
            //     dataIndex: 'title',
            //     flex: 1,
            //     renderer: this.formatTitle
            // }, {
            //     text: 'content',
            //     dataIndex: 'content',
            //     flex:1,
            //     width: 200
            // }],
            // dockedItems:[{
            //     xtype: 'toolbar',
            //     dock: 'top',
            //     items: [{
            //         iconCls: 'open-all',
            //         text: 'Open All',
            //         action: 'openall'
            //     }]
            // }]
        });

        this.callParent(arguments);
    },

    /**
     * Title renderer
     * @private
     */
    formatTitle: function(value, p, record) {
        return Ext.String.format('<div class="topic"><b>{0}</b></div>', value);
    },

    /**
     * Date renderer
     * @private
     */
    formatDate: function(date) {
        if (!date) {
            return '';
        }

        var now = new Date(),
            d = Ext.Date.clearTime(now, true),
            notime = Ext.Date.clearTime(date, true).getTime();

        if (notime === d.getTime()) {
            return 'Today ' + Ext.Date.format(date, 'g:i a');
        }

        d = Ext.Date.add(d, 'd', -6);
        if (d.getTime() <= notime) {
            return Ext.Date.format(date, 'D g:i a');
        }
        return Ext.Date.format(date, 'Y/m/d g:i a');
    }
});
