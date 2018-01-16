/**
 *
 * DateWindow
 *
 */
Ext.define('Console.package.DateWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.datewindow',

    initComponent: function() {
        var me = this;
        Ext.apply(me, {
            height: 130,
            width: 330,
            title: '請選擇核准日期',
            layout: 'fit',
            items: [
                {
                    xtype: 'form',
                    bodyPadding: 10,
                    frame: true,
                    fieldDefaults: {
                        msgTarget: 'under'
                    },
                    layout: 'anchor',
                    items: [
                        {
                            xtype: 'datefield',
                            allowBlank: false,
                            name: 'date',
                            fieldLabel: '指定日期'
                        }
                    ]
                }
            ],
            buttons: [{
                text: MSG['approve'],
                handler: function() {
                    var form = this.up('window').down('form').getForm();
                    var values = form.getValues();

                    if (form.isValid()) {
                        // Ext.MessageBox.show({
                        //     title: MSG['msg_box_info'],
                        //     msg: MSG['downloading'],
                        //     width: 300,
                        //     buttons: Ext.MessageBox.OK,
                        //     icon: Ext.MessageBox.INFO
                        // });
                        form.submit({
                            url: me.requestUrl,
                            params: {
                                dateValue: values.date.replace(/\//g, '-'),
                                user_name: me.user_name,
                                vehicle_no: me.vehicle_no 
                            },
                            success: function(form, action) {
                                // var url = Ext.decode(action.response.responseText).url;
                                // window.location = url;

                                Ext.MessageBox.show({
                                    title: MSG['msg_box_info'],
                                    msg: MSG['approve_success'],
                                    width: 300,
                                    buttons: Ext.MessageBox.OK,
                                    icon: Ext.MessageBox.INFO
                                });

                                me.close();
                            },
                            failure: function(form, action) {
                                var msg = null;

                                if (typeof action.response.result == 'undefined') {
                                    msg = MSG['execute_error'];
                                } else {
                                    msg = action.response.result.msg;
                                }
                                Ext.MessageBox.show({
                                    title: MSG['msg_box_info'],
                                    msg: msg,
                                    width: 300,
                                    buttons: Ext.MessageBox.OK,
                                    icon: Ext.MessageBox.ERROR
                                });
                            }
                        });
                    }
                }
            }, {
                text: MSG['close'],
                handler: function() {
                    var form =  this.up('window').down('form').getForm();
                    form.reset();

                    me.close();
                }
            }]
        });

        me.callParent(arguments);
    }
});