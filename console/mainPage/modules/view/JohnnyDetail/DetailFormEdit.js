Ext.define('Console.view.JohnnyDetail.DetailFormEdit', {
	extend: 'Console.override.Form',
	alias: 'widget.johnnyDetailEdit',
	requires: ['Ext.layout.container.Anchor'],

	layout: 'anchor',


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
                    name:'detail_id',
                    hidden:true
                },{
                    name: 'student_id',
                    hidden:true
                },{
                    name: 'subject',
                    fieldLabel: MSG['subject'],
                    maxLength: 4,
                    allowBlank: true
                },{
                    name: 'score',
                    fieldLabel: MSG['score'],
                    maxLength: 4,
                    allowBlank: true
                },{
                    name: 'semester',
                    fieldLabel: MSG['semester'],
                    maxLength: 50,
                    allowBlank: true
                },{
                    xtype: 'displayfield',
                    name:'created_date',
                    fieldLabel: MSG['created_date'],
                    hidden:true
                },{
                    xtype: 'displayfield',
                    name:'updated_date',
                    fieldLabel: '上次更新時間',
                    allowBlank: false,
                    hidden:true
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