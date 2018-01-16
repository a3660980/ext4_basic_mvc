Ext.define('Console.view.humhum_master_detail.Detail_FormEdit', {
	extend: 'Console.override.Form',
	alias: 'widget.detail_formedit',

	requires: ['Ext.layout.container.Anchor'],
    config: {
        comboboxStore: 'ServiceCategory.ServiceCategoryLang',
        comboboxStore2:'ServiceCategory.ServiceInfoLang'
    },
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
                    name: 'uuid',
                    hidden: true
                }, {
                    name: 'student_id',
                    fieldLabel: MSG['student_id'],
                    maxLength: 10,
                    allowBlank: false,
                    xtype: 'displayfield'
                }, {                    
                    name: 'subject',
                    fieldLabel: MSG['subject'],
                    maxLength: 8,
                    allowBlank: false
                }, {
                    name:'score',
                    fieldLabel: MSG['score'],
                    maxLength: 3,
                    allowBlank: false
                    
                }, {
                    name:'semester',
                    fieldLabel: MSG['semester'],
                    maxLength: 3,
                    allowBlank: false
                    
                }

            ],
            bbar: [
                {
                    text: MSG['confirm'],
                    action: 'detail_edit_confirm'
                }, {
                    text: MSG['cancle'],
                    action: 'detail_edit_cancel'
                }
            ]
        });

        me.callParent(arguments);
    }
});