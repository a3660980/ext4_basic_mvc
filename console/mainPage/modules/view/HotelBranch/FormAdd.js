Ext.define('Console.view.HotelBranch.FormAdd', {
    extend: 'Console.override.Form',
    alias: 'widget.hotbraformadd',

    requires: ['Ext.layout.container.Anchor'], 

    layout: 'anchor',

  
    initComponent: function() {
        var me = this;

        Ext.apply(me, {
            width: 450,
            bodyPadding: 5,
            autoScroll: false, 
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
                    maxLength: 10,
                    allowBlank: false
                }, {
                    name: 'p_cost',
                    fieldLabel: MSG['p_cost'],
                    maxLength: 20,
                    allowBlank: false
                }, {
                    name: 'p_amount',
                    fieldLabel: MSG['p_amount'],
                    maxLength: 10,
                    allowBlank: true
                }, {
                    name: 'p_time',
                    fieldLabel: MSG['p_time'],
                    maxLength: 10,
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