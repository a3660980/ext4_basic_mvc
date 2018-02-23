Ext.define('Console.controller.Feeds', {
    extend: 'Ext.app.Controller',

    stores: ['Feed.Feed'],
    models: ['Feed.Feed'],
    views: [
        'Feed.TabPanel',
        'Feed.List',
        'Feed.Viewer',
        'Feed.Grid',
        'Feed.Preview',
        'Feed.Show',
        'Feed.Add'
    ],
    
    refs: [
        {ref: 'feedList', selector: 'feedlist'},
        {ref: 'feedData', selector: 'feedlist dataview'},
        {ref: 'feedShow', selector: 'feedshow'},
        {
            ref: 'feedViewer',
            selector: 'feedviewer'
        }, 
        {ref: 'feedForm', selector: 'feedwindow form'},
        // {ref: 'feedCombo', selector: 'feedwindow combobox'},
        {ref: 'articleGrid', selector: 'feedgrid'},
        {
            ref: 'articleTab',
            xtype: 'feedgrid',
            closable: true,
            forceCreate: true,
            selector: 'feedgrid'
        },
        {
            ref: 'feedWindow', 
            selector: 'feedwindow', 
            autoCreate: true,
            xtype: 'feedwindow'
        }
    ],

    config: {
        addRequestUrl: './modules/source/controller/Feed/addFeed.php'
    },
    
    // requires: [
    //     'FV.lib.FeedValidator',
    //     'FV.store.Articles',
    //     'FV.store.Feeds'
    // ],

    // At this point things haven't rendered yet since init gets called on controllers before the launch function
    // is executed on the Application
    init: function() {

        this.control({
            'feedlist dataview': {
                selectionchange: this.loadFeed
            },
            'feedlist button[action=add]': {
                click: this.addFeed
            },
            'feedlist button[action=remove]': {
                click: this.removeFeed
            },
            'feedwindow button[action=create]': {
                click: this.createFeed
            },
            'feedshow > tableview': {
                itemdblclick: this.loadArticle,
                refresh: this.selectArticle
            },
        });
    },
    
    onLaunch: function() {
        // var dataview = this.getFeedData(),
        //     store = this.getFeedData().getStore();
            
        // dataview.bindStore(store);
        // dataview.getSelectionModel().select(store.getAt(0));
    },

    
    
    /**
     * Loads the given feed into the viewer
     * @param {FV.model.feed} feed The feed to load
     */
    loadFeed: function(selModel, selected) {
        var feed = selected[0];
        if (feed) {
            this.loadArticle(null, feed).then((tab) => {
                // let gridStore = this.getArticleGrid().getStore();
                // gridStore.clearFilter(true);
                // gridStore.filter([
                //     {property: 'id', value: feed.get('id') }
                // ]);   
                // gridStore.reload();     
                // console.log(gridStore)  
            });
             
        }
    },
    
    /**
     * Shows the add feed dialog window
     */
    addFeed: function() {
        this.getFeedWindow().show();
    },
    
    /**
     * Removes the given feed from the Feeds store
     * @param {FV.model.Feed} feed The feed to remove
     */
    removeFeed: function() {

        let record = this.getFeedData().getSelectionModel().getSelection()[0];
        let store =  this.getFeedData().getStore();
        let msg =  '您確定要刪除？';
        Ext.MessageBox.show({
            title: MSG['msg_box_info'],
            msg: msg,
            width: 300,
            buttons: Ext.MessageBox.YESNO,
            fn: function(btn) {
                if (btn == 'yes') {
                    store.remove(record);

                    store.sync({
                        success: function() {
                            Ext.MessageBox.show({
                                title: MSG['msg_box_info'],
                                msg: MSG['delete_success'],
                                width: 300,
                                buttons: Ext.MessageBox.OK,
                                fn: function(btn) {
                                    if (btn == 'ok') {
                                        store.reload();
                                    }
                                },
                                icon: Ext.MessageBox.INFO
                            });
                        },

                        failure: function(batch, options) {
                            if (batch.proxy.getReader().jsonData.msg == 'deleteFails') {
                                Ext.MessageBox.show({
                                    title: MSG['msg_box_info'],
                                    msg: MSG['delete_data_fail'],
                                    width: 300,
                                    buttons: Ext.MessageBox.OK,
                                    icon: Ext.MessageBox.ERROR
                                });
                            } else {
                                Ext.MessageBox.show({
                                    title: MSG['msg_box_info'],
                                    msg: MSG['delete_fail'],
                                    width: 300,
                                    buttons: Ext.MessageBox.OK,
                                    icon: Ext.MessageBox.ERROR
                                });
                            }
                            
                            store.reload();
                        }
                    });
                }
            }
        });
    },
    
    /**
     * @private
     * Creates a new feed in the store based on a given url. First validates that the feed is well formed
     * using FV.lib.FeedValidator.
     * @param {String} name The name of the Feed to create
     * @param {String} url The url of the Feed to create
     */
    createFeed: function() {
        var win   = this.getFeedWindow(),
            form  = this.getFeedForm();
        let store = this.getFeedData().getStore();
        let grid 
            
        form.setLoading({
            msg: 'Validating feed...'
        });
        
        form.submit({
            url: this.getAddRequestUrl(),
            method: 'POST',
            submitEmptyText: false,
            success: function() {
                form.setLoading(false);
                win.close();
                Ext.MessageBox.show({
                    title: MSG['msg_box_info'],
                    msg: MSG['add_success'],
                    width: 300,
                    buttons: Ext.MessageBox.OK,
                    fn: function(btn) {
                        if (btn == 'ok') {
                            store.reload();
                        }
                    },
                    icon: Ext.MessageBox.INFO
                });
            },

            failure: function(obj, action) {
                var error_msg = null;

                store.reload();

                switch (action.failureType) {
                    case Ext.form.action.Action.CLIENT_INVALID:
                        error_msg = MSG['form_invalid'];
                        break;
                    case Ext.form.action.Action.CONNECT_FAILURE:
                        error_msg = MSG['server_connect_fail'];
                        break;
                    case Ext.form.action.Action.SERVER_INVALID:
                        error_msg = action.result.msg;
                        break;
                    }

                Ext.MessageBox.show({
                    title: MSG['msg_box_error'],
                    msg: error_msg,
                    width: 300,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        });
    },
     selectArticle: function(view) {
        var first = this.getArticleGrid().getStore().getAt(0);
        if (first) {
            view.getSelectionModel().select(first);
        }
    },


    loadArticle: async function(view, article) {
        var viewer = this.getFeedViewer(),
            title = article.get('title'),
            articleId = article.id;
            
        tab = viewer.down('[articleId=' + articleId + ']');
        if (!tab) {
            tab = this.getArticleTab();
        } else {
            viewer.setActiveTab(tab);  
            return tab;
        }

        tab.setTitle(title);
        tab.article = article;
        tab.articleId = articleId;
        tab.update(article.data);

        viewer.add(tab);
        viewer.setActiveTab(tab);            
        
        return tab;
    }


});