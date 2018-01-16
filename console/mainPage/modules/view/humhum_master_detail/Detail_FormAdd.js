Ext.define('Console.view.humhum_master_detail.Detail_FormAdd', {
	extend: 'Console.override.Form',
	alias: 'widget.detail_formadd',

	requires: ['Ext.layout.container.Anchor'],

	layout: 'anchor',

	initComponent: function() {
        var me = this;

        Ext.apply(me, {
            width: 550,
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
                },  {
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
                    action: 'detail_add_confirm'
                }, {
                    text: MSG['cancle'],
                    action: 'detail_add_cancel'
                }
            ]
        });

        me.callParent(arguments);
    }
});