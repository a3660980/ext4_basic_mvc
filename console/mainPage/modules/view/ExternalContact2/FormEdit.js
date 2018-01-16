Ext.define('Console.view.ExternalContact2.FormEdit', {
	extend: 'Console.override.Form',
	alias: 'widget.ecformedit2',
// 編輯
	requires: ['Ext.layout.container.Anchor'],

	layout: 'anchor',
// 排版模式
    // config: {
    //     comboboxStore: 'CpsUserOrganization'
    // },

	initComponent: function() {

        
        var me = this;
       

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
                    name:'uuid',
                    hidden:true
       
                },{
                    name: 'student_id',
                    fieldLabel: MSG['student_id'],
                    maxLength: 10,
                    allowBlank: false,
                    xtype: 'displayfield'
                },{
                    name: 'subject',
                    fieldLabel: MSG['subject'],
                    maxLength: 5,
                    allowBlank: false,
                    hidden:false
                },{
                    name: 'score',
                    fieldLabel: MSG['score'],
                    maxLength: 100,
                    allowBlank: true
                    
                },{
                    xtype: 'datefield',
                    name: 'test_date',
                    fieldLabel: MSG['test_date'],
                    allowBlank: false,
                    maxLength:10,
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