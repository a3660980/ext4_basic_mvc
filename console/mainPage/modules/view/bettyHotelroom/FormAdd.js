Ext.define('Console.view.bettyHotelroom.FormAdd', {
	extend: 'Console.override.Form',
   
	alias:'widget.bhrformadd', //這個js檔的別名

	requires:['Ext.layout.container.Anchor'],//API(應用程式介面)讓元件大小隨容器改變

	layout:'anchor',

    config: {
        comboboxStore: 'betty.Service_BranchName'    
    },
	initComponent: function() {
        var me = this;  
        // var states = Ext.create('Ext.data.Store', {
        //     fields: ['abbr', 'name'],
        //     data : [
        //         {"abbr":"男", "name":"男"},
        //         {"abbr":"女", "name":"女"},
        //         {"abbr":"其他", "name":"其他"}
        //         // {"上傳的值":"名稱","給人看得值":"名稱"}
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
                    name:'room_id',
                    hidden:true
       
                },{
                    name:'branch_id',
                    fieldLabel: MSG['branch_name'],
                    xtype:'combo',
                    queryMode: 'remote',
                    store: me.getComboboxStore(),
                    displayField: 'branch_name',
                    valueField: 'branch_id',
                    forceSelection: false,
                    maxLength: 50,
                    allowBlank: false,
                    editable: false
                      
                },{
                    xtype:'numberfield',
                    name: 'room_sort',
                    fieldLabel: MSG['room_sort'],
                    maxLength: 4,
                    allowBlank: true,
                    value:10,
                    minValue:10,
                    editable: false
    			},{
                     name: 'room_name',
                    fieldLabel: MSG['room_name'],
                    allowBlank: false
                   
                },{
                    name:'room_spec',
                    fieldLabel: MSG['room_spec'],//床型規格
                    maxLength: 50,
                    allowBlank: true

                },{
                    name: 'room_photo',
                    xtype:'filefield',
                    fieldLabel: MSG['room_photo'],
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