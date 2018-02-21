Ext.define('Console.view.HotelRoom.FormEdit', {
    extend: 'Console.override.Form',
    alias: 'widget.hotrooformedit',

    requires: ['Ext.layout.container.Anchor'],

    layout: 'anchor',

    config: {
        BranchName:'HotelRoom.BranchName'
    },

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
                    name: 'room_id',
                    hidden:true
                }, {
                    xtype:'numberfield',
                    name: 'room_sort',
                    fieldLabel: MSG['room_sort'],
                    maxLength: 10,
                    allowBlank: true,
                    minValue:10,
                    value:10,
                    editable: false
                }, {
                    xtype:'combo',
                    name: 'branch_name',
                    fieldLabel: MSG['branch_name'],
                    maxLength: 50,
                    allowBlank: false,
                    store: me.getBranchName(),
                    // action:'comboboxbranchname',
                    displayField: 'branch_name',
                    valueField: 'branch_name',
                    editable: false,
                }, {
                    name:'room_name',
                    fieldLabel: MSG['room_name'],
                    maxLength: 50,
                    allowBlank: false,

                }, {
                    name:'room_spec',
                    fieldLabel: MSG['room_spec'],
                    maxLength: 50,
                    allowBlank: true,

                },{
                    xtype: 'filefield',
                    name: 'room_photo',
                    fieldLabel: MSG['room_photo'],
                    maxLength: 200,
                    allowBlank: true
                   
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