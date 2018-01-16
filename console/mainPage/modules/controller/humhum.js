Ext.define('Console.controller.humhum', {
    extend: 'Ext.app.Controller',

    stores: [
        'humhum.store_humhum',
        'humhum.sort'
    ],
    models: [
        'humhum.model_humhum',
    ],
    views: [
        'humhum.ActionPanel_humhum',
        'humhum.FormAdd_humhum',
        'humhum.FormEdit_humhum',
        'humhum.GridMaster_humhum',
        'humhum.TabPanel_humhum',
        'humhum.SortGrid_humhum',
        'humhum.leftshow',
        'humhum.leftactionpanel',
    ],

    refs: [
        {
            ref: 'actionPanel',
            selector: 'ActionPanel_humhum'
        }, {
            ref: 'grid',
            selector: 'yoyogridmaster'
        }, {
            ref: 'formAdd',
            selector: 'FormAdd_humhum'
        }, {
            ref: 'formEdit',
            selector: 'FormEdit_humhum'
        }, {
            ref: 'mainViewport',
            selector: 'mainviewport'
        }, {
            ref: 'leftshow',
            selector: 'leftshow'
        }, {
            ref: 'leftactionpanel',
            selector: 'leftactionpanel'
        }

    ],

    config: {
        formAddTitle: '新增用戶資料',
        formEditTitle: '修改用戶資料',
        sortTitle: MSG['sort'],
        addRequestUrl: './modules/source/controller/humhum/addServiceinfo_humhum.php',
        editRequestUrl: './modules/source/controller/humhum/editServiceInfo_humhum.php'
    },

    init: function() {
        var me = this;

        me.control({
            'yoyogridmaster': {
                select: me.selectList,
                deselect: me.deselectList
            },
            'yoyogridmaster button[action=add_user]': {
                click: me.addData
            },
            'yoyogridmaster button[action=edit_user]': {
                click: me.editData
            },
            'yoyogridmaster button[action=delete_user]': {
                click: me.deleteData
            },
            'yoyogridmaster button[action=left_show]': {
                click: me.leftshow
            },
            'yoyogridmaster button[action=sort_hum]': {
                click: me.addTab
            },
            'FormAdd_humhum button[action=form_confirm]': {
                click: me.addConfirm
            },
            'FormAdd_humhum button[action=form_cancel]': {
                click: me.addCancel
            },
            'FormEdit_humhum button[action=form_confirm]': {
                click: me.editConfirm
            },
            'FormEdit_humhum button[action=form_cancel]': {
                click: me.editCancel
            },      
            'yoyosortgridmaster button[action=sort_boom]': {
                click: me.boom
            },           
            'leftshow button[action=form_cancel]': {
                click: me.leftshowcancel
            }

        });
    },


    leftshowcancel: function(btn){
        var me = this;
        var form = me.getLeftshow();
        me.checkSession();
        var actionPanel = me.getLeftactionpanel();
        actionPanel.collapse(Ext.Component.DIRECTION_LEFT, true);
        form.getForm().reset();
        form.hide();
        actionPanel.doLayout();
    },

    leftshow: function(btn){
        var me = this;
        var formPanel = me.getLeftshow(),
            title = '修拉';
        me.checkSession();
        var actionPanel = me.getLeftactionpanel(),
            isCollapse = actionPanel.getCollapsed();
            isHidden = formPanel.isHidden();
        console.log('isCollapse:',isCollapse);
        console.log('isHidden:',isHidden);
        formPanel.getForm().reset();
        if (isHidden && ! isCollapse) {
            Ext.MessageBox.show({
                title: MSG['msg_box_info'],
                msg: MSG['plz_close'],
                width: 300,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.INFO
            });
        } else if (! isHidden && ! isCollapse) {
            Ext.MessageBox.show({
                title: MSG['msg_box_info'],
                msg: MSG['plz_close'],
                width: 300,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.INFO
            });
        } else {
            formPanel.show();
            actionPanel.setTitle(title);
            actionPanel.doLayout();
            actionPanel.expand(true);
        }
    },

    boom: function(){
        
        var progress = Ext.MessageBox.show({
                            title: MSG['sort_jiang'],
                            msg: '..............',
                            width: 300,
                            progress: true,
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.INFO,
                            fn: function(btn) {                               
                                window.location = '../index.php';
                            }
                          });
        var times = 0;
        setTimeout(actionFunc, 10);
        function actionFunc(){
            times++;
            progress.updateProgress(times/100, (times*1) + ' %');
            if(times<100){
                progress.updateText('等等喔');
                setTimeout(actionFunc, 10);
            }else{
                progress.updateText('還排阿，掰掰');
            }
        }
    },

   
    addTab: function(btn) {
        var me = this;
        me.checkSession();

        tabpanel = btn.up('yoyogridmaster').up('yoyotabpanel').up('viewport').down('centerpanel');
        var itemId = null;
        var title = null;
        var xtype = null;
        // 依據按鈕itemId判斷應該tab顯示的內容與標題
        if(btn.getId() == 'sort') {
           Ext.MessageBox.show({
                title: MSG['sort_jiang'],
                msg: '排好了拉',
                width: 300,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.INFO
            });
            itemId = 'sort-hum';
            title = MSG['sort_jiang'];
            xtype = 'yoyosortgridmaster';
        }
        var n = tabpanel.getComponent(itemId);

        if (! n) {
            var closable;
            if (itemId == 'sort-hum1'){
                    closable = true
                }
                else {
                    closable = false
                }
            console.log('closable',closable);
            n = tabpanel.add({
                itemId: itemId,
                title: title,
                items: [
                    {
                        xtype: xtype
                    }
                ],
                autoDestroy: false,
                closable: closable,
            });
        }

        tabpanel.setActiveTab(n);
        tabpanel.doLayout();

        //日期查詢恢復原狀
        var resetArr = [
            'clotabpanel','costabpanel',
            'caotabpanel','ctatabpanel',
            'cattabpanel','catutabpanel',
            'mptabpanel','rumtabpanel',
            'sdtabpanel','rdatabpanel',
            'dertabpanel','dritabpanel',
            'dttabpanel','dtrtabpanel',
            'dsetabpanel','trtabpanel',
            'dltabpanel','pctabpanel',
            'cctabpanel','clgtabpanel',
            'aicatabpanel','msttabpanel',
            'mstxtabpanel','cltutabpanel'
        ];

        if(Ext.Array.contains(resetArr, xtype)){
            this.resetStore(n);
        }

        if (n.down(xtype) != null) {
            n.down(xtype).setHeight(n.getHeight());
        }
        

    },

    checkSession: function() {
        var me = this;
        var isSessionExist = me.getController('Viewport').checkUserSessionExist();

        if (! isSessionExist) {
            return;
        }
    },

    showForm: function(formPanel, title) {
        var me = this;
        me.checkSession();

        var actionPanel = me.getActionPanel(),
            isCollapse = actionPanel.getCollapsed();
            isHidden = formPanel.isHidden();
        console.log('isCollapse:',isCollapse);
        console.log('isHidden:',isHidden);

        formPanel.getForm().reset(); //重設form欄位回預設值

        if (isHidden && ! isCollapse) {
            Ext.MessageBox.show({
                title: MSG['msg_box_info'],
                msg: MSG['plz_close'],
                width: 300,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.INFO
            });
        } else if (! isHidden && ! isCollapse) {
            Ext.MessageBox.show({
                title: MSG['msg_box_info'],
                msg: MSG['plz_close'],
                width: 300,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.INFO
            });
        } else {
            formPanel.show();
            actionPanel.setTitle(title);
            actionPanel.doLayout();
            actionPanel.expand(true);
        }
    },

    hideForm: function(formPanel) {
        var me = this;
        me.checkSession();

        var actionPanel = me.getActionPanel(),
            form = formPanel.getForm()

        actionPanel.collapse(Ext.Component.DIRECTION_RIGHT, true);
        form.reset();
        formPanel.hide();
        actionPanel.doLayout();
    },

    selectList: function(obj, record, index, eOpts) {
        var me = this;
        var count = obj.getCount();
        var formEdit = me.getFormEdit();

        if (count == 1) {
            me.loadFormReocrd(formEdit, record);           
        } else {   
            formEdit.getForm().reset();
        }
    },

    deselectList: function(obj, record, index, eOpts) {
        var me = this;
        var count = obj.getCount();
        var formEdit = me.getFormEdit();

        if (count == 1) {
            var deselectRecord = obj.selected.items[0];
            me.loadFormReocrd(formEdit, deselectRecord);
        } else {
            formEdit.getForm().reset();
        }
    },

    loadFormReocrd: function(form, record) {
        form.loadRecord(record);
    },

    addData: function(btn) {
        var me = this;
        var form = me.getFormAdd(),
            title = me.getFormAddTitle();

        me.showForm(form, title);
    },
   
    editData: function(btn) {
        var me = this;
        var form = me.getFormEdit(),
            title = me.getFormEditTitle(),
            record = me.getGrid().getSelectionModel().getSelection()[0];
        //var name = record.data['name'];  單取值
            // corp_name = record.data['user_organization_id'].split(',')[0],
            // department_name = record.data['user_organization_id'].split(',')[1];

        me.showForm(form, title);
        me.loadFormReocrd(form, record);

        //form.getForm().findField('name').setValue(name);  直接設定Field值
        // form.getForm().findField('corp_name').setValue(corp_name);
        // form.getForm().findField('department_name').setValue(department_name);
    },

    deleteData: function(btn) {
        var me = this;
        me.checkSession();

        var grid = me.getGrid(),
            store = grid.getStore(),
            record = grid.getSelectionModel().getSelection(),
            length = record.length,
            msg = MSG['delete_confirm_header'] + length + MSG['delete_confirm_footer'];

        Ext.MessageBox.show({
            title: MSG['msg_box_info'],
            msg: msg,
            width: 300,
            buttons: Ext.MessageBox.YESNO,
            fn: function(btn) {
                if (btn == 'yes') {
                    store.remove(record);

                    store.sync({
                        success: function() {
                            Ext.MessageBox.show({
                                title: MSG['msg_box_info'],
                                msg: MSG['delete_success'],
                                width: 300,
                                buttons: Ext.MessageBox.OK,
                                fn: function(btn) {
                                    if (btn == 'ok') {
                                        grid.afterRequest(store, null);
                                    }
                                },
                                icon: Ext.MessageBox.INFO
                            });
                        },

                        failure: function() {
                            Ext.MessageBox.show({
                                title: MSG['msg_box_info'],
                                msg: MSG['delete_fail'],
                                width: 300,
                                buttons: Ext.MessageBox.OK,
                                icon: Ext.MessageBox.ERROR
                            });
                            store.reload();
                        }
                    });
                }
            }
        });
    },

    addConfirm: function(btn) {
        var me = this;
        me.checkSession();

        var actionPanel = me.getActionPanel();
        var formPanel = me.getFormAdd();
        var grid = me.getGrid();
        var store = grid.getStore();
        var form = formPanel.getForm();

        // check value
        if (! form.isValid()) {
            return;
        }

        form.submit({
            url: me.getAddRequestUrl(),
            method: 'POST',
            submitEmptyText: false,
            success: function() {
                actionPanel.collapse(Ext.Component.DIRECTION_RIGHT, true);
                Ext.MessageBox.show({
                    title: MSG['msg_box_info'],
                    msg: MSG['add_success'],
                    width: 300,
                    buttons: Ext.MessageBox.OK,
                    fn: function(btn) {
                        if (btn == 'ok') {
                            grid.afterRequest(store, formPanel);
                        }
                    },
                    icon: Ext.MessageBox.INFO
                });
            },

            failure: function(obj, action) {
                var error_msg = null;

                store.reload();

                switch (action.failureType) {
                    case Ext.form.action.Action.CLIENT_INVALID:
                        error_msg = MSG['form_invalid'];
                        break;
                    case Ext.form.action.Action.CONNECT_FAILURE:
                        error_msg = MSG['server_connect_fail'];
                        break;
                    case Ext.form.action.Action.SERVER_INVALID:
                        error_msg = action.result.msg;
                        break;
                    }

                Ext.MessageBox.show({
                    title: MSG['msg_box_error'],
                    msg: error_msg,
                    width: 300,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        });
    },

    addCancel: function(btn) {
        var me = this;
        var form = me.getFormAdd();

        me.hideForm(form);
    },

    editConfirm: function(btn) {
        var me = this;
        me.checkSession();

        var actionPanel = me.getActionPanel();
        var formPanel = me.getFormEdit();
        var grid = me.getGrid();
        var store = grid.getStore();
        var form = formPanel.getForm();
        var record = grid.getSelectionModel().getSelection()[0];

         // check value
        if (! form.isValid()) {
            return;
        }

        form.submit({
            url: me.getEditRequestUrl(),
            method: 'POST',
            submitEmptyText: false,
            success: function() {
                actionPanel.collapse(Ext.Component.DIRECTION_RIGHT, true);

                Ext.MessageBox.show({
                    title: MSG['msg_box_info'],
                    msg: MSG['edit2_success'],
                    width: 300,
                    buttons: Ext.MessageBox.OK,
                    fn: function(btn) {
                        if (btn == 'ok') {
                            grid.afterRequest(store, formPanel);
                        }
                    },
                    icon: Ext.MessageBox.INFO
                });
            },

            failure: function(obj, action) {
                var error_msg = null;

                store.reload();

                switch (action.failureType) {
                    case Ext.form.action.Action.CLIENT_INVALID:
                        error_msg = MSG['form_invalid'];
                        break;
                    case Ext.form.action.Action.CONNECT_FAILURE:
                        error_msg = MSG['server_connect_fail'];
                        break;
                    case Ext.form.action.Action.SERVER_INVALID:
                        error_msg = action.result.msg;
                        break;
                }

                Ext.MessageBox.show({
                    title: MSG['msg_box_error'],
                    msg: error_msg,
                    width: 300,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        });
    },

    editCancel: function(btn) {
        var me = this;
        var form = me.getFormEdit();

        me.hideForm(form);
    }
});