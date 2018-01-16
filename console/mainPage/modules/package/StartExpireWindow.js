/**
 *
 * StartExpireDateWindow
 *
 */
Ext.define('Console.package.StartExpireWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.startexpirewindow',

    initComponent: function() {
        var me = this;
        var days = me.days ? me.days : 31;

        Ext.apply(Ext.form.field.VTypes, {
            startexpiredate: function(val, field) {
                var me = this;
                var startDate = field.up().down('[tag=start]');
                var expireDate = field.up().down('[tag=expire]');
                var start = startDate.getValue();
                var expire = expireDate.getValue();
                var diff = (expire - start) / 86400000;

                if (expire != null && start > expire) {
                    me.startexpiredateText='結束時間不得低於開始時間。';
                    return false;
                } else if(diff > (days - 1)) {
                    me.startexpiredateText='最多只能匯出31天的資料。';
                    return false;
                } else {
                    if (startDate == field) {
                        expireDate.clearInvalid();
                    } else {
                        startDate.clearInvalid();
                    }
                }

                return true;
            }
        });

        Ext.apply(me, {
            height: 180,
            width: 350,
            title: me.title ? me.title : MSG['select_date'],
            layout: 'fit',
            buttonAlign: 'center',
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
                            name: 'start',
                            vtype: 'startexpiredate',
                            fieldLabel: '開始日期',
                            tag: 'start'
                        }, {
                            xtype: 'datefield',
                            allowBlank: false,
                            name: 'expire',
                            vtype: 'startexpiredate',
                            fieldLabel: '結束日期',
                            tag: 'expire'
                        }
                    ]
                }
            ],
            buttons: [{
                text: '匯出',
                handler: function() {
                    var form = this.up('window').down('form').getForm();

                    if (form.isValid()) {
                        Ext.MessageBox.show({
                            title: MSG['msg_box_info'],
                            msg: MSG['downloading'],
                            width: 300,
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.INFO
                        });
                        var values = form.getValues();
                        form.submit({
                            url: me.requestUrl,
                            params: {
                                startValue: values.start.replace(/\//g, '-') + ' 00:00:00',
                                expireValue: values.expire.replace(/\//g, '-') + ' 23:59:59'
                            },
                            success: function(form, action) {
                                var url = Ext.decode(action.response.responseText).url;
                                window.location = url;

                                Ext.MessageBox.show({
                                    title: MSG['msg_box_info'],
                                    msg: MSG['export_success'],
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
    },

    setValue: function(start, expire) {
        var me = this;
        var startDate = me.down('datefield[tag=start]');
        var expireDate = me.down('datefield[tag=expire]');

        if (start != null && start != '') {
            startDate.setRawValue(start.split(" ")[0], 'Y/m/d');
        }

        if (expire != null && expire != '') {
            expireDate.setRawValue(expire.split(" ")[0], 'Y/m/d');
        }
    }
});
