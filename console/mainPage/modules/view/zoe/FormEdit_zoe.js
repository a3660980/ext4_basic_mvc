Ext.define('Console.view.zoe.FormEdit_zoe', {
    extend: 'Console.override.Form',
    alias: 'widget.zoeformedit',

    requires: ['Ext.layout.container.Anchor'],

    layout: 'anchor',
    
     initComponent: function() {

        var me = this;

        Ext.apply(me, {
            width: 250,
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
            items: [ //欄位項目
                {
                    name: 't_name',
                    fieldLabel: MSG['name_ct'],
                    maxLength: 10,
                    allowBlank: false
                }, {
                    name: 't_dep',
                    fieldLabel: MSG['department'],
                    maxLength: 2,
                    allowBlank: true
                }, {
                    xtype: 'datefield',
                    name: 't_date1',
                    fieldLabel: MSG['t_date1'],
                    //maxLength: 10,
                    allowBlank: true
                }, {
                    xtype: 'datefield',
                    name: 't_date2',
                    fieldLabel: MSG['t_date2'],
                    //maxLength: 10,
                    allowBlank: true
                }
            ],
            bbar: [ //確認 取消
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