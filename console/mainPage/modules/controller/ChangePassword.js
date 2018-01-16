Ext.define('Console.controller.ChangePassword', {
    extend: 'Ext.app.Controller',

    stores: [
        'ChangePassword'
    ],
    models: [
        'ChangePassword'
    ],

    views: [
        'ChangePassword.TabPanel',
        'ChangePassword.FormChangePassword'
    ],

    init: function() {
        this.control({

            'cpformchangepassword': {
                afterrender: this.setFormChangePasswordValues
            },
            'cpformchangepassword textfield[action=valid_new_password]': {
                validitychange: this.validNewPassword,
                blur: this.validNewPassword
            },
            'cpformchangepassword button[action=form_change_password_confirm]': {
                click: this.changePassword
            },
            'cpformchangepassword button[action=form_change_password_cancel]': {
                click: this.resetFormChangePassword
            }
        });
    },

    setFormChangePasswordValues: function(obj, e0pts) {
        var store = this.getStore('ChangePassword');
        store.reload();

        var record = store.getAt(0);

        obj.getForm().loadRecord(record);

        // authorization_item需另外處理
        var str_return = '';
        if(record.get('authorization_item') != null && record.get('authorization_item') != '') {
            var item_arr = record.get('authorization_item').split(',');
            var item_level1 = new Array();
            var item_level2 = new Array();
            var item_level0 = new Array();
            item_level2[0] = new Array();
            var str_return = '';
            var index = -1;
            var tmp = -1;

            for(var i = 0; i < item_arr.length; i++) {
                var item_split = item_arr[i].split('-');
                var code_split = item_split[0].split('.');
                if (code_split.length == 1) {
                    //61~67行主要是解決單一menu(如:最新消息)出不來的時候
                    //將code_split[0]設為此項目的ID，即會出現此選項
                    if (code_split[0] ==7){
                        item_level0.push(item_arr[i]);
                     }/*else if(code_split[0] ==8){
                        item_level0.push(item_arr[i]);
                     }else if(code_split[0] ==8){
                         item_level0.push(item_arr[i]);
                     }*/
                } else if (code_split.length == 2) {
                    var upper_number = item_arr[i].split('.')[0];
                    if (tmp != upper_number) {
                        tmp = upper_number;
                        item_level2[++index] = new Array();
                    }
                    tmp = tmp == -1 ? upper_number: tmp;
                    item_level2[index].push(item_arr[i]);
                }

            }

            //authorized1
            // item_level1 = new Array();
            for (var i = 0; i < item_level2.length; i++) {
                var index = item_level2[i][0].split('.')[0];
                var msg   = 'authorized' + index;
                var add  = true;
                item_level1.push(MSG[msg]);
            }

            for(var i = 0; i < item_level1.length; i++) {
                var item_level1_split = item_level1[i].split('-');
                var item_level1_id = item_level1[i].substr(item_level1_split[0].length + 1).replace(/-/g, "_");
                str_return += MSG[item_level1_id];

                if(item_level2[i].length > 0) str_return += ': ';

                for(var j = 0; j < item_level2[i].length; j++) {
                    var item_level2_split = item_level2[i][j].split('-');
                    var item_level2_id = item_level2[i][j].substr(item_level2_split[0].length + 1).replace(/-/g, "_");
                    str_return += MSG[item_level2_id];

                    if(j != item_level2[i].length - 1) str_return += ',';
                }
                str_return += '<br />';
            }

            // 獨立的部分(沒有子架構)
            for (var i = 0; i < item_level0.length; i++) {
                var item_level0_split = item_level1[i].split('-');
                var item_level0_id = item_level0[i].substr(item_level0_split[0].length + 1).replace(/-/g, "_");
                str_return += MSG[item_level0_id];
                str_return += '<br />';
            }
        } else {
            str_return = MSG['authorized_all_item'];
        }
        obj.getForm().findField('authorization_item').setValue(str_return);


        // if(record.get('server_expire_date') != null && record.get('server_expire_date') != '')
        // {
            // var field = Ext.getCmp('field-server-expire-date');
            // field.show();
            // field.labelCell.setVisible(true);
            // obj.doComponentLayout();
            // obj.doLayout();
        // }
    },

    validNewPassword: function(field) {
        field.next().validate();
    },

    changePassword: function(btn) {
        var form = btn.up('container').up('fieldset').up('cpformchangepassword').getForm();

        if(!form.isValid())    return;

        Ext.Ajax.request({
            url: './modules/source/controller/ChangePassword/changeAdminPassword.php',
            method: 'POST',
            params: {
                old_password: form.findField('old_password').getValue(),
                new_password: form.findField('new_password').getValue()
            },
            success: function(response, opts) {
                var obj = Ext.decode(response.responseText);
                if (obj.success) {
                    Ext.MessageBox.show({
                        title: MSG['msg_box_info'],
                        msg: MSG['edit2_success'],
                        width: 300,
                        buttons: Ext.MessageBox.OK,
                        fn: function(btn) {
                            if (btn == 'ok') {
                                form.findField('old_password').reset();
                                form.findField('new_password').reset();
                                form.findField('new_password_again').reset();
                            }
                        },
                        icon: Ext.MessageBox.INFO
                    });
                } else {
                    Ext.MessageBox.show({
                        title: MSG['msg_box_error'],
                        msg: MSG['edit2_fail'] + '<br />' + MSG[obj.msg],
                        width: 300,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                }
            }
        });
    },

    resetFormChangePassword: function(btn) {
        var form = btn.up('container').up('fieldset').up('cpformchangepassword').getForm();

        form.findField('old_password').reset();
        form.findField('new_password').reset();
        form.findField('new_password_again').reset();
    }
}
);