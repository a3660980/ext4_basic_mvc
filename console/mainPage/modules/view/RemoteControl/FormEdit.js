Ext.define('Console.view.RemoteControl.FormEdit', {
    extend: 'Console.override.Form',
    alias: 'widget.rcformedit',

    requires: ['Ext.layout.container.Anchor'],

    layout: 'anchor',

    initComponent: function() {
        var me = this;

        Ext.apply(me, {
            width: 500,
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
                    fieldLabel: MSG['user_name']
                }, {
                    xtype: 'fieldcontainer',
                    fieldLabel: MSG['tw_name'],
                    layout: 'hbox',
                    defaultType: 'displayfield',
                    items: [
                        {
                            name: 'user_lastname_tw'
                        }, {
                            name: 'user_firstname_tw'
                        }
                    ]
                }, {
                    xtype: 'fieldcontainer',
                    fieldLabel: MSG['en_name'],
                    layout: 'hbox',
                    defaultType: 'displayfield',
                    items: [
                        {
                            name: 'user_firstname_en',
                            margin: '0 5px 0 0'
                        }, {
                            name: 'user_lastname_en'
                        }
                    ]
                }, {
                    xtype: 'displayfield',
                    name: 'organization_name',
                    fieldLabel: MSG['organization_name']
                }, {
                    xtype: 'radiogroup',
                    fieldLabel: MSG['user_status'],
                    cls: 'x-check-group-alt',
                    items:[
                        /*{
                            boxLabel: MSG['not_available'],
                            name: 'user_status',
                            inputValue: 0
                        }, */{
                            boxLabel: MSG['enable'],
                            name: 'user_status',
                            inputValue: 1
                        }, {
                            boxLabel: MSG['lock'],
                            name: 'user_status',
                            inputValue: 2
                        }, {
                            boxLabel: MSG['disabled'],
                            name: 'user_status',
                            inputValue: 3
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