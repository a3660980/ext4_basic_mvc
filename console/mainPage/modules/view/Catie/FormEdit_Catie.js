Ext.define('Console.view.Catie.FormEdit_Catie', {
    extend: 'Console.override.Form',
    alias: 'widget.ctformedit',

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
                    xtype: 'displayfield',
                    name: 'student_id',
                    fieldLabel: MSG['id_ct'],
                }, {
                    name: 'name',
                    fieldLabel: MSG['name_ct'],
                    maxLength: 10,
                    allowBlank: false
                }, {
                    name: 'gender',
                    fieldLabel: MSG['gender_ct'],
                    maxLength: 1,
                    allowBlank: false
                }, {
                    name: 'email',
                    fieldLabel: MSG['email_ct'],
                    maxLength: 100,
                    vtype: 'email',
                    allowBlank: false
                }, {
                    vtype: 'cellphone',
                    name: 'phone',
                    fieldLabel: MSG['phone_ct'],
                    maxLength: 10,
                    allowBlank: false
                },{
                    name: 'address',
                    fieldLabel: MSG['address_ct'],
                    allowBlank: false,
                    maxLength: 100,
                },{
                    xtype:'datefield',
                    name: 'birthday',
                    fieldLabel: MSG['birthday_ct'],
                    allowBlank: false,
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