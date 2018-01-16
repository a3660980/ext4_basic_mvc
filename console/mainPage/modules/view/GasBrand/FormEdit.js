Ext.define('Console.view.GasBrand.FormEdit', {
	extend: 'Console.override.Form',
	alias: 'widget.gbformedit',
// 編輯
	requires: ['Ext.layout.container.Anchor'],

	layout: 'anchor',
// 排版模式
    // config: {
    //     comboboxStore: 'CpsUserOrganization'
    // },

	initComponent: function() {

        
        var me = this;
        var states = Ext.create('Ext.data.Store', {
            // 宣告定義下拉式選單方法
            fields: ['abbr', 'name'],
            data : [
                {"abbr":"配合", "name":"配合"},
                {"abbr":"終止", "name":"終止"},
                // {"上傳的值":"名稱","給人看得值":"名稱"}
            ]

        });
       

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
                    name:'brand_id',
                    hidden:true
                },{
                    xtype: 'displayfield',
                    name: 'brand_name',
                    fieldLabel: MSG['brand_name'],
                    maxLength: 10,
                    allowBlank: false
                },{
                    xtype: 'filefield',
                    fieldLabel: MSG['brand_logo'],
                    name: 'brand_logo',
                    maxLength: 200,
                    allowBlank: true
                },{
                    name: 'web_url',
                    fieldLabel: MSG['web_url'],
                    maxLength: 100,
                    allowBlank: true
                },{
                    xtype:"numberfield",
                    name: 'priority',
                    fieldLabel: MSG['priority'],
                    allowBlank:false,
                    value:20
                },{
                    xtype:'combo',
                    name: 'contract_status',
                    fieldLabel: MSG['contract_status'],
                    maxLength: 2,
                    allowBlank: true,
                    queryMode: 'local',
                    // 取得本機端資料
                    store: states,
                    // 表格定義來源方法
                    displayField: 'name',
                    // 顯示的值
                    valueField: 'abbr',
                    // 上傳的值
                    forceSelection: true
                },{
                    vtype:'ValidateNumber',
                    name: 'hand_gasoline_offer',
                    fieldLabel: MSG['hand_gasoline_offer'],
                    maxLength: 4,
                    allowBlank: true
                },{
                    vtype:'ValidateNumber',
                    name: 'self_gasoline_offer',
                    fieldLabel: MSG['self_gasoline_offer'],
                    maxLength: 4,
                    allowBlank: true
                },{
                    vtype:'ValidateNumber',
                    name: 'diesel_offer',
                    fieldLabel: MSG['diesel_offer'],
                    maxLength: 4,
                    allowBlank: true
                },{
                    vtype:'word',
                    name: 'reward_point',
                    fieldLabel: MSG['reward_point'],
                    allowBlank: true
                },{
                    name: 'reward_info',
                    fieldLabel: MSG['reward_info'],
                    maxLength: 50,
                    allowBlank: true
                },{
                    xtype: 'displayfield',
                    name:'created_date',
                    fieldLabel: MSG['created_date'],
                },{
                    xtype: 'displayfield',
                    name:'updated_date',
                    fieldLabel: '上次更新時間',
                    allowBlank: false
                },{
                    name: 'operator',
                    fieldLabel: MSG['operator'],
                    maxLength: 50,
                    hidden:true
                }
            ],
			bbar: [
    			{
    				text: MSG['confirm'],
                    action: 'form_edit_confirm'
    			}, {
    				text: MSG['cancle'],
                    action: 'form_edit_cancel'
    			}
			]
		});

		me.callParent(arguments);
	}
});