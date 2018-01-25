Ext.define('Console.view.JohnnyBranchRoomPhoto.DetailFormAdd', {
    extend: 'Console.override.Form',
// 延伸
    alias: 'widget.johnnyBranchRoomPhotoDetailFormAdd',
// 新增
    requires: ['Ext.layout.container.Anchor'],

    layout: 'anchor',

    config: {
        comboboxStore: 'Johnny.comboxBranchRoom'
    },

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
                    name:'detail_id',
                    hidden:true
                },{
                    name: 'branch_id',
                    hidden:true
                },{
                    xtype: 'combobox',
                    action: 'room_id',
                    name: 'room_id',
                    itemId: 'add_room_id',
                    fieldLabel: MSG['room_name'],
                    allowBlank: false,
                    store: me.getComboboxStore(),
                    displayField: 'room_name', 
                    valueField: 'room_id', 
                    editable: false,
                    
                },{
                    name: 'detail_name',
                    fieldLabel: MSG['detail_name'],
                    maxLength: 50,
                    allowBlank: true
                },{
                    xtype: 'filefield',
                    name: 'detail_photo',
                    fieldLabel: MSG['detail_photo'],
                    buttonText: '上傳照片',
                    maxLength: 200,
                    allowBlank: false
                },{
                    xtype: 'displayfield',
                    value: '＊圖片尺寸須符合1080x1080。',
                    fieldStyle: {
                        // fontStyle: 'italic',
                        color: '#7f7f7f'
                    }
                },{
                    xtype:"numberfield",
                    name: 'detail_sort',
                    fieldLabel: MSG['home_sort'],
                    allowBlank:false,
                    value:10,
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
                    text: MSG['confirm'],
                    action: 'form_confirm'
                    // 執行動作
                }, {
                    text: MSG['cancle'],
                    action: 'form_cancel'
                }
            ]
            // 確認與取消
        });

        me.callParent(arguments);
        // 繼承前面功能方法
    }
    
});