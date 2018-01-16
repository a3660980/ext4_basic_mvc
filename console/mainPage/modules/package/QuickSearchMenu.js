/**
 *
 * StartExpireDateField
 *
 */
Ext.define('Console.package.QuickSearchMenu', {
    extend: 'Ext.menu.DatePicker',
    alias: 'widget.quicksearchmenu',

    initComponent: function() {
        var me = this;

        if (typeof me.store == 'undefined') return false;
        if (typeof me.name == 'undefined') return false;
        if (typeof me.store == 'string') {
            me.store = Ext.getStore(me.store);
        }

        Ext.apply(me, {
            listeners: {
                select: me.selectDate
            }
        });

        me.callParent(arguments);
    },

    selectDate: function(field, value, eOpts) {
        var me = this;
        var store = me.store;
        var name = me.name;
        var value = Ext.Date.format(value, 'Y-m-d');

        store.clearFilter(true);
        store.filter(name, value);
    }
});