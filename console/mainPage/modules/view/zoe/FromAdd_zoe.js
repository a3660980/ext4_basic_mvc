Ext.defind('Console.view.zoe.FormAdd_zoe',{
    extend:'Console.override.Form',
    alias: 'widget.zoeformadd',

    requires: ['Ext.layout.container.Anchor'], //anchor可讓元件大小隨容器改變

    layout: 'anchor',

    initCompoent: function(){
    	var me = this;

    	Ext.apply(me,{
    		width:400,
    		bodyPadding:5,
    		autoScroll:false,
    		defaults:{
    			anchor:'100%'
    		},
    		defaultType: 'textfield', //類型
            fieldDefaults: {        //屬性類別
                msgTarget: 'under',
                autoFitErrors: false //展示错誤信息時是否自動调整字段组件宽度 
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
                    maxLength: 20,
                    allowBlank: false
                }, {
                    name: 't_dep',
                    fieldLabel: MSG['department'],
                    maxLength: 2,
                    allowBlank: true
                }, {
                    name: 't_date1',
                    fieldLabel: MSG['t_date1'],
                    maxLength: 10,
                    allowBlank: false
                }, {
                    name: 't_date2',
                    fieldLabel: MSG['t_date2'],
                    maxLength: 10,
                    allowBlank: false
                }
            ]

    	});
    }
	
});