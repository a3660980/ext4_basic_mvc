// Extjs 4.2.1.899 bugs fixed(有升級請記得將版本修改)
// 修正1: rowexpander沒有加入event監聽
Ext.override(Ext.grid.plugin.RowExpander, {
    init: function(grid)
    {
        this.callParent(arguments);
        grid.getView().addEvents('collapsebody', 'expandbody');
    }
}
);

// 修正2: searchfield無法指定store(mvc架構)
// 另外修正: filter藉由GET參數 serachValue去做搜尋&&回傳json參數
// 繼承類別, 使用時請將xtype由searchfield改為searchfieldmvc
Ext.define('Console.form.SearchFieldMvc',
{
    extend: 'Ext.form.field.Trigger',

    alias: 'widget.searchfieldmvc',

    trigger1Cls: Ext.baseCSSPrefix + 'form-clear-trigger',

    //baseCSSPrefix該基地前綴用於所有Ext組件。要配置這個屬性
    trigger2Cls: Ext.baseCSSPrefix + 'form-search-trigger',

    hasSearch: false,

    //查詢參數
    paramName: 'query',

    originUrl: null,
    firstSearch: true,
    tempPage: 1,

    initComponent: function()
    {
        var me = this;

        me.callParent(arguments);
        me.on('specialkey', function(f, e) {
            if (e.getKey() == e.ENTER) {
                me.onTrigger2Click();
            }
            //   7/20 humhum+  ->
            else if (e.getKey() == e.ESC) {
                me.onTrigger1Click();
            }
            //  7/20 <-
        });

        // 修正部份
        if ( typeof (me.store.isStore) == 'undefined') {
            me.store = Ext.data.StoreManager.get(me.store);
        }
    },

    destroy: function(obj, eOpts) {
        var me = this;
        var proxy = me.store.getProxy();

        if (me.originUrl != null) {
            proxy.api.read = me.originUrl;//此部分為delete.php or get.php的url
        }

        me.store.setProxy(proxy);
    },

    afterRender: function() {
        this.callParent();
        this.triggerCell.item(0).setDisplayed(false);
    },

    onTrigger1Click: function() {
        var me = this;
        var proxy = me.store.getProxy();
        proxy.api.read = me.originUrl;
        me.store.setProxy(proxy);
        // reset page
        me.store.currentPage = me.tempPage;
        me.store.lastOptions.start = 25 * (me.tempPage - 1);
        me.tempPage = 1;

        if (me.hasSearch) {
            me.setValue('');
            me.store.clearFilter(true);
            me.hasSearch = false;
            me.triggerCell.item(0).setDisplayed(false);
            me.firstSearch = true;
            me.store.reload();
            me.updateLayout();
        }
    },

    onTrigger2Click: function() {
        var me = this, value = me.getValue(); //輸入的Value
        var proxy = me.store.getProxy(),
            url = proxy.api.read;

        if (value.length > 0) {
            // Param name is ignored here since we use custom encoding in the proxy.
            // id is used by the Store to replace any previous filter
            me.tempPage = me.store.currentPage;
            // direct page 1
            me.store.currentPage = 1;
            me.store.lastOptions.page = 1; //lastOptions重新加載
            me.store.lastOptions.start = 0;
            // first search
            
            if (me.firstSearch) {
                me.firstSearch = false;
                var index = url.indexOf('?searchValue');
                if (index != -1) {
                    url = url.substring(0, index);
                }
                me.originUrl = url;
                proxy.api.read = url + "?searchValue=" + value;
                if(url.indexOf('?startValue') != -1){
                    proxy.api.read = url + "&searchValue=" + value;
                }
            } else {
                proxy.api.read = me.originUrl + "?searchValue=" + value;
                if(url.indexOf('?startValue') != -1){
                    proxy.api.read = me.originUrl + "&searchValue=" + value;
                }
            }
            // 將filter利用GET參數搜尋
            // set url
            me.store.setProxy(proxy);
            //setProxy配置對象或代理實例設置Store的代理
            me.store.reload();

            // === EXTJS原生code ===
            // me.store.filter({
            //     id: me.paramName,
            //     property: me.paramName,
            //     value: value
            // });
            me.hasSearch = true;
            me.triggerCell.item(0).setDisplayed(true);
            me.updateLayout();
        }
    }
});
/*
Tree combo
Use with 'Ext.data.TreeStore'

If store root note has 'checked' property tree combo becomes multiselect combo (tree store must have records with 'checked' property)

Has event 'itemclick' that can be used to capture click

Options:
selectChildren - if set true and if store isn't multiselect, clicking on an non-leaf node selects all it's children
canSelectFolders - if set true and store isn't multiselect clicking on a folder selects that folder also as a value

Use:

single leaf node selector:
selectChildren: false
canSelectFolders: false
- this will select only leaf nodes and will not allow selecting non-leaf nodes

single node selector (can select leaf and non-leaf nodes)
selectChildren: false
canSelectFolders: true
- this will select single value either leaf or non-leaf

children selector:
selectChildren: true
canSelectFolders: true
- clicking on a node will select it's children and node, clicking on a leaf node will select only that node

This config:
selectChildren: true
canSelectFolders: false
- is invalid, you cannot select children without node
*/
Ext.define('Ext.ux.TreeCombo',
{
    extend: 'Ext.form.field.Picker',
    alias: 'widget.treecombo',
    tree: false,
    constructor: function(config)
    {
        this.addEvents(
        {
            "itemclick" : true
        });
        if (typeof config.listeners != 'undefined') {
            this.listeners = config.listeners;
        }
        this.callParent(arguments);
    },
    listeners: {
        expand: function(obj, eOpts) {
            var me = this;
            var value = obj.getValue();

            obj.store.reload();
            me.setValue(value);
        }
    },
    records: [],
    recursiveRecords: [],
    selectChildren: true,
    canSelectFolders: true,
    multiselect: false,
    displayField: 'text',
    valueField: 'id',
    //此部分是修改treecombo的大小
    treeWidth: 300,
    matchFieldWidth: false,
    treeHeight: 300,
    masN: 0,
    displayField: 'text',
    valueField: 'id',
    displayAll: false,
    tmpRawValue: null,
    resetValue: function() {
        var me = this;
        me.tree.getRootNode().collapseChildren();

        me.setValue('');

        if(me.multiselect == true)
        {
            Ext.each(me.recursiveRecords, function(record)
            {
                record.set('checked', false);
            });
        }
    },
    recursivePush: function(node)
    {
        var    me = this;
        me.recursiveRecords.push(node);

        node.eachChild(function(nodesingle)
        {
            if(nodesingle.hasChildNodes() == true)
            {
                me.recursivePush(nodesingle);
            }
            else me.recursiveRecords.push(nodesingle);
        });
    },
    recursiveUnPush: function(node)
    {
        var    me = this;
        Ext.Array.remove(me.records, node);

        node.eachChild(function(nodesingle)
        {
            if(nodesingle.hasChildNodes() == true)
            {
                me.recursiveUnPush(nodesingle);
            }
            else Ext.Array.remove(me.records, nodesingle);
        });
    },
    afterLoadSetValue: false,
    setValue: function(valueInit)
    {
        if(typeof valueInit == 'undefined') return;

        var me = this,
            tree = this.tree,
            value = valueInit.split(',');

        inputEl = me.inputEl;

        if(tree.store.isLoading())
        {
            me.afterLoadSetValue = valueInit;
        }

        if(inputEl && me.emptyText && !Ext.isEmpty(value))
        {
            inputEl.removeCls(me.emptyCls);
        }

        if(tree == false) return false;

        var node = tree.getRootNode();
        if(node == null) return false;

        me.recursiveRecords = [];
        me.recursivePush(node);

        var valueFin = [];
        var idsFin = [];

        if(me.multiselect == true)
        {
            Ext.each(me.recursiveRecords, function(record)
            {
                record.set('checked', false);
            });
        }

        me.records = [];
        Ext.each(me.recursiveRecords, function(record)
        {
            var data = record.get(me.valueField);
            Ext.each(value, function(val)
            {
                if(data == val)
                {
                    valueFin.push(record.get(me.displayField));
                    idsFin.push(data);
                    if(me.multiselect == true) record.set('checked', true);
                    me.records.push(record);
                }
            });
        });

        // clear empty value
        var newValueFin = [];
        Ext.each(valueFin, function(value) {
            if (value != '' && value != null && typeof value != 'undefined') {
                newValueFin.push(value);
            }
        });
        valueFin = newValueFin;

        me.value = valueInit;
        me.setRawValue(valueFin.join(', '));

        me.checkChange();
        me.applyEmptyText();
        return me;
    },
    getValue: function()
    {
        return this.value;
    },
    getSubmitValue: function()
    {
        return this.value;
    },
    checkParentNodes: function(node)
    {
        if(node == null) return;

        var    me = this,
            checkedAll = true,
            ids = [];

        Ext.each(me.records, function(value)
        {
            ids.push(value.get(me.valueField));
        });

        node.eachChild(function(nodesingle)
        {
            if(!Ext.Array.contains(ids, nodesingle.get(me.valueField))) checkedAll = false;
        });

        if(checkedAll == true)
        {
            me.records.push(node);
            me.checkParentNodes(node.parentNode);
        }
        else
        {
            Ext.Array.remove(me.records, node);
            me.checkParentNodes(node.parentNode);
        }
    },
    initComponent: function()
    {
        var me = this;

        me.store = Ext.create(me.store);

        me.tree = Ext.create('Ext.tree.Panel',
        {
            alias: 'widget.assetstree',
            hidden: true,
            minHeight: 300,
            rootVisible: (typeof me.rootVisible != 'undefined') ? me.rootVisible : true,
            floating: true,
            useArrows: true,
            width: me.treeWidth,
            autoScroll: true,
            height: me.treeHeight,
            store: me.store,
            displayField: me.displayField,
            listeners:
            {
                load: function(store, records)
                {
                    if(me.afterLoadSetValue != false)
                    {
                        me.setValue(me.afterLoadSetValue);
                    }
                },
                itemclick: function(view, record, item, index, e, eOpts)
                {
                    var values = [];
                    var node = me.tree.getRootNode().findChild('id', record.get(me.valueField), true);
                    if(node == null)
                    {
                        if(me.tree.getRootNode().get(me.valueField) == record.get(me.valueField)) node = me.tree.getRootNode();
                        else return false;
                    }

                    if(me.multiselect == false) me.records = [];

                    if(me.canSelectFolders == false && record.get('leaf') == false) return false;
                    if(record.get('leaf') == true || me.selectChildren == false)
                    {
                        if(me.multiselect == false) me.records.push(record);
                        else
                        {
                            if(record.get('checked') == false) me.records.push(record);
                            else Ext.Array.remove(me.records, record);
                        }
                    }
                    else
                    {
                        me.recursiveRecords = [];

                        if(me.multiselect == false || record.get('checked') == false)
                        {
                            me.recursivePush(node);
                            Ext.each(me.recursiveRecords, function(value)
                            {
                                if(!Ext.Array.contains(me.records, value)) me.records.push(value);
                            });
                        }
                        else if(record.get('checked') == true)
                        {
                            me.recursiveUnPush(node);
                        }
                    }

                    if(me.canSelectFolders == true) me.checkParentNodes(node.parentNode);

                    Ext.each(me.records, function(record)
                    {
                        values.push(record.get(me.valueField));
                    });

                    me.setValue(values.join(','));

                    me.fireEvent('itemclick', me, record, item, index, e, eOpts, me.records, values);

                    if(me.multiselect == false) {
                        me.onTriggerClick();
                    }
                }
            }
        });

        if(me.tree.getRootNode().get('checked') != null) {
            me.multiselect = true;
        }

        this.createPicker = function()
        {
            var    me = this;
            return me.tree;
        };

        this.callParent(arguments);
    }
});
// 修正4: refresh時清除所有filter條件
// 繼承類別, 使用時請將xtype由pagingtoolbar改為pagingtoolbarmvc
Ext.define('Ext.toolbar.Paging', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.pagingtoolbarmvc',
    alternateClassName: 'Ext.PagingToolbar',
    requires: ['Ext.toolbar.TextItem', 'Ext.form.field.Number'],
    mixins: {
        bindable: 'Ext.util.Bindable'
    },
    /**
     * @cfg {Ext.data.Store} store (required)
     * The {@link Ext.data.Store} the paging toolbar should use as its data source.
     */

    /**
     * @cfg {Boolean} displayInfo
     * true to display the displayMsg
     */
    displayInfo: false,

    /**
     * @cfg {Boolean} prependButtons
     * true to insert any configured items _before_ the paging buttons.
     */
    prependButtons: false,

    //<locale>
    /**
     * @cfg {String} displayMsg
     * The paging status message to display. Note that this string is
     * formatted using the braced numbers {0}-{2} as tokens that are replaced by the values for start, end and total
     * respectively. These tokens should be preserved when overriding this string if showing those values is desired.
     */
    displayMsg: '顯示筆數 {0} - {1} 共 {2} 筆 (Refresh)',
    //</locale>

    //<locale>
    /**
     * @cfg {String} emptyMsg
     * The message to display when no records are found.
     */
    emptyMsg: '沒有資料可以顯示。',
    //</locale>

    //<locale>
    /**
     * @cfg {String} beforePageText
     * The text displayed before the input item.
     */
    beforePageText: '頁數',
    //</locale>

    //<locale>
    /**
     * @cfg {String} afterPageText
     * Customizable piece of the default paging text. Note that this string is formatted using
     * {0} as a token that is replaced by the number of total pages. This token should be preserved when overriding this
     * string if showing the total page count is desired.
     */
    afterPageText: '到 {0}',
    //</locale>

    //<locale>
    /**
     * @cfg {String} firstText
     * The quicktip text displayed for the first page button.
     * **Note**: quick tips must be initialized for the quicktip to show.
     */
    firstText: '第一頁',
    //</locale>

    //<locale>
    /**
     * @cfg {String} prevText
     * The quicktip text displayed for the previous page button.
     * **Note**: quick tips must be initialized for the quicktip to show.
     */
    prevText: '上一頁',
    //</locale>

    //<locale>
    /**
     * @cfg {String} nextText
     * The quicktip text displayed for the next page button.
     * **Note**: quick tips must be initialized for the quicktip to show.
     */
    nextText: '下一頁',
    //</locale>

    //<locale>
    /**
     * @cfg {String} lastText
     * The quicktip text displayed for the last page button.
     * **Note**: quick tips must be initialized for the quicktip to show.
     */
    lastText: '最後一頁',
    //</locale>

    //<locale>
    /**
     * @cfg {String} refreshText
     * The quicktip text displayed for the Refresh button.
     * **Note**: quick tips must be initialized for the quicktip to show.
     */
    refreshText: '重新整理',
    //</locale>

    /**
     * @cfg {Number} inputItemWidth
     * The width in pixels of the input field used to display and change the current page number.
     */
    inputItemWidth: 30,

    /**
     * 自定義 clearFilter
     * doRefresh時是否clearFilter
     */
    clearFilter: true,

    /**
     * Gets the standard paging items in the toolbar
     * @private
     */
    getPagingItems: function() {
        var me = this;

        return [{
            itemId: 'first',
            tooltip: me.firstText,
            overflowText: me.firstText,
            iconCls: Ext.baseCSSPrefix + 'tbar-page-first',
            disabled: true,
            handler: me.moveFirst,
            scope: me
        },{
            itemId: 'prev',
            tooltip: me.prevText,
            overflowText: me.prevText,
            iconCls: Ext.baseCSSPrefix + 'tbar-page-prev',
            disabled: true,
            handler: me.movePrevious,
            scope: me
        },
        '-',
        me.beforePageText,
        {
            xtype: 'numberfield',
            itemId: 'inputItem',
            name: 'inputItem',
            cls: Ext.baseCSSPrefix + 'tbar-page-number',
            allowDecimals: false,
            minValue: 1,
            hideTrigger: true,
            enableKeyEvents: true,
            keyNavEnabled: false,
            selectOnFocus: true,
            submitValue: false,
            // mark it as not a field so the form will not catch it when getting fields
            isFormField: false,
            width: me.inputItemWidth,
            margins: '-1 2 3 2',
            listeners: {
                scope: me,
                keydown: me.onPagingKeyDown,
                blur: me.onPagingBlur
            }
        },{
            xtype: 'tbtext',
            itemId: 'afterTextItem',
            text: Ext.String.format(me.afterPageText, 1)
        },
        '-',
        {
            itemId: 'next',
            tooltip: me.nextText,
            overflowText: me.nextText,
            iconCls: Ext.baseCSSPrefix + 'tbar-page-next',
            disabled: true,
            handler: me.moveNext,
            scope: me
        },{
            itemId: 'last',
            tooltip: me.lastText,
            overflowText: me.lastText,
            iconCls: Ext.baseCSSPrefix + 'tbar-page-last',
            disabled: true,
            handler: me.moveLast,
            scope: me
        },
        '-',
        {
            itemId: 'refresh',
            tooltip: me.refreshText,
            overflowText: me.refreshText,
            iconCls: Ext.baseCSSPrefix + 'tbar-loading',
            handler: me.doRefresh,
            scope: me
        }];
    },

    initComponent: function(){
        var me = this,
            pagingItems = me.getPagingItems(),
            userItems = me.items || me.buttons || [];

        if (me.prependButtons) {
            me.items = userItems.concat(pagingItems);
        } else {
            me.items = pagingItems.concat(userItems);
        }
        delete me.buttons;

        if (me.displayInfo) {
            me.items.push('->');
            me.items.push({xtype: 'tbtext', itemId: 'displayItem'});
        }

        me.callParent();

        me.addEvents(
            /**
             * @event change
             * Fires after the active page has been changed.
             * @param {Ext.toolbar.Paging} this
             * @param {Object} pageData An object that has these properties:
             *
             * - `total` : Number
             *
             *   The total number of records in the dataset as returned by the server
             *
             * - `currentPage` : Number
             *
             *   The current page number
             *
             * - `pageCount` : Number
             *
             *   The total number of pages (calculated from the total number of records in the dataset as returned by the
             *   server and the current {@link Ext.data.Store#pageSize pageSize})
             *
             * - `toRecord` : Number
             *
             *   The starting record index for the current page
             *
             * - `fromRecord` : Number
             *
             *   The ending record index for the current page
             */
            'change',

            /**
             * @event beforechange
             * Fires just before the active page is changed. Return false to prevent the active page from being changed.
             * @param {Ext.toolbar.Paging} this
             * @param {Number} page The page number that will be loaded on change
             */
            'beforechange'
        );
        me.on('beforerender', me.onLoad, me, {single: true});

        me.bindStore(me.store || 'ext-empty-store', true);
    },
    // @private
    updateInfo: function(){
        var me = this,
            displayItem = me.child('#displayItem'),
            store = me.store,
            pageData = me.getPageData(),
            count, msg;

        if (displayItem) {
            count = store.getCount();
            if (count === 0) {
                msg = me.emptyMsg;
            } else {
                msg = Ext.String.format(
                    me.displayMsg,
                    pageData.fromRecord,
                    pageData.toRecord,
                    pageData.total
                );
            }
            displayItem.setText(msg);
        }
    },

    // @private
    onLoad: function(){
        var me = this,
            pageData,
            currPage,
            pageCount,
            afterText,
            count,
            isEmpty,
            item;

        count = me.store.getCount();
        isEmpty = count === 0;
        if (!isEmpty) {
            pageData = me.getPageData();
            currPage = pageData.currentPage;
            pageCount = pageData.pageCount;
            afterText = Ext.String.format(me.afterPageText, isNaN(pageCount) ? 1: pageCount);
        } else {
            currPage = 0;
            pageCount = 0;
            afterText = Ext.String.format(me.afterPageText, 0);
        }

        Ext.suspendLayouts();
        item = me.child('#afterTextItem');
        if (item) {
            item.setText(afterText);
        }
        item = me.getInputItem();
        if (item) {
            item.setDisabled(isEmpty).setValue(currPage);
        }
        me.setChildDisabled('#first', currPage === 1 || isEmpty);
        me.setChildDisabled('#prev', currPage === 1 || isEmpty);
        me.setChildDisabled('#next', currPage === pageCount  || isEmpty);
        me.setChildDisabled('#last', currPage === pageCount  || isEmpty);
        me.setChildDisabled('#refresh', false);
        me.updateInfo();
        Ext.resumeLayouts(true);

        if (me.rendered) {
            me.fireEvent('change', me, pageData);
        }
    },

    setChildDisabled: function(selector, disabled){
        var item = this.child(selector);
        if (item) {
            item.setDisabled(disabled);
        }
    },

    // @private
    getPageData: function(){
        var store = this.store,
            totalCount = store.getTotalCount();

        return {
            total: totalCount,
            currentPage: store.currentPage,
            pageCount: Math.ceil(totalCount / store.pageSize),
            fromRecord: ((store.currentPage - 1) * store.pageSize) + 1,
            toRecord: Math.min(store.currentPage * store.pageSize, totalCount)

        };
    },

    // @private
    onLoadError: function(){
        if (!this.rendered) {
            return;
        }
        this.setChildDisabled('#refresh', false);
    },

    getInputItem: function(){
        return this.child('#inputItem');
    },

    // @private
    readPageFromInput: function(pageData){
        var inputItem = this.getInputItem(),
            pageNum = false,
            v;

        if (inputItem) {
            v = inputItem.getValue();
            pageNum = parseInt(v, 10);
            if (!v || isNaN(pageNum)) {
                inputItem.setValue(pageData.currentPage);
                return false;
            }
        }
        return pageNum;
    },

    onPagingFocus: function(){
        var inputItem = this.getInputItem();
        if (inputItem) {
            inputItem.select();
        }
    },

    // @private
    onPagingBlur: function(e){
        var inputItem = this.getInputItem(),
            curPage;

        if (inputItem) {
            curPage = this.getPageData().currentPage;
            inputItem.setValue(curPage);
        }
    },

    // @private
    onPagingKeyDown: function(field, e){
        var me = this,
            k = e.getKey(),
            pageData = me.getPageData(),
            increment = e.shiftKey ? 10: 1,
            pageNum;

        if (k == e.RETURN) {
            e.stopEvent();
            pageNum = me.readPageFromInput(pageData);
            if (pageNum !== false) {
                pageNum = Math.min(Math.max(1, pageNum), pageData.pageCount);
                if(me.fireEvent('beforechange', me, pageNum) !== false){
                    me.store.loadPage(pageNum);
                }
            }
        } else if (k == e.HOME || k == e.END) {
            e.stopEvent();
            pageNum = k == e.HOME ? 1: pageData.pageCount;
            field.setValue(pageNum);
        } else if (k == e.UP || k == e.PAGE_UP || k == e.DOWN || k == e.PAGE_DOWN) {
            e.stopEvent();
            pageNum = me.readPageFromInput(pageData);
            if (pageNum) {
                if (k == e.DOWN || k == e.PAGE_DOWN) {
                    increment *= -1;
                }
                pageNum += increment;
                if (pageNum >= 1 && pageNum <= pageData.pageCount) {
                    field.setValue(pageNum);
                }
            }
        }
    },

    // @private
    beforeLoad: function(){
        if (this.rendered) {
            this.setChildDisabled('#refresh', true);
        }
    },

    /**
     * Move to the first page, has the same effect as clicking the 'first' button.
     */
    moveFirst: function(){
        if (this.fireEvent('beforechange', this, 1) !== false){
            this.store.loadPage(1);
        }
    },

    /**
     * Move to the previous page, has the same effect as clicking the 'previous' button.
     */
    movePrevious: function(){
        var me = this,
            prev = me.store.currentPage - 1;

        if (prev > 0) {
            if (me.fireEvent('beforechange', me, prev) !== false) {
                me.store.previousPage();
            }
        }
    },

    /**
     * Move to the next page, has the same effect as clicking the 'next' button.
     */
    moveNext: function(){
        var me = this,
            total = me.getPageData().pageCount,
            next = me.store.currentPage + 1;

        if (next <= total) {
            if (me.fireEvent('beforechange', me, next) !== false) {
                me.store.nextPage();
            }
        }
    },

    /**
     * Move to the last page, has the same effect as clicking the 'last' button.
     */
    moveLast: function(){
        var me = this,
            last = me.getPageData().pageCount;

        if (me.fireEvent('beforechange', me, last) !== false) {
            me.store.loadPage(last);
        }
    },

    /**
     * Refresh the current page, has the same effect as clicking the 'refresh' button.
     */
    doRefresh: function(){
        var me = this,
            current = me.store.currentPage;

        if (me.fireEvent('beforechange', me, current) !== false) {
            // 修正部分 清除filter
            if ( this.clearFilter ) me.store.clearFilter(true);

            me.store.loadPage(current);
        }
    },

    getStoreListeners: function() {
        return {
            beforeload: this.beforeLoad,
            load: this.onLoad,
            exception: this.onLoadError
        };
    },

    /**
     * Unbinds the paging toolbar from the specified {@link Ext.data.Store} **(deprecated)**
     * @param {Ext.data.Store} store The data store to unbind
     */
    unbind: function(store){
        this.bindStore(null);
    },

    /**
     * Binds the paging toolbar to the specified {@link Ext.data.Store} **(deprecated)**
     * @param {Ext.data.Store} store The data store to bind
     */
    bind: function(store){
        this.bindStore(store);
    },

    // @private
    onDestroy: function(){
        this.unbind();
        this.callParent();
    }
});


