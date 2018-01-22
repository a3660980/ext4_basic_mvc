Ext.define('Console.view.hotelhomepage.FormEdit', {
    extend: 'Console.override.Form',
    alias: 'widget.hlformedit',

    requires: ['Ext.layout.container.Anchor'],

    layout: 'anchor',//頁面布局

   
    //以上是檔案基本定義

    //性別下拉式選單
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
                    name:'home_id',
                    hidden:true
       
                },{
                    name: 'home_sort',
                    value:10,
                    hidden:true
       
                }, {
                    name:'home_name',
                    fieldLabel:MSG['home_name'],
                    maxLength:50,
                    allowBlank: true
                }, 
              
                {
                    name: 'home_photo',
                    fieldLabel: MSG['home_photo'],
                    maxLength: 200,
                    allowBlank: false
                    
                },{
                    xtype: 'startexpiredatefield',
                    allowStartBlank: false,
                    allowExpireBlank: false,
                    startName: 'start_date',
                    expireName: 'expire_date',
                    startLabelField: MSG['start_date'],
                    expireLabelField: MSG['expire_date']    
                },{
                    name: 'operator',
                    fieldLabel: MSG['operator'],
                    maxLength: 50,
                    allowBlank: true,
                    hidden:true
                }
            ],
            bbar: [
                {
                    text: MSG['confirm_t'],//確認
                    action: 'form_confirm'
                }, {
                    text: MSG['cancle_t'],//取消
                    action: 'form_cancel'
                }
            ]
        });

        me.callParent(arguments);
    }
});