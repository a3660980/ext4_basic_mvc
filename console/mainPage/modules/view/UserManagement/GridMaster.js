Ext.define('Console.view.UserManagement.GridMaster', {
    extend: 'Console.override.Grid',
    alias: 'widget.umgridmaster',

    requires: [
        'Ext.ux.ProgressBarPager',
        'Ext.ux.form.SearchField'
    ],

    plugins: [
        {
            ptype: 'rowexpander',
            rowBodyTpl: new Ext.XTemplate(
                '<div class="rowexpander-row">',
                '</div>'
            )
        }
    ],

    selType: 'checkboxmodel',

    id: 'umgridmaster',

    config: {
        store: 'CpsUserAccount'
    },

    initComponent: function() {
        var me = this;

        Ext.apply(me, {
            store: me.getStore(),
            columns: [
                {
                    header: MSG['user_name'],
                    dataIndex: 'user_name',
                    flex: 2
                }, {
                    header: MSG['tw_name'],
                    flex: 2,
                    renderer: function(value, p, r) {
                        return r.data['user_lastname_tw'] + r.data['user_firstname_tw'];
                    }
                }, {
                    header: MSG['en_name'],
                    flex: 2,
                    renderer: function(value, p, r) {
                        return r.data['user_firstname_en'] + ' ' + r.data['user_lastname_en'];
                    }
                }, {
                    header: '統一編號',//have user_corp_id
                    dataIndex: 'user_organization_id',
                    flex: 2
                }, {
                    header: MSG['title'],
                    dataIndex: 'user_role',
                }, {
                    header: MSG['phone'],
                    dataIndex: 'user_phone_number_1',
                    flex: 3
                }, {
                    header: MSG['mobile_phone'],
                    dataIndex: 'user_mobile_number_1',
                    flex: 3
                }, {
                    header: MSG['email'],
                    dataIndex: 'user_email_1',
                    flex: 4
                }, {
                    header: MSG['user_status'],
                    renderer: function(value, p, r) {
                        var status = parseInt(r.data['user_status']);
                        return status == 0 ? 'NOT AVAILABLE'
                                : status == 1 ? 'ENABLE'
                                : status == 2 ? 'LOCK'
                                : status == 3 ? 'DISABLE'
                                : status == 4 ? 'FAIL'
                                : 'NULL';
                    },
                    flex: 2
                }
            ],
            tbar: [
                {
                    text: MSG['add_user'],
                    action: 'add_user'
                }, {
                    text: MSG['edit_user'],
                    action: 'edit_user',
                    allowMulti: false,
                    disabled: true
                }, {
                    text: MSG['delete_user'],
                    action: 'delete_user',
                    allowMulti: true,
                    disabled: true
                }, {
                    text: MSG['import_file'],
                    action: 'import_file'
                }, '->', {
                    xtype: 'searchfieldmvc',
                    store: me.getStore(),
                    fieldLabel: MSG['search'],
                    labelWidth: 50,
                    width: 200
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                store: me.getStore(),
                displayInfo: true,
                plugins: new Ext.ux.ProgressBarPager()
            }
        });

        me.callParent(arguments);
    }
});