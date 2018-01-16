Ext.define('Console.view.UserManagement.FormAdd', {
    extend: 'Console.override.Form',
    alias: 'widget.umformadd',

    requires: ['Ext.layout.container.Anchor'],

    layout: 'anchor',

    config: {
        comboboxStore: 'CpsUserOrganization'
    },

    initComponent: function() {
        var me = this;

        Ext.apply(me, {
            width: 450,
            bodyPadding: 5,
            autoScroll: true,
            defaults: {
                anchor: '100%'
            },
            defaultType: 'textfield',
            fieldDefaults: {
                msgTarget: 'under',
                autoFitErrors: false
            },
            items: [
                {
                    vtype: 'word',
                    name: 'user_name',
                    fieldLabel: MSG['user_name'],
                    // minLength: 5,
                    maxLength: 50,
                    allowBlank: false
                }, {
                    xtype: 'fieldcontainer',
                    fieldLabel: MSG['tw_name'],
                    layout: 'hbox',
                    defaultType: 'textfield',
                    defaults: {
                        flex: 1
                    },
                    allowBlank: false,
                    items: [
                        {
                            name: 'user_lastname_tw',
                            emptyText: MSG['tw_last_name'],
                            maxLength: 50,
                            allowBlank: false
                        }, {
                            name: 'user_firstname_tw',
                            emptyText: MSG['tw_first_name'],
                            maxLength: 50,
                            allowBlank: false
                        }
                    ]
                }, {
                    xtype: 'fieldcontainer',
                    fieldLabel: MSG['en_name'],
                    layout: 'hbox',
                    defaultType: 'textfield',
                    defaults: {
                        flex: 1
                    },
                    items: [
                        {
                            name: 'user_firstname_en',
                            emptyText: MSG['en_first_name'],
                            maxLength: 50
                        }, {
                            name: 'user_lastname_en',
                            emptyText: MSG['en_last_name'],
                            maxLength: 50
                        }
                    ]
                }, {
                    name: 'organization_id',
                    fieldLabel: '統一編號',
                    maxLength: 36
                }, {
                    name: 'user_role',
                    fieldLabel: MSG['role'],
                    maxLength: 20
                }, {
                    name: 'user_phone_number_1',
                    fieldLabel: MSG['phone'],
                    maxLength: 20
                }, {
                    vtype: 'cellphone',
                    name: 'user_mobile_number_1',
                    fieldLabel: MSG['mobile_number'],
                    maxLength: 20,
                    allowBlank: false
                }, {
                    name: 'user_email_1',
                    fieldLabel: MSG['email'],
                    maxLength: 100,
                    vtype: 'email',
                    allowBlank: false
                }
            ],
            bbar: [
                {
                    text: MSG['confirm'],
                    action: 'form_confirm'
                }, {
                    text: MSG['cancle'],
                    action: 'form_cancel'
                }
            ]
        });

        me.callParent(arguments);
    }
});