Ext.define('Console.view.dina2.FormEditDetail_dina', {
    extend: 'Console.override.Form',
    alias: 'widget.dinformeditdetail',

    requires: ['Ext.layout.container.Anchor'],

    layout: 'anchor',
    
     initComponent: function() {

        var me = this;

        Ext.apply(me, {
            width: 450,
            bodyPadding: 10,
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
                    name: 'p_name',
                    fieldLabel: MSG['p_name'],
                    maxLength: 50,
                    hidden: true
                },{
                    name: 'e_name',
                    fieldLabel: MSG['e_name'],
                    maxLength: 10,
                    allowBlank: false
                },  {
                    name: 'personality',
                    fieldLabel: MSG['personality'],
                    maxLength: 100,
                    allowBlank: false
                }, {
                    name: 'luckycolor',
                    fieldLabel: MSG['luckycolor'],
                    maxLength: 20,
                    allowBlank: false
                }, {
                    name: 'the_ruler',
                    fieldLabel: MSG['the_ruler'],
                    maxLength: 10,
                    allowBlank: true
                }
            ],
            bbar: [
                {
                    text: MSG['confirm'],
                    action: 'form_edit_confirm'
                }, {
                    text: MSG['cancle'],
                    action: 'form_edit_cancel'
                }
            ]
        });

        me.callParent(arguments);
    }
});