Ext.define('Console.view.HotelBranch.FormAdd', {
    extend: 'Console.override.Form',
    alias: 'widget.hotbraformadd',

    requires: ['Ext.layout.container.Anchor'], 

    layout: 'anchor',

    

  
    initComponent: function() {
        var me = this;
        // var branch_name = Ext.create('Ext.data.Store', {
        // fields: ['name'],
        // data : [
        //     {"name":"北投"},{"name":"嘉義"},{"name":"高雄"}
        // ]
        // });

        Ext.apply(me, {
            width: 450,
            bodyPadding: 5,
            autoScroll: false, 
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
                    xtype:'numberfield',
                    name: 'branch_sort',
                    fieldLabel: MSG['branch_sort'],
                    maxLength: 10,
                    allowBlank: true,
                    minValue:10,
                    value:10,
                    editable: false
                }, {
                    // xtype:'combo',
                    name: 'branch_name',
                    fieldLabel: MSG['branch_name'],
                    maxLength: 50,
                    allowBlank: false,
                    // store: branch_name,
                    // displayField: 'name',
                    // valueField: 'name',
                    // editable: false,
                }, {
                    xtype: 'filefield',
                    name: 'branch_photo',
                    fieldLabel: MSG['branch_photo'],
                    maxLength: 200,
                    allowBlank: true,
                    hidden:true
                }
            ],
            bbar: [ 
                {
                    text: MSG['confirm'],
                    action: 'form_confirm'
                }, {
                    text: MSG['cancel'],
                    action: 'form_cancel'
                }
            ]
        });

        me.callParent(arguments);
    }
});