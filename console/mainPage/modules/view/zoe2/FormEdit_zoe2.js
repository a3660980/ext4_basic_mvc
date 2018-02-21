Ext.define('Console.view.zoe2.FormEdit_zoe2', {
    extend: 'Console.override.Form',
    alias: 'widget.zoeformedit2',

    requires: ['Ext.layout.container.Anchor'], //anchor可讓元件大小隨容器改變

    layout: 'anchor',

    initComponent: function(){
    	var me = this;
        
    	Ext.apply(me,{
    		width:250,
    		bodyPadding:5,
    		autoScroll:false,
    		defaults:{
    			anchor:'100%'
    		},
    		defaultType: 'textfield', //類型
            fieldDefaults: {        //屬性類別
                msgTarget: 'under',
                autoFitErrors: false //出現錯誤提示訊息時是否調整畫面寬度
            },
            items: [ //欄位項目
                {
                    xtype:'displayfield',
                    name: 's_id',
                    fieldLabel: MSG['student_id_d'],
                }, {
                    name: 'name',
                    fieldLabel: MSG['student_name_d'],
                    allowBlank: false
                },{
                    xtype: 'radiogroup',
                    fieldLabel: MSG['student_gender_d'],
                    //cls: 'x-check-group-alt',
                    items:[
                          {
                            boxLabel: '男',
                            name: 'sex',
                            inputValue: '男'
                          },{
                            boxLabel: '女',
                            name: 'sex',
                            inputValue: '女'
                          }
                    ]                   
                },{
                    name: 'email',
                    fieldLabel: MSG['student_email_d'],
                    allowBlank: true
                },{
                    name: 'phone',
                    fieldLabel: MSG['student_phone_d'],
                    allowBlank: true
                },{
                    name: 'adderss',
                    fieldLabel: MSG['student_address_d'],
                    allowBlank: true
                },{
                    xtype: 'datefield',
                    name: 'birthday',
                    fieldLabel: MSG['student_birthday_d'],
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