Ext.define('Console.view.zoe.FormEdit_zoe', {
    extend: 'Console.override.Form',
    alias: 'widget.zoeformedit',

    requires: ['Ext.layout.container.Anchor'],

    layout: 'anchor',
    
     initComponent: function() {

        var me = this;
        var depnames = Ext.create('Ext.data.Store', {
            fields: ['depno', 'name'],
            data : [
                {"depno":"02", "name":"總經理室"},
                {"depno":"04", "name":"業務部"},
                {"depno":"08", "name":"資訊部"}
            ]
        });

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
                    xtype:'displayfield',
                    name: 't_id',
                    fieldLabel: MSG['id_ct']
                }, {
                    name: 't_name',
                    fieldLabel: MSG['name_ct'],
                    maxLength: 10,
                    allowBlank: false
                }, {
                    xtype: 'combo',
                    name: 't_dep',
                    fieldLabel: MSG['department'],
                    queryMode: 'local',
                    store: depnames,
                    displayField: 'name',
                    valueField: 'depno',
                    forceSelection: true,
                    allowBlank: true
                }, {
                    xtype: 'datefield',
                    name: 't_date1',
                    fieldLabel: MSG['t_date1'],
                    //maxLength: 10,
                    allowBlank: false
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