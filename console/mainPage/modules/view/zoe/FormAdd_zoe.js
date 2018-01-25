Ext.define('Console.view.zoe.FormAdd_zoe', {
    extend: 'Console.override.Form',
    alias: 'widget.zoeformadd',

    requires: ['Ext.layout.container.Anchor'], //anchor可讓元件大小隨容器改變

    layout: 'anchor',

    initComponent: function(){
    	var me = this;
        var depnames = Ext.create('Ext.data.Store', {
            fields: ['depno', 'name'],
            data : [
                {"depno":"02", "name":"總經理室"},
                {"depno":"04", "name":"業務部"},
                {"depno":"08", "name":"資訊部"}
            ]
        });
        
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
                    name: 't_id',
                    fieldLabel: MSG['id_ct'],
                    maxLength: 4,
                    allowBlank: false
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