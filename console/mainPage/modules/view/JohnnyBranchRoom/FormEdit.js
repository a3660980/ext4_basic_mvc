Ext.define('Console.view.JohnnyBranchRoom.FormEdit', {
    extend: 'Console.override.Form',
   
    alias:'widget.johnnyBranchRoomFormEdit', 

    requires:['Ext.layout.container.Anchor'],//API(應用程式介面)讓元件大小隨容器改變

    layout:'anchor',//頁面布局

    config: {
        comboboxStore: 'Johnny.comboxBranch'
    },
   
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
                    name: 'room_id',
                    hidden: true
                },
                {
                    name:'branch_id',
                    fieldLabel: MSG['branch_id'],
                    hidden: true,
                    store: me.getComboboxStore()
                },{
                    xtype: 'displayfield',
                    name: 'branch_name',
                    fieldLabel: MSG['branch_name'],
                    store: me.getComboboxStore()
                },{
                    name:'room_name',
                    fieldLabel: MSG['room_name'],
                    maxLength: 50,
                    allowBlank: true
                },{
                    name:'room_spec',
                    fieldLabel: MSG['room_spec'],
                    maxLength: 50,
                    allowBlank: true
                },{
                    xtype: 'fieldcontainer',
                    id:'room_photo',
                    fieldLabel: MSG['room_photo'],
                    allowBlank: true,
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'room_photo',
                            itemId: 'textfield_room_photo',
                            editable:false,
                            allowBlank: true,
                            width: 180
                        },{
                            xtype: 'filefield',
                            name: 'room_photo_file',
                            itemId: 'filefield_room_photo',
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
                }, {
                    xtype:"numberfield",
                    name: 'room_sort',
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