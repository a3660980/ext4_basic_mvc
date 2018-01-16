Ext.define('Console.view.humhum.leftshow', {
    extend: 'Console.override.Form',
    alias: 'widget.leftshow',

    requires: ['Ext.layout.container.Anchor'],

    layout: 'anchor',

    config: {
        comboboxStore: 'CpsUserOrganization'
    },

    initComponent: function() {

        var me = this;

        Ext.apply(me, {
            width: 100,
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
                
            ],
            bbar: [
                 {
                    text: 'X',
                    action: 'form_cancel'
                }
            ]
        });

        me.callParent(arguments);
    }
});