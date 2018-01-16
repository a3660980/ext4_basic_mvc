Ext.define('Console.view.AccessSetting.GridMaster', {
    extend: 'Console.override.Grid',
    alias: 'widget.asgridmaster',
    id: 'asgridmaster',

    requires: ['Ext.ux.ProgressBarPager'],

    plugins: [
        {
            ptype: 'rowexpander',
            rowBodyTpl: new Ext.XTemplate(
                '<table border="0" cellpadding="0" cellspacing="0" class="row-expander-table" width="100%"><tbody><tr>',
                '<td width="120px" class="row-expander-td-label"><b>' + MSG['last_login_time'] + ':</b></td><td class="row-expander-td-fieldvalue">{last_login_time:this.checkNull}</td>',
                '<td width="120px" class="row-expander-td-label"><b>' + MSG['authorization_item'] + ':</b></td><td class="row-expander-td-fieldvalue">{authorization_item:this.showAuthorizationItem}</td>',
                '</tr></tbody></table>',
                {
                    checkNull: function(value) {
                        if (value == null || value == '') {
                            return '&nbsp;';
                        }
                        return value;
                    },
                    showAuthorizationItem: function(value) {
                        if (value == null || value == '') {
                            return MSG['authorized_all_item'];
                        } else {
                            var item_arr = value.split(',');
                            var item_level1 = new Array();
                            var item_level2 = new Array();
                            var item_level0 = new Array();
                            var str_return = '';
                            var index = -1;
                            var tmp = -1;

                            for(var i = 0; i < item_arr.length; i++) {
                                var item_split = item_arr[i].split('-');
                                var code_split = item_split[0].split('.');
                                if (code_split.length == 1) {
                                    //40~46行主要是解決單一menu(如:最新消息)出不來的時候
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
                                var item_level0_split = item_level0[i].split('-');
                                var item_level0_id = item_level0[i].substr(item_level0_split[0].length + 1).replace(/-/g, "_");
                                str_return += MSG[item_level0_id];
                                str_return += '<br />';
                            }

                            return str_return;
                        }
                    }
                }
            )
        }
    ],

    selType: 'checkboxmodel',

    config: {
        store: 'AccessSetting.CpsUserProfile'
    },

    initComponent: function() {
        var me = this;

        Ext.apply(me, {
            store: me.getStore(),
            columns: [
                {
                    header: MSG['user_name'],
                    dataIndex: 'user_name'
                }, {
                    header: MSG['name'],
                    dataIndex: 'name'
                }, {
                    header: MSG['department'],
                    dataIndex: 'department'
                }, {
                    header: MSG['title'],
                    dataIndex: 'title'
                }, {
                    header: MSG['mobile_phone'],
                    dataIndex: 'mobile_phone'
                }, {
                    header: MSG['email'],
                    dataIndex: 'email',
                    flex: 1
                }, {
                    header: MSG['created_date'],
                    dataIndex: 'created_date',
                    width: 150
                }
            ],

            tbar: [
                {
                    text: MSG['add'],
                    action: 'add_access_account'
                }, {
                    text: MSG['edit2'],
                    action: 'edit_access_account',
                    allowMulti: false,
                    disabled: true
                }, {
                    text: MSG['delete'],
                    allowMulti: true,
                    action: 'delete_access_account',
                    disabled: true
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                store: me.getStore(),
                displayInfo: true,
                plugins: new Ext.ux.ProgressBarPager()
            }
        });

        me.callParent(arguments);

        // rowexpander事件監聽
        me.getView().addListener('expandbody', function(rowNode, record, expandRow, eOpts) {
            this.getSelectionModel().select([record]);
        });
    }
});