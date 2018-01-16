Ext.define('Console.controller.UserBlockade', {
    extend: 'Ext.app.Controller',

    stores: [
        'UserBlockade'
    ],
    models: [
        'CpsUserAccount'
    ],
    views: [
        'UserBlockade.TabPanel',
        'UserBlockade.GridMaster'
    ],

    refs: [{
            ref: 'grid',
            selector: 'ubgridmaster'
        }
    ],

    config: {
        editRequestUrl: './modules/source/controller/UserManagement/editUserBlockade.php'
    },

    init: function() {
        var me = this;

        me.control({
            'ubgridmaster button[action=setting]': {
                click: me.editData
            },
            'ubgridmaster button[action=unsetting]': {
                click: me.unLock
            }
        });
    },

    checkSession: function() {
        var me = this;
        var isSessionExist = me.getController('Viewport').checkUserSessionExist();

        if (! isSessionExist) {
            return;
        }
    },

    editData: function(btn) {
        var me = this;
        me.checkSession();

        var confirm = function(opt) {
            var grid = me.getGrid();
            var store = grid.getStore();
            var record = grid.getSelectionModel().getSelection();

            if (opt == 'yes') {
                var arr = [];
                Ext.each(record, function(obj) {
                    arr.push(obj.get('user_name'));
                });
                Ext.Ajax.request({
                    params: {
                        data: arr.join(','),
                        status: 2
                    },
                    url: me.getEditRequestUrl(),
                    method: 'POST',
                    success: function() {
                        store.reload();
                    }
                });
            }
        }
        Ext.MessageBox.confirm(MSG['tips'], MSG['confirm_block_user'], confirm, this);
    },

    unLock: function(btn) {
        var me = this;
        me.checkSession();

        var confirm = function(opt) {
            var grid = me.getGrid();
            var store = grid.getStore();
            var record = grid.getSelectionModel().getSelection();

            if (opt == 'yes') {
                var arr = [];
                Ext.each(record, function(obj) {
                    arr.push(obj.get('user_name'));
                });
                Ext.Ajax.request({
                    params: {
                        data: arr.join(','),
                        status: 1
                    },
                    url: me.getEditRequestUrl(),
                    method: 'POST',
                    success: function() {
                        store.reload();
                    }
                });
            }
        }
        Ext.MessageBox.confirm(MSG['tips'], MSG['confirm_unblock_user'], confirm, this);
    }
});