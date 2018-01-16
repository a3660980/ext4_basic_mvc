Ext.define('Console.view.AccountProfile.FormProfile', {
    extend: 'Console.override.Form',
    alias: 'widget.apformprofile',
    bodyPadding: 10,
    margins: '20px 0 0 0',
    width: 750,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 90,
                labelStyle: 'font-weight:bold;'
            },
            items: [
                {
                    xtype: 'fieldset',
                    title: MSG['account_info'],
                    layout: 'anchor',
                    defaults: {
                        anchor: '100%',
                    },
                    defaultType: 'displayfield',
                    items: [
                        {
                            name: 'corp_id',
                            fieldLabel: MSG['corp_id'],
                            flex: 1
                        }, {
                            name: 'corp_name',
                            fieldLabel: MSG['corp_name'],
                            flex: 1
                        }, {
                            name: 'copr_code',
                            fieldLabel: MSG['copr_code'],
                            flex: 1
                        }, {
                            xtype: 'radiogroup',
                            fieldLabel: MSG['corp_status'],
                            cls: 'x-check-group-alt',
                            items:[
                                /*{
                                    boxLabel: MSG['status_not_available'],
                                    name: 'corp_status',
                                    inputValue: 0
                                },*/ {
                                    boxLabel: MSG['status_enable'],
                                    name: 'corp_status',
                                    inputValue: 1
                                }/*, {
                                    boxLabel: MSG['status_lock'],
                                    name: 'corp_status',
                                    inputValue: 2
                                }, {
                                    boxLabel: MSG['status_disable'],
                                    name: 'corp_status',
                                    inputValue: 3
                                }*/
                            ]
                        }, {
                            name: 'created_date',
                            fieldLabel: MSG['created_date'],
                            flex: 1
                        }, {
                            name: 'updated_date',
                            fieldLabel: MSG['updated_date'],
                            flex: 1
                        }
                    ]
                }, {
                    xtype: 'fieldset',
                    title: MSG['cps_info'],
                    layout: 'anchor',
                    defaults: {
                        anchor: '100%'
                    },
                    defaultType: 'displayfield',
                    items: [
                        {
                            name: 'server_id',
                            fieldLabel: MSG['server_id']
                        }, {
                            name: 'server_ip',
                            fieldLabel: MSG['server_ip'],
                            flex: 1
                        }, {
                            name: 'server_port',
                            fieldLabel: MSG['server_port'],
                            flex: 1
                        }, {
                            name: 'server_domain',
                            fieldLabel: MSG['server_domain'],
                        }, {
                            name: 'server_mac1',
                            fieldLabel: MSG['server_mac1'],
                            flex: 1
                        }, {
                            name: 'server_mac2',
                            fieldLabel: MSG['server_mac2'],
                            flex: 1
                        }, {
                            name: 'server_max_session',
                            fieldLabel: MSG['server_max_session']
                        }, {
                            id: 'field-server-expire-date',
                            hidden: true,
                            hideLabel: true,
                            name: 'server_expire_date',
                            fieldLabel: MSG['server_expire_date']
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }
});