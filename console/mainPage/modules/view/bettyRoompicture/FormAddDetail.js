Ext.define('Console.view.bettyRoompicture.FormAddDetail', {
    extend: 'Console.override.Form',
   
    alias:'widget.brpformadd', 

    requires:['Ext.layout.container.Anchor'],

    layout:'anchor',//頁面布局
    config: {
        comboboxStore: 'betty.Service_RoomName'
    },
    initComponent: function() {
        var me = this; 
        // var states = Ext.create('Ext.data.Store', {
        //     //宣告定義下拉式選單方法
        //     fields: ['abbr', 'name'],
        //     data : [
        //         {"abbr":"0", "name":"配合"},
        //         {"abbr":"1", "name":"終止"},
        //         {"上傳的值":"名稱","給人看得值":"名稱"}
        //     ]
        // });        

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
                    name:'branch_id',
                    hidden:true
                },{
                    name: 'room_id',
                    xtype:'combobox',
                    itemid:'combobox_room',
                    fieldLabel: MSG['room_name'],
                    maxLength: 50,
                    allowBlank: true,
                    queryMode: 'remote',
                    store: me.getComboboxStore(),
                    displayField: 'room_name',
                    valueField: 'room_id',
                    forceSelection: false,
                    //value:'1',
                    editable: false,
                    action:'RoomNameExpand',
                    allowBlank: false
                },{
                    xtype:'numberfield',//顯示順序
                    name: 'detail_sort',
                    fieldLabel: MSG['detail_sort'],
                    maxLength: 4,
                    allowBlank: true,
                    value:10,
                    minValue:10,
                    editable: false
                },{
                    name: 'detail_name',//房型簡介
                    fieldLabel: MSG['detail_name'],
                    maxLength: 50
                },{
                    name: 'detail_photo',//房型展示照片
                    xtype:'filefield',
                    fieldLabel: MSG['detail_photo'],
                    maxLength: 200,
                    allowBlank: false,
                    emptyText: '請上傳1080X1080px的照片'
                    
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
                    action: 'form_add_confirm'//要執行確認的動作
                    
                }, {
                    text: MSG['cancle_t'],//取消
                    action: 'form_add_cancel'//要執行取消的動作
                }
            ]
            
        });

        me.callParent(arguments);
        // 繼承前面功能方法
    }
});