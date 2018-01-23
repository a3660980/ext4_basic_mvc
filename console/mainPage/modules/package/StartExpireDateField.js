/**
 *
 * StartExpireDateField
 *
 */
Ext.define('Console.package.StartExpireDateField', {
    extend: 'Ext.form.FieldSet',
    alias: 'widget.startexpiredatefield',

    initComponent: function() {
        var me = this;
        let today = new Date();

        Ext.apply(Ext.form.field.VTypes, {
            startexpiredate: function(val, field) {
                var me = this;
                var startDate = field.up().down('[tag=start]');
                var expireDate = field.up().down('[tag=expire]');
                var start = startDate.getValue();
                var expire = expireDate.getValue();

                if (expire != null && start > expire) {
                    if (startDate == field) {
                        me.startexpiredateText = MSG['start_date_error'];
                    } else {
                        me.startexpiredateText = MSG['expire_date_error'];
                    }

                    return false;
                }

                if (startDate == field) {
                    expireDate.clearInvalid();
                } else {
                    startDate.clearInvalid();
                }

                return true;
            }
        });

        Ext.apply(me, {
            defaultType: 'datefield',
            header: false,
            collapsible: false,
            frame: false,
            border: 0,
            padding: 0,
            margin: 0,
            layout: 'anchor',
            defaults: {
                anchor: '100%',
            },
            items: [
                {
                    allowBlank: me.allowStartBlank,
                    name: me.startName,
                    vtype: 'startexpiredate',
                    fieldLabel: me.startLabelField,
                    tag: 'start',
                    value: today.toISOString().substring(0, 10)
                }, {
                    allowBlank:me.allowExpireBlank,
                    name: me.expireName,
                    vtype: 'startexpiredate',
                    fieldLabel: me.expireLabelField,
                    tag: 'expire'
                }
            ]
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