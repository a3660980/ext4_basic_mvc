Ext.define('Console.controller.RemoteControl', {
    extend: 'Ext.app.Controller',

    stores: [
        'RemoteControl'
    ],
    models: [
        'CpsUserAccount'
    ],
    views: [
        'RemoteControl.TabPanel',
        'RemoteControl.GridMaster'
    ],

    refs: [{
            ref: 'grid',
            selector: 'rcgridmaster'
        }
    ],

    config: {
        editRequestUrl: './modules/source/controller/UserManagement/editRemoteControl.php'
    },

    init: function() {
        var me = this;

        me.control({
            'rcgridmaster button[action=setting]': {
                click: me.editData
            },
            'rcgridmaster button[action=resume]': {
                click: me.resume
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
                        status: 3
                    },
                    url: me.getEditRequestUrl(),
                    method: 'POST',
                    success: function() {
                        store.reload();
                    }
                });
            }
        }
        Ext.MessageBox.confirm(MSG['tips'], MSG['confirm_remote_remove'], confirm, this);
    },

    resume: function(btn) {
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
                        status: 0
                    },
                    url: me.getEditRequestUrl(),
                    method: 'POST',
                    success: function() {
                        store.reload();
                    }
                });
            }
        }
        Ext.MessageBox.confirm(MSG['tips'], MSG['confirm_remote_resume'], confirm, this);
    }
});