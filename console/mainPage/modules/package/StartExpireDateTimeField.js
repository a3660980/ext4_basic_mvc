/**
 *
 * StartExpireDateField
 *
 */
Ext.define('Console.package.StartExpireDateTimeField', {
    extend: 'Ext.form.FieldSet',
    alias: 'widget.startexpiredatetimefield',

    allowExpireBlank: true,

    initComponent: function() {
        var me = this;

        Ext.apply(Ext.form.field.VTypes, {
            startexpiredatetime: function(val, field) {
                var me = this;
                var masterContainer = field.up().up();
                var startContainer = masterContainer.down('[tag=start]');
                var expireContainer = masterContainer.down('[tag=expire]');
                var startDate = startContainer.down('datefield[tag=start]');
                var startTime = startContainer.down('timefield[tag=start]');
                var expireDate = expireContainer.down('datefield[tag=expire]');
                var expireTime = expireContainer.down('timefield[tag=expire]');
                var startDateValue = Ext.Date.format(startDate.getValue(), 'Y/m/d');
                var startTimeValue = Ext.Date.format(startTime.getValue(), 'H:i');
                var expireDateValue = Ext.Date.format(expireDate.getValue(), 'Y/m/d');
                var expireTimeValue = Ext.Date.format(expireTime.getValue(), 'H:i');

                if (expireDateValue == '' && expireTimeValue != ''
                    || expireDateValue != '' && expireTimeValue == '') {
                    me.startexpiredatetimeText = MSG['expire_time_null'];
                    expireDate.markInvalid(MSG['expire_time_null']);
                    expireTime.markInvalid(MSG['expire_time_null']);

                    return false;
                }
                if (expireDateValue != '') {
                    if ((expireDateValue < startDateValue)
                        || (expireDateValue == startDateValue
                            && expireTimeValue < startTimeValue)) {
                        me.startexpiredatetimeText = MSG['expire_date_error'];

                        return false;
                    }
                }

                expireDate.clearInvalid();
                expireTime.clearInvalid();
                startDate.clearInvalid();
                startTime.clearInvalid();

                return true;
            }
        });

        Ext.apply(me, {
            defaultType: 'container',
            layout: 'anchor',
            defaults: {
                anchor: '100%'
            },
            frame: false,
            border: 0,
            padding: 0,
            margin: 0,
            items: [
                {
                    layout: 'hbox',
                    defaults: {
                        vtype: 'startexpiredatetime',
                        allowBlank: false
                    },
                    tag: 'start',
                    items: [
                        {
                            xtype: 'datefield',
                            name: me.startDateName,
                            fieldLabel: me.startLabelField,
                            margin: '0 25 5 0',
                            tag: 'start',
                            listeners: {
                                afterrender: function(obj, eOpts) {
                                    var form = obj.up('overform');
                                    form.on('show', function(form, eOpts) {
                                        // console.log(obj.setValue(Ext.Date.format(new Date(), 'Y/m/d')));
                                        obj.setValue(Ext.Date.format(new Date(), 'Y/m/d'));
                                    });
                                }
                            }
                        }, {
                            xtype: 'timefield',
                            name: me.startTimeName,
                            increment: 30,
                            tag: 'start',
                            listeners: {
                                afterrender: function(obj, eOpts) {
                                    var form = obj.up('overform');

                                    form.on('show', function(form, eOpts) {
                                        var now = Ext.Date.format(new Date(), 'G:i');
                                        now = me.convert12hr(now);
                                        obj.setValue(now);
                                    });
                                }
                            }
                        }
                    ]
                }, {
                    layout: 'hbox',
                    defaults: {
                        vtype: 'startexpiredatetime',
                        allowBlank: me.allowExpireBlank
                    },
                    tag: 'expire',
                    items: [
                        {
                            xtype: 'datefield',
                            name: me.expireDateName,
                            fieldLabel: me.expireLabelField,
                            margin: '0 25 5 0',
                            tag: 'expire'
                        }, {
                            xtype: 'timefield',
                            name: me.expireTimeName,
                            increment: 30,
                            tag: 'expire'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    setValue: function(start, expire) {
        var me = this;
        var masterContainer = me;
        var startContainer = masterContainer.down('[tag=start]');
        var expireContainer = masterContainer.down('[tag=expire]');
        var startDate = startContainer.down('datefield[tag=start]');
        var startTime = startContainer.down('timefield[tag=start]');
        var expireDate = expireContainer.down('datefield[tag=expire]');
        var expireTime = expireContainer.down('timefield[tag=expire]');

        var startArr = start.split(" ");
        var startDateValue = startArr[0];
        var startTimeValue = startArr[1].replace(/\.\d{3}/, '');
        var expireArr = expire.split(" ");

        if (expireArr.length >= 2) {
            var expireDateValue = expireArr[0];
            var expireTimeValue = expireArr[1].replace(/\.\d{3}/, '');
        }

        startDate.setValue(startDateValue);
        startTime.setValue(me.convert12hr(startTimeValue));
        expireDate.setValue(expireDateValue);
        expireTime.setValue(me.convert12hr(expireTimeValue));
    },

    convert12hr: function(time) {
        if (time == '' || typeof time == 'undefined') return '';

        var arr = time.split(":");
        var h = arr[0];
        var m = arr[1];
        var apm = '上午';

        if (h == 0) {
            h = 0;
        } else if (h >= 13) {
            h -= 12;
            apm = '下午';
        } else if (h == 12) {
            apm = '下午';
        }

        // 如果輸出為 03:00 修正為 3:00, 去掉第一個0
        if (h[0] == 0) h = h[1];

        return h + ":" + m + " " + apm;
    }
});