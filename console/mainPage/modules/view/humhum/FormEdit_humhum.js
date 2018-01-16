Ext.define('Console.view.humhum.FormEdit_humhum', {
    extend: 'Console.override.Form',
    alias: 'widget.FormEdit_humhum',

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
                    name: 'student_id',
                    fieldLabel: MSG['student_id_d'],
                    xtype: 'displayfield'

                }, {
                    name: 'name',
                    fieldLabel: MSG['student_name_d'],
                    maxLength: 10,
                    allowBlank: false
                }, {
                    name: 'gender',
                    fieldLabel: MSG['student_gender_d'],
                    maxLength: 1,
                    allowBlank: false
                }, {
                    name: 'email',
                    fieldLabel: MSG['student_email_d'],
                    maxLength: 100,
                    vtype: 'email',
                    allowBlank: false
                }, {
                    vtype: 'cellphone',
                    name: 'phone',
                    fieldLabel: MSG['student_phone_d'],
                    maxLength: 10,
                    allowBlank: false
                },{
                    name: 'address',
                    fieldLabel: MSG['student_address_d'],
                    allowBlank: false,
                    maxLength: 100,
                },{
                    xtype:'datefield',
                    name: 'birthday',
                    fieldLabel: MSG['student_birthday_d'],
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