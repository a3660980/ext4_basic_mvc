Ext.application({
    paths : {
        'Ext.ux': extjs_path + '/examples/ux/'
    },
    requires: [
        'Ext.ux.statusbar.StatusBar',
        'Console.package.StartExpireDateTimeField',
        'Console.package.StartExpireDateField',
        'Console.package.QuickSearchMenu'
    ],

    name: 'Console',
    appFolder: 'modules',

    controllers: [
        'Viewport',
        'AccountProfile',
        // 'SystemConfiguration',
        // 'SessionManagement',
        // 'ServiceLog',
        // 'MessageQueue',
        // 'MessageLog',
        // 'UserManagement',
  //       'PermissionLevel',
  //       'RemoteControl',
  //       'UserBlockade',
        'DeviceInformation',
        'AccessSetting',
        'ChangePassword',
        'ExternalContact',
        'ExternalContact2',
        'GasBrandDetail',
        'GasStation',
        'Hank',
        'Catie',
        'humhum',
        'humhum_detail',
        'Dina_detail',
        'Dina',
        'betty',
        'betty_detail',
        'Johnny',
        'JohnnyDetail'
    ],

    launch: function() {
        var me = this;
        if (! me.getController('Viewport').checkUserSessionExist()) {
            return;
        }

        // 檢查session是否還存在
        setInterval(function() {
            me.getController('Viewport').checkUserSessionExist();
        }, 3000);

        Ext.create('Console.view.Viewport');

        var buttons = [

            // default
            // 'system-information',
            // 'account-profile',
            // 'system-configuration',
            // 'cps-console',
            // 'device-information',
            // 'session-management',
            // 'service-log',
            // 'message-queue',
            // 'message-log',
            // project custom
            // 'user-management',
            // 'remote-control',
            // 'user-blockade',
            // 'permission-level',
            // 'access-control',
            // 'access-setting',
            // 'change-password',
            // default
            
            'study-a',
            'study-b',
            'study-c',
            'study-d',
            'study-e',
            'study-f',

        ];

        // 權限控管
        if (SES['user_name'] == 'admin' || session_authorization_str == null
            || session_authorization_str == '') {
            Ext.each(buttons, function(btn) {
                Ext.getCmp(btn).show();
            });
        } else {
            var item_arr = session_authorization_str.split(',');

            // hide all button
            for (var i = 0; i < item_arr.length; i++) {
                var item_split = item_arr[i].split('-');
                var code_split = item_split[0].split('.');

                if (code_split.length == 2) {
                    var upObj = Ext.getCmp(item_arr[i].substr(item_arr[i].indexOf('-') + 1));
                    if (typeof upObj == 'undefined') continue;
                    var topButton = upObj.up('button');
                    var menu = topButton.down('menuitem').ownerCt.items;
                    for (var j = 0; j < menu.length; j++) {
                        menu.items[j].hide();
                    }
                }
            }

            // show some button
            for (var i = 0; i < item_arr.length; i++) {
                var item_split = item_arr[i].split('-');
                var code_split = item_split[0].split('.');
                var top = Ext.getCmp(item_arr[i].substr(item_arr[i].indexOf('-') + 1));

                if (top === undefined) continue;

                top.show();

                if (code_split.length == 2) {
                    var topButton = top.up('button');
                    var menu = topButton.down('menuitem').ownerCt.items;

                    topButton.show();
                }
            }
        }

        Ext.apply(Ext.form.field.VTypes, {
            // 兩段式密碼輸入驗證
            password: function(val, field) {
                if (field.initialPassField) {
                    var pwd = field.up('form').down('#' + field.initialPassField);
                    return (val == pwd.getValue());
                }
                return true;
            },
            passwordText: MSG['confirm_password_wrong'],
            // 英文或數字
            word: function(val, field) {
                return Ext.form.VTypes['wordVal'].test(val);
            },
            wordVal: /^[0-9]+$/,//開頭到結束只能是整數
            wordText: '僅能輸入數字',
            // 手機號碼
            cellphone: function(val, field) {
                return Ext.form.VTypes['cellphoneVal'].test(val);
            },
            cellphoneVal: /^\d{10}$/,
            cellphoneText: '請輸入手機號碼如: 0987654321',
            cellphoneMask: /\d/,
            //市話號碼
            tellphone:function(val,field){
                return Ext.form.VTypes['tellphoneval'].test(val);
            },
            tellphoneval:/^\d{9}$/,
            tellphoneText: '請輸入市話號碼如: 071234567',
            tellphoneMask: /\d/,

            // 身份證字號 驗證
            identity_number:function(val,field){
                return Ext.form.VTypes['identity_number_val'].test(val);
            },
            identity_number_val:/^[A-Z]{1}\d{9}$/,
            identity_numberText: '請輸入身分證字號如: E123456789',
            identity_numberMask:/^[A-Z]{1}\d{9}$/,
            //判斷是否為小數以及小數點長度
            ValidateNumber:function(val,field){
                return Ext.form.VTypes['ValidateNumber_val'].test(val);
            },
            ValidateNumber_val:/^[0-9]+[.]{1}[1-9]+$/,
            ValidateNumberText: '僅能輸入小數,最多輸入小數第一位',

        });
    },

    autoCreateViewport: false
});