// 修正點擊重整時會出現error
/**
 * Plugin for displaying a progressbar inside of a paging toolbar
 * instead of plain text.
 */
Ext.define('Ext.ux.ProgressBarPager', {

    requires: ['Ext.ProgressBar'],
    /**
     * @cfg {Number} width
     * <p>The default progress bar width.  Default is 225.</p>
    */
    width: 225,
    /**
     * @cfg {String} defaultText
    * <p>The text to display while the store is loading.  Default is 'Loading...'</p>
     */
    defaultText: 'Loading...',
    /**
     * @cfg {Object} defaultAnimCfg
     * <p>A {@link Ext.fx.Anim Ext.fx.Anim} configuration object.</p>
     */
    defaultAnimCfg: {
        duration: 1000,
        easing: 'bounceOut'
    },

    /**
     * Creates new ProgressBarPager.
     * @param {Object} config Configuration options
     */
    constructor: function(config) {
        if (config) {
            Ext.apply(this, config);
        }
    },
    //public
    init: function (parent) {
        var displayItem;
        if (parent.displayInfo) {
            this.parent = parent;

            displayItem = parent.child("#displayItem");
            if (displayItem) {
                parent.remove(displayItem, true);
            }

            this.progressBar = Ext.create('Ext.ProgressBar', {
                text: this.defaultText,
                width: this.width,
                animate: this.defaultAnimCfg,
                style: {
                    cursor: 'pointer'
                },
                listeners: {
                    el: {
                        scope: this,
                        click: this.handleProgressBarClick
                    }
                }
            });

            parent.displayItem = this.progressBar;

            parent.add(parent.displayItem);
            Ext.apply(parent, this.parentOverrides);
        }
    },
    // private
    // This method handles the click for the progress bar
    handleProgressBarClick: function(e){
        var store = this.parent.store;
        store.reload();
        // var parent = this.parent,
        //     displayItem = parent.displayItem,
        //     box = this.progressBar.getBox(),
        //     xy = e.getXY(),
        //     position = xy[0]- box.x,
        //     pages = Math.ceil(parent.store.getTotalCount() / parent.pageSize),
        //     newPage = Math.max(Math.ceil(position / (displayItem.width / pages)), 1);

        // parent.store.loadPage(newPage);
    },

    // private, overriddes
    parentOverrides: {
        // private
        // This method updates the information via the progress bar.
        updateInfo: function(){
            if(this.displayItem){
                var count = this.store.getCount(),
                    pageData = this.getPageData(),
                    message = count === 0 ?
                    this.emptyMsg:
                    Ext.String.format(
                        this.displayMsg,
                        pageData.fromRecord, pageData.toRecord, this.store.getTotalCount()
                    ),
                    percentage = pageData.pageCount > 0 ? (pageData.currentPage / pageData.pageCount) : 0;

                this.displayItem.updateProgress(percentage, message, this.animate || this.defaultAnimConfig);
            }
        }
    }
});
