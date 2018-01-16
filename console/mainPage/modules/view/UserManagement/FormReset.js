Ext.define('Console.view.UserManagement.FormReset', {
    extend: 'Console.override.Form',
    alias: 'widget.umformreset',

    requires: ['Ext.layout.container.Anchor'],

    layout: 'anchor',

    config: {
        comboboxStore: 'CpsUserOrganization'
    },

    initComponent: function() {

        Ext.apply(Ext.form.field.VTypes, {
            // 兩段式密碼輸入驗證
            password: function( val, field ) {
                if (field.initialPassField) {
                    var pwd = field.up('fieldset').down('#' + field.initialPassField);
                    return (val == pwd.getValue());
                }
                return true;
            },

            passwordText: MSG['confirm_password_wrong']
        });

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
                    xtype: 'displayfield',
                    name: 'user_name',
                    fieldLabel: '帳　　號',
                    allowBlank: true
                }, {
                    xtype: 'fieldcontainer',
                    fieldLabel: MSG['tw_name'],
                    layout: 'hbox',
                    defaultType: 'textfield',
                    allowBlank: true,
                    items: [
                        {
                            xtype: 'displayfield',
                            name: 'user_firstname_tw',
                            emptyText: MSG['tw_first_name'],
                            maxLength: 50,
                            allowBlank: true,
                            flex: 1
                        }
                    ]
                }, {
                    xtype: 'displayfield',
                    name: 'user_role',
                    fieldLabel: MSG['role'],
                    maxLength: 20
                }, {
                    xtype: 'fieldcontainer',
                    fieldLabel: MSG['organization_name'],
                    layout: 'hbox',
                    defaultType: 'combobox',
                    allowBlank: true,
                    items: [
                        {
                            name: 'organization_id',
                            emptyText: MSG['plz_select_one_unit'],
                            displayField: 'organization_name',
                            valueField: 'organization_id',
                            store: me.getComboboxStore(),
                            action: 'master_combobox',
                            queryMode: 'local',
                            flex: 1,
                            readOnly:true,
                            forceSelection: true,
                            allowBlank: false,
                            lastQuery: ''
                        }
                    ]
                }, {
                    xtype: 'fieldset',
                    title: MSG['change_password'],
                    layout: 'anchor',
                    defaults: {
                        anchor: '100%',
                        inputType: 'password'
                    },
                    defaultType: 'textfield',
                    items: [
                        {
                            id: 'um-form-new-password',
                            name: 'new_password',
                            fieldLabel: '新 密 碼',
                            action: 'valid_new_password',
                            allowBlank:false,
                            minLnegth: 5
                        }, {
                            name: 'new_password_again',
                            fieldLabel: '確認密碼',
                            vtype: 'password',
                            initialPassField: 'um-form-new-password',
                            allowBlank:false,
                            minLnegth: 5
                        }
                    ]
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