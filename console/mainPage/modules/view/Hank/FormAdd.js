Ext.define('Console.view.Hank.FormAdd', {
    extend: 'Console.override.Form',
    alias: 'widget.hkformadd',

    requires: ['Ext.layout.container.Anchor'],

    layout: 'anchor',

    config: {
        comboboxStore: 'CpsUserOrganization'
    },

    initComponent: function() {
        var me = this;
        var states = Ext.create('Ext.data.Store', {
            fields: ['abbr', 'name'],
            data: [{
                "abbr": "男",
                "name": "男"
            }, {
                "abbr": "女",
                "name": "女"
            }, {
                "abbr": "其他",
                "name": "其他"
            }]
        });
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
            items: [{
                name: 'student_id',
                regex: /^[A-Z]{1}[1-2]{1}[0-9]{8}$/,
                fieldLabel: MSG['student_idx'],
                maxLength: 10,
                allowBlank: false
            }, {
                name: 'name',
                // fieldMask:/[A-Za-Z][0-9]/,
                fieldLabel: MSG['name_'],
                allowBlank: false
            }, {
                xtype: 'combo',
                name: 'gender',
                fieldLabel: MSG['gender_b'],
                queryMode: 'local',
                store: states,
                displayField: 'name',
                valueField: 'abbr',
                forceSelection: true,
                flex: 1
            }, {
                name: 'email',
                fieldLabel: MSG['email_b'],
                maxLength: 100,
                vtype: 'email',
                allowBlank: false
            }, {
                vtype: 'cellphone',
                name: 'phone',
                fieldLabel: MSG['mobile_number_b'],
                maxLength: 10,
                allowBlank: false
            }, {
                name: 'address',
                fieldLabel: MSG['address_b'],
                allowBlank: false,
                maxLength: 100,
            }, {
                xtype: 'datefield',
                name: 'birthday',
                fieldLabel: MSG['birthday_b'],
                allowBlank: false,
            }],
            bbar: [{
                text: MSG['confirm'],
                action: 'form_confirm'
            }, {
                text: MSG['cancle'],
                action: 'form_cancel'
            }]
        });

        me.callParent(arguments);
    }
});