Ext.define('Console.controller.bettytime', {
    extend: 'Ext.app.Controller',

    stores: [
        'GasLog.GasLog'
    ],
    models: [
        'GasLog.GasLog'
    ],
    views: [
        'GasLog.GridMaster',
        'GasLog.TabPanel'
    ],

    refs: [
        {
             ref: 'tabpanel',
             selector: 'galotabpanel'
        }, {
             ref: 'gridMaster',
             selector: 'galogridmaster'
        }, 
        
    ],

   
    init: function() {
        var me = this;

        me.control({
            'galogridmaster button[action=import]': {             
                click: me.importFile
            },
            'galogridmaster button[action=date_search]': {             
                click: me.date_search
            },
        });
    },

    date_search: function(){
        var me = this;
        var grid = me.getGridMaster(),
            store = grid.getStore();

        var win = Ext.create('Ext.window.Window', {
            height: 200,
            width: 350,
            title: MSG['select_date'],
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
                            vtype: 'GasLogsearchdate',
                            fieldLabel: '開始日期',
                            tag: 'start_date'
                        }, {
                            xtype: 'datefield',
                            allowBlank: false,
                            name: 'expire_date',
                            vtype: 'GasLogsearchdate',
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
                    var values = form.getValues();
                        //將日期取代成可比較的格式
                    var start = values.start_date.replace(/\//g, '-') + ' 00:00:00',
                        expire = values.expire_date.replace(/\//g, '-') + ' 23:59:59',
                        //取得js store中的proxy
                        proxy = store.getProxy(),
                        //取得js store中的url
                        url = proxy.api.read;
                    if (form.isValid()) {
                        //建立參數索引
                        index = url.indexOf('?startValue'); //indexOf沒找到關鍵字回傳-1
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
                        win.close();
                    }
                }
            }, {
                text: MSG['cancel'],
                handler: function() {
                    var form =  this.up('window').down('form').getForm();
                    form.reset();
                    win.close();
                }
            }]
        })
        win.show();
    },

    importFile: function(btn){
        var me = this;
        var win;
        var store = me.getGridMaster().getStore();

        if (! win)  {
            win = Ext.create('Ext.window.Window', {
                title: '選擇檔案',
                height: 120,
                width: 400,
                layout: 'fit',
                items: [
                    {
                        xtype: 'form',
                        bodyPadding: 10,
                        frame: true,
                        height: 60,
                        items: [
                            {
                                xtype: 'filefield',
                                name: 'upload',
                                fieldLabel: MSG['import_file'],
                                allowBlank: false,
                                anchor: '100%',
                                buttonText: '選擇檔案'
                            }
                        ],

                            buttons: [{
                                text: MSG['import'],
                                handler: function() {
                                    var form = this.up('form').getForm();
                                    if (form.isValid()) {
                                        form.submit({
                                            url: './modules/source/controller/GasLog/importFile.php',
                                            waitMsg: MSG['import_loading'],
                                            success: function(action, response) {
                                                var response = Ext.decode(response.response.responseText);
                                                var msg = response.msg;
                                                var target          = "BR"; //準備替代的文字, 可用 | 代表or
                                                var myRegExp        = new RegExp(target, 'g'); //轉換成正規表示
                                                var replaceText     = "<br />"; //準備替換成的文字
                                                var new_string      = msg.replace(myRegExp, replaceText);
                                                Ext.MessageBox.show({
                                                    title: MSG['msg_box_info'],
                                                    msg: new_string,
                                                    width: 520,
                                                    buttons: Ext.MessageBox.OK,
                                                    icon: Ext.MessageBox.INFO
                                                });

                                                store.reload();
                                                win.close();
                                            },
                                        });
                                    }
                                }
                            }, {
                                text: MSG['close'],
                                handler: function() {
                                var form = this.up('form').getForm();
                                form.reset();

                                win.close();
                            }
                        }]
                    }
                ]
            });
        }

        win.show();
    },
   
});
Ext.apply(Ext.form.field.VTypes, {
    GasLogsearchdate: function(val, field) {//名字不能衝突
        var me = this;
        var days = 60;
        var startDate = field.up().down('[tag=start_date]');
        var expireDate = field.up().down('[tag=expire_date]');
        var start = startDate.getValue();
        var expire = expireDate.getValue();
        var diff = (expire - start) / 86400000;
        if (expire != null && start > expire) {
            me.GasLogsearchdateText='結束時間不得低於開始時間。';
            return false;
        } else if(diff > days) {
            me.GasLogsearchdateText='只能查詢60天的資料';
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