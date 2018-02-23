Ext.define('Console.view.Feed.Add', {
    extend: 'Ext.window.Window',

    alias: 'widget.feedwindow',

    requires: ['Ext.form.Panel', 'Ext.form.field.ComboBox'],

    
    defaultFocus: '#feed',

    width: 500,
    title: 'Add Feed',
    iconCls: 'feed-add',
    layout: 'fit',
    modal: true,
    plain: true,

    initComponent: function() {
        Ext.apply(this, {
            buttons: [{
                text: 'Add feed',
                action: 'create'
            }, {
                text: 'Cancel',
                scope: this,
                handler: this.close
            }],

            items: [{
                xtype: 'form',
                bodyPadding: '12 10 10',
                border: false,
                unstyled: true,
                defaultType: 'textfield',
                items: [{
                    name: 'name',
                    fieldLabel: '名稱',
                    maxLength: 10,
                    allowBlank: false
                },{
                    name: 'title',
                    fieldLabel: 'title',
                    maxLength: 20,
                    allowBlank: false
                },{
                    name: 'content',
                    fieldLabel: 'content',
                    maxLength: 200,
                    allowBlank: false
                }]
            }]
        });

        this.callParent(arguments);
    }
});
