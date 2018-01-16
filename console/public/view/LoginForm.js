Ext.define('Login.view.LoginForm', {
    extend: 'Ext.form.Panel',
    xtype: 'loginform',

    layout: 'anchor',

    initComponent: function() {
        var me = this;

        var textTest = /[a-zA-Z0-9]?/;
        Ext.applyIf(Ext.form.field.VTypes, {
            text: function(val, field) {
                return textTest.test(val);
            },
            textText: '僅限輸入英文跟數字',
            textMask: /[a-zA-Z0-9]/
        });

        var headerBgColor = me.headerBgColor ? me.headerBgColor : 'rgba(241, 241, 241, 0.3)',//登入
            buttonBgColor = '#F0D23C',
            buttonHoverBgColor = '#C8AA23',
            buttonborderColor = 'rgb(252, 195, 28)';
            //登入按鈕 先設定好

        Ext.applyIf(me, {
            // header: {
            //     title: MSG['login'],
            //     height: 40,
            //     cls: 'login-form-header',
            //     padding: '10 0 0 15',
            //     border: 0,
            //     style: {
            //         background: headerBgColor,
            //         boxShadow:'none'
            //     }
            // },
            width: 320,
            height: 280,
            labelWidth: 20,
            buttonAlign: 'left',
            waitTitle: 'Loading ...',
            cls: 'view-loginform',
            defaults: {
                anchor: '88%',
                allowBlank: false,
                blankText: MSG['require'],
                margin: '8 0 0 20',
                padding: 8,
                width: 350,
                height: 50,
                msgTarget: 'title',
                labelStyle: 'margin: 12px 0; color: rgb(255, 255, 255); font-size: 16px; font-family: serif;',//帳號密碼 白字
                fieldStyle: 'padding: 5px',
                maxLength: 30,
                vtype: 'text',
                listeners: {
                    specialkey: me.enterToLogin
                }
            },
            fieldDefaults: {
                labelAlign: 'top'
            },
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: MSG['user_name'],
                    name: 'user_name',
                    width: 260,
                    emptyText: MSG['pls_username']
                },
                {
                    xtype: 'textfield',
                    fieldLabel: MSG['password'],
                    name: 'password',
                    width: 260,
                    emptyText: MSG['pls_password'],
                    inputType: 'password'
                }
            ],
            buttons: [//登入按鈕滑鼠移動變化
                {
                    text: MSG['login'],
                    cls: 'login-form-submit',
                    style: {
                        width: '260px',
                        height: '36px',
                        background: buttonBgColor,//套用 上面已設定顏色 
                        borderColor: 'none',
                        marginLeft: '23px',
                        marginBottom: '50px'
                    },
                    listeners: {
                        mouseover: function(obj) {
                            obj.getEl().setStyle('background', buttonHoverBgColor);
                        },
                        mouseout: function(obj) {
                            obj.getEl().setStyle('background', buttonBgColor);
                        },
                        click: function() {
                            me.submitForm(me);
                        }
                    }
                }
            ]
        });

        me.callParent(arguments);
    },
    enterToLogin: function(f, e) {
        var me = this;
        var form = me.up();

        if (e.getKey() == e.ENTER) {
            if (form.isValid()) {
                me.up().submitForm(form)
            }
        }
    },
    submitForm: function(obj) {
        form = obj.getForm();

        form.submit({
            url: './cps_console_login.php',
            method: 'POST',
            success: function(form, action) {
                window.top.location = './mainPage/index.php';
            },

            failure: function(form, action) {
                var errorMsg = null;

                switch (action.failureType) {
                    case Ext.form.action.Action.CLIENT_INVALID:
                        errorMsg = 'form_invalid';
                        break;
                    case Ext.form.action.Action.CONNECT_FAILURE:
                        errorMsg = 'server_connect_fail';
                        break;
                    case Ext.form.action.Action.SERVER_INVALID:
                        errorMsg = action.result.msg;
                }

                Ext.MessageBox.show({
                    title: MSG['msg_box_error'],
                    msg: MSG['login_fail'] + '<br>' + MSG[errorMsg],
                    width: 260,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        });
    }
});