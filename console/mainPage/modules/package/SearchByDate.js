/**
 * 日期查詢 window
 * 日期區間90天
 * 2017-06-06
 */
Ext.define('Console.package.SearchByDate', {
    extend: 'Ext.window.Window',
    alias: 'widget.searchbydate',//別名

    initComponent: function() {
        var me = this;
        var store = me.store;
        var days = me.days ? me.days : 90;//90天

        Ext.apply(Ext.form.field.VTypes, {
            threeMonthSelect: function(val, field) {//名字不能衝突
                var me = this;
                var startDate = field.up().down('[tag=start_date]');
                var expireDate = field.up().down('[tag=expire_date]');
                var start = startDate.getValue();//秒
                var expire = expireDate.getValue();//秒
                var diff = (expire - start) / 86400000;//(60*60*24)(開始到結束的時間)
                var currentdate = new Date();//顯示標準時間

               
                if (expire != null && start > expire) { //結束時間不是空值然後開始時間大於結束時間
                    me.threeMonthSelectText='結束時間不得低於開始時間。';
                    return false;
                } else if(diff > (days - 1)) {
                    me.threeMonthSelectText='只能查詢90天的資料';
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
            height: 200,
            width: 350,
            title: '選擇叫車日期',
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
                            name: 'start_date',
                            vtype: 'threeMonthSelect',
                            fieldLabel: '開始日期',
                            tag: 'start_date'
                        }, {
                            xtype: 'datefield',
                            allowBlank: false,
                            name: 'expire_date',
                            vtype: 'threeMonthSelect',
                            fieldLabel: '結束日期',
                            tag: 'expire_date'
                        }
                    ]
                }
            ],
            buttons: [{
                text: MSG['record'],//讓store回復的程式寫在controller's Viewport.js
                handler: function() {
                    var form = this.up('window').down('form').getForm();
                    //取得form的資料
                    var values = form.getValues(),
                        //將日期取代成可比較的格式
                        start = values.start_date.replace(/\//g, '-') + ' 00:00:00',
                        expire = values.expire_date.replace(/\//g, '-') + ' 23:59:59',
                        //取得js store中的proxy
                        proxy = store.getProxy(),
                        //取得js store中的url
                        url = proxy.api.read;

                    if (form.isValid()) {
                        //建立參數索引
                        index = url.indexOf('?startValue');
                        //若有資料則執行
                        if (index != -1) {
                            url = url.substring(0, index);
                        }
                        //傳參數至PHP，利用GET
                        proxy.api.read = url + "?startValue=" + start + "," + expire;
                        //重設proxy
                        store.setProxy(proxy);
                        //重新載入
                        store.reload();
                        //將選擇日期的畫面關掉
                        me.close();
                    }
                }
            }, {
                text: MSG['cancel'],
                handler: function() {
                    var form =  this.up('window').down('form').getForm();
                    form.reset();
                    me.close();
                }
            }]
        });

        me.callParent(arguments);
    }
})