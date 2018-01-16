Ext.define('Console.view.ExternalContact.FormEdit', {
	extend: 'Console.override.Form',
	alias: 'widget.ecformedit',
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
            fields: ['abbr', 'name'],
            data : [
                {"abbr":"男", "name":"男"},
                {"abbr":"女", "name":"女"},
                {"abbr":"其他", "name":"其他"}
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
                    xtype:'displayfield',
                    name: 'student_id',
                    fieldLabel: MSG['student_id'],
                }, {
                    name: 'name',
                    fieldLabel: MSG['name_'],
                    maxLength: 100,
                    allowBlank: false
    			}, {
                    xtype: 'combo',
                    name: 'gender',
                    fieldLabel: MSG['gender_b'],
                    queryMode: 'local',
                    store: states,
                    displayField: 'name',
                    valueField: 'abbr',
                    forceSelection: true,
                    flex: 1,
                    maxLength: 2
                }, {
                    name: 'email',
                    fieldLabel: MSG['email_b'],
                    maxLength: 100,
                    vtype: 'email',
                    allowBlank: true
                },{
                    vtype: 'cellphone',
    				name: 'phone',
                    maxLength: 20,
    				fieldLabel: MSG['mobile_number_b'],
                    allowBlank: false
    			},{
                    name: 'address',
                    maxLength: 20,
                    fieldLabel: MSG['address_b'],
                    allowBlank: false
                },{
                    xtype: 'datefield',
                    name: 'birthday',
                    fieldLabel: MSG['birthday_b'],
                    allowBlank: false
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