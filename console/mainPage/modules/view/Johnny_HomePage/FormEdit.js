Ext.define('Console.view.Johnny_HomePage.FormEdit', {
    extend: 'Console.override.Form',
   
    alias:'widget.johnnyHomePageFormEdit', 

    requires:['Ext.layout.container.Anchor'],//API(應用程式介面)讓元件大小隨容器改變

    layout:'anchor',//頁面布局
   
    //以上是檔案基本定義

    //以下宣告function執行新增

    //宣告性別下拉式選單的值

    initComponent: function() {
        var me = this;       

        Ext.apply(me, {
            width: 450,
            // 寬度
            bodyPadding: 5,
            // 輸入框大小
            autoScroll: true,
            // 自動滾動
            defaults: {
                anchor: '100%'
            // 輸入框延伸方法
            },
            defaultType: 'textfield',
            // 輸入框默認文字
            fieldDefaults: {
                // 設定為提示欄位
                msgTarget: 'under',
                // 提示訊息放的位置
                autoFitErrors: true
                // 提示訊息長度控制
            },
            items: [
                {
                    name:'home_id',
                    fieldLabel: MSG['home_id'],
                    hidden: true
                },
                {
                    name:'home_name',
                    fieldLabel: MSG['home_name'],
                    maxLength: 50,
                    allowBlank: true
                },{
                    xtype: 'fieldcontainer',
                    id:'home_photo',
                    fieldLabel: MSG['home_photo'],
                    allowBlank: false,
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'home_photo',
                            itemId: 'textfield_home_photo',
                            editable:false,
                            allowBlank: false,
                            width: 180
                        },{
                            xtype: 'filefield',
                            name: 'home_photo_file',
                            itemId: 'filefield_home_photo',
                            buttonText: '上傳照片',
                            buttonOnly:true,
                            disabled: true,
                            style: {
                                margin: '0 5px'
                            }
                        },{
                            xtype: 'button',
                            text: '清空檔案',
                            itemId: 'button_clearFile',
                            disabled: false
                        }
                    ]
                },{
                    xtype: 'displayfield',
                    value: '＊圖片尺寸須符合1080x1920。',
                    fieldStyle: {
                        // fontStyle: 'italic',
                        color: '#7f7f7f'
                    }
                },{
                    xtype:"numberfield",
                    name: 'home_sort',
                    fieldLabel: MSG['home_sort'],
                    allowBlank:false,
                    editable: false,//是否可以編輯
                    allowNegative:false,//是否允許負數
                    maxValue:99,
                    minValue:10
                },{
                    xtype: 'displayfield',
                    value: '＊數字越小順序越前面(從10開始)。',
                    fieldStyle: {
                        // fontStyle: 'italic',
                        color: '#7f7f7f'
                    }
                },{
                    xtype: 'startexpiredatefield',
                    allowStartBlank: true,
                    allowExpireBlank: true,
                    startName: 'start_date',
                    expireName: 'expire_date',
                    startLabelField: MSG.start_date,
                    expireLabelField: MSG.expire_date
                },{
                    xtype: 'displayfield',
                    value: '＊若未填生效日與到期日，則系統將自動填入此活動的日期時段。',
                    fieldStyle: {
                        // fontStyle: 'italic',
                        color: '#7f7f7f'
                    }
                }
            ],
            bbar: [
                {
                    text: MSG['confirm_t'],//確認
                    action: 'form_confirm'//要執行確認的動作
                    
                }, {
                    text: MSG['cancle_t'],//取消
                    action: 'form_cancel'//要執行取消的動作
                }
            ]
            
        });

        me.callParent(arguments);
        // 繼承前面功能方法
    }
});