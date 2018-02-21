Ext.define('Console.view.Feed.List', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.feedlist',

    requires: ['Ext.toolbar.Toolbar'],

    title: 'Feeds',
    collapsible: true,
    animCollapse: true,
    margins: '5 0 5 5',
    layout: 'fit',
   
    initComponent: function() {
        var store = Ext.create('Ext.data.Store', {
            // 宣告定義下拉式選單方法
            fields: ['name'],
            data : [
                {"name":"測試1", 'content':'test' , 'title': 'test11123'},
                {"name":"測試2", 'content':'test2', 'title': 'test2415154'},
            ]
        })
        Ext.apply(this, {
            items: [{
                xtype: 'dataview',
                trackOver: true,
                store: store,
                // cls: 'feed-list',
                itemSelector: '.feed-list-item',
                overItemCls: 'feed-list-item-hover',
                tpl: '<tpl for="."><div class="feed-list-item">{name}</div></tpl>',
                listeners: {
                    selectionchange: this.onSelectionChange,
                    scope: this
                }
            }],

            dockedItems: [{
                xtype: 'toolbar',
                items: [{
                    iconCls: 'feed-add',
                    text: 'Add Feed',
                    action: 'add'
                }, {
                    iconCls: 'feed-remove',
                    text: 'Remove Feed',
                    disabled: true,
                    action: 'remove'
                }]
            }]
        });

        this.callParent(arguments);
    },

    onSelectionChange: function(selmodel, selection) {
        var selected = selection[0],
            button = this.down('button[action=remove]');
        if (selected) {
            button.enable();
        }
        else {
            button.disable();
        }
    }
});
