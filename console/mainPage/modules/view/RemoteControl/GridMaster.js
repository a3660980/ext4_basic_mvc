Ext.define('Console.view.RemoteControl.GridMaster', {
    extend: 'Console.override.Grid',
    alias: 'widget.rcgridmaster',

    requires: [
        'Ext.ux.ProgressBarPager',
        'Ext.ux.form.SearchField'
    ],

    plugins: [
        {
            ptype: 'rowexpander',
            rowBodyTpl: new Ext.XTemplate(
                '<div class="rowexpander-row">',
                '<p><b>' + MSG['created_date'] + ':</b> {registration_date}</p>',
                '<p><b>' + MSG['last_login_time'] + ':</b> {last_connected_date}</p>',
                '</div>'
            )
        }
    ],

    selType: 'checkboxmodel',

    config: {
        store: 'RemoteControl'
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
                    header: MSG['organization_name'],
                    dataIndex: 'organization_name',
                    flex: 2
                }, {
                    header: MSG['title'],
                    dataIndex: 'user_role',
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
                                : 'NULL';
                    },
                    flex: 2
                }
            ],
            tbar: [{
                    text: MSG['user_remove'],
                    action: 'setting',
                    allowMulti: true,
                    disabled: true
                },{
                    text: MSG['user_resume'],
                    action: 'resume',
                    allowMulti: true,
                    disabled: true
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