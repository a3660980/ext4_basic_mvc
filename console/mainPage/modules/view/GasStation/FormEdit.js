Ext.define('Console.view.GasStation.FormEdit', {
	extend: 'Console.override.Form',
	alias: 'widget.gsformedit',
// 編輯
	requires: ['Ext.layout.container.Anchor'],

	layout: 'anchor',
// 排版模式
    config: {
        comboboxStore: 'CpsUserOrganization'
    },

	initComponent: function() {

        
        var me = this;
        var states = Ext.create('Ext.data.Store', {
            // 宣告定義下拉式選單方法
            fields: ['abbr', 'name'],
            data : [
                {"abbr":"1", "name":"人工"},
                {"abbr":"2", "name":"自助"}
                // {"上傳的值":"名稱","給人看得值":"名稱"}
            ]

        });      
        var gas = Ext.create('Ext.data.Store', {
            // 宣告定義下拉式選單方法
            fields: ['abbr', 'name'],
            data : [
                {"abbr":"1", "name":"92"},
                {"abbr":"2", "name":"95"},
                {"abbr":"3", "name":"98"},
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
                    name:'station_id',
                    fieldLabel: MSG['station_id'],
                    maxLength: 36,
                    hidden:true
                },{
                    name:'brand_id',
                    fieldLabel: MSG['brand_id'],
                    maxLength: 36,
                    hidden:true
                },{
                    xtype:'displayfield',
                    name:'station_code',
                    fieldLabel: MSG['station_code'],
                    maxLength: 10,
                    allowBlank: true
                },{
                    xtype:'displayfield',
                    name:'station_name',
                    fieldLabel: MSG['station_name'],
                    maxLength: 50,
                    allowBlank: false
                },{
                    name:'address_city',
                    fieldLabel: MSG['address_city'],
                    maxLength: 20,
                    allowBlank: false
                },{
                    name:'address_county',
                    fieldLabel: MSG['address_county'],
                    maxLength: 20,
                    allowBlank: false
                },{
                    name:'address',
                    fieldLabel: MSG['station_address'],
                    maxLength: 200,
                    allowBlank: false
                },{
                    xtype:'displayfield',
                    name:'gps_latitude',
                    fieldLabel: MSG['gps_latitude'],
                    maxLength: 15,
                    allowBlank: true
                },{
                    xtype:'displayfield',
                    name:'gps_longitude',
                    fieldLabel: MSG['gps_longitude'],
                    maxLength: 15,
                    allowBlank: true
                },{
                    name:'service_time',
                    fieldLabel: MSG['service_time'],
                    maxLength: 20,
                    allowBlank: true
                },{
                    xtype: 'combo',
                    name:'service_type',
                    fieldLabel: MSG['service_type'],
                    maxLength: 10,
                    allowBlank: true,
                    queryMode: 'local',
                    emptyText: "--請選擇(可複選)--",
                    // 取得本機端資料
                    store: states,
                    // 表格定義來源方法
                    displayField: 'name',
                    // 顯示的值
                    valueField: 'abbr',
                    // 上傳的值
                    forceSelection: true,
                    // 允許使用者可以改變所選內容進行更動
                    multiSelect: true,
                },{
                    xtype: 'combo',
                    name:'gas_type',
                    fieldLabel: MSG['gas_type'],
                    maxLength: 10,
                    allowBlank: true,
                    queryMode: 'local',
                    emptyText: "--請選擇(可複選)--",
                    // 取得本機端資料
                    store: gas,
                    // 表格定義來源方法
                    displayField: 'name',
                    // 顯示的值
                    valueField: 'abbr',
                    // 上傳的值
                    forceSelection: true,
                    multiSelect: true,
                },{
                    vtype: 'tellphone',
                    name:'phone',
                    fieldLabel: MSG['phone'],
                    maxLength: 20,
                    allowBlank: true
                },{
                    xtype:"numberfield",
                    name:'priority',
                    fieldLabel: MSG['priority'],
                    allowBlank: true,
                    value:20
                },{
                    xtype: 'datefield',
                    name:'start_date',
                    fieldLabel: MSG['start_date']
                },{
                    xtype: 'datefield',
                    name:'expire_date',
                    fieldLabel: MSG['expire_date']
                },{
                    vtype:'ValidateNumber',
                    name:'hand_gasoline_offer',
                    fieldLabel: MSG['hand_gasoline_offer'],
                    maxLength: 4,
                    allowBlank: true
                },{
                    vtype:'ValidateNumber',
                    name:'self_gasoline_offer',
                    fieldLabel: MSG['self_gasoline_offer'],
                    maxLength: 4,
                    allowBlank: true
                },{
                    vtype:'ValidateNumber',
                    name:'diesel_offer',
                    fieldLabel: MSG['diesel_offer'],
                    maxLength: 4,
                    allowBlank: true
                },{
                    xtype:'displayfield',
                    name:'created_date',
                    fieldLabel: MSG['created_date'],
                },{
                    xtype:'displayfield',
                    name:'updated_date',
                    fieldLabel: MSG['updated_date'],
                },{
                    xtype:'displayfield',
                    name:'operator',
                    fieldLabel: MSG['operator'],
                }
			],
			bbar: [
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