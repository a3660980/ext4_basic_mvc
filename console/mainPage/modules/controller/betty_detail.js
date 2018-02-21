Ext.define('Console.controller.betty_detail', {
    extend: 'Ext.app.Controller',
// 所有元件控制的function
    stores: [
        'betty.ServiceMaster_test',
        'betty.ServiceDetail_test',
        'betty.ServiceContract_status'
    ],
    models: [
        'betty.Service_testdetail',
        'betty.Service_testmaster'
    ],
    views: [
        'betty_test.ActionPanel',
        'betty_test.formadd_detail',
        'betty_test.formadd_master',
        'betty_test.formedit_detail',
        'betty_test.formedit_master',
        'betty_test.GridMaster',
        'betty_test.GridDetail',
        'betty_test.master_plus_detail',
        'betty_test.TabPanel_Detail'
    ],

    refs: [//Controller會使用到的view
        {
            ref: 'actionPanel',
            selector: 'bettyactionpanel2'
        }, {
            ref: 'DetailGrid',
            selector: 'bettygriddetail'
        }, {
            ref: 'formAdd',
            selector: 'bettyformadd1'
        }, {
            ref: 'formEdit',
            selector: 'bettyformedit1'
        }, {
            ref: 'formAdd2',
            selector: 'bettyformadd2'
        }, {
            ref:'formEdit2',
            selector: 'bettyformedit2'
        },  {
            ref: 'GridMaster',
            selector: 'bettygridmaster2'
        }
    ],

    config: {//把會一直重複用到的檔案匯入
        formAddTitle: '新增',
        formEditTitle: '編輯',
        addRequestUrl_2: './modules/source/controller/betty_test_detail/adddetail_test.php',
        editRequestUrl_2: './modules/source/controller/betty_test_detail/editdetail_test.php',
        addRequestUrl: './modules/source/controller/betty_test_master/addmaster_test.php',
        editRequestUrl: './modules/source/controller/betty_test_master/editmaster_test.php'
    },

    init: function() {
        var me = this;

        me.control({
            'bettygridmaster2': {
                select: me.selectMasterList,//在grid.js中定義
                deselect: me.deselectMasterList
            },
            'bettygriddetail': {
                select: me.selectDetailList,
                deselect: me.deselectDetailList
            }, 
            'bettygridmaster2 button[action=add_user]': {
                click: me.addData
            },
            'bettygridmaster2 button[action=edit_user]': {
                click: me.editData
            },
            'bettygridmaster2 button[action=delete_user]': {
                click: me.deleteData_master
            },
            'bettygriddetail button[action=add_user]': {
                click: me.addData2
            },
            'bettygriddetail button[action=edit_user]': {
                click: me.editData2
            },
            'bettygriddetail button[action=delete_user]': {
                click: me.deleteData
            },
            'bettyformadd2 button[action=form_add_confirm]': {
                click: me.addServiceCategoryConfirm
            },
            'bettyformadd2 button[action=form_add_cancel]': {
                click: me.FormCancel
            },
            'bettyformedit2 button[action=form_edit_confirm]': {
                click: me.editServiceCategoryConfirm
            },
            'bettyformedit2 button[action=form_edit_cancel]': {
                click: me.FormCancel
            },
            'bettyformadd1 button[action=form_add_confirm]': {
                click: me.addConfirm
            },
            'bettyformadd1 button[action=form_add_cancel]': {
                click: me.FormCancel
            },
            'bettyformedit1 button[action=form_edit_confirm]': {
                click: me.editConfirm
            },
            'bettyformedit1 button[action=form_edit_cancel]': {
                click: me.FormCancel
            }
        });
    },

    checkSession: function() {//檢查session是否還存在
        var me = this;
        var isSessionExist = me.getController('Viewport').checkUserSessionExist();
        //checkUserSessionExist新增tab
        if (! isSessionExist) {
            return;
        }
    },

    showForm: function(formPanel, title) {
        var me = this;
        me.checkSession();

        formPanel.getForm().reset();//getForm取得form的資料;開啟表單

        var actionPanel = me.getActionPanel(),
            isCollapse = actionPanel.getCollapsed();//折疊,輸出(actionpanel)
            isHidden = formPanel.isHidden();//顯示表格(新增或修改的資料)
            
        if (isHidden && ! isCollapse) {//顯示又不摺疊的話
            Ext.MessageBox.show({
                title: MSG['msg_box_info'],//提示
                msg: MSG['plz_close'],//請先關閉其他視窗再進行動作
                width: 300,
                buttons: Ext.MessageBox.OK,//ok按鈕
                icon: Ext.MessageBox.INFO//按鈕符號
            });
        } else if (! isHidden &&  !isCollapse) {
            actionPanel.collapse(Ext.Component.DIRECTION_RIGHT, true);//摺疊方向右邊,true為動態
            formPanel.hide();//隱藏
            actionPanel.doLayout();// 自動佈局，調整框架大小
        } else {
            formPanel.show();
            actionPanel.setTitle(title);//設置面板標題
            actionPanel.doLayout();
            // 自動佈局，調整框架大小
            actionPanel.expand(true);
            // 框架跳出動作 
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
    loadMasterFormRecord: function(form, record) {
        var me = this;

        form.loadRecord(record);//將模型內的字串對應到表單字串(內)
    },

    selectMasterList: function(obj, record, index, eOpts) {
        var me = this;
        var count = obj.getCount();//選取幾筆資料      
        var store = me.getDetailGrid().getStore();//取得detail的store
        //console.log(store)

        if (count == 1) {              
            store.clearFilter(true); //clearFilter:取消過濾並顯示所有數據 
            store.filter([//filter:在store內過濾資料
                {property: 'brand_id', value: record.get('brand_id')}//用brand_id找資料
            ]);
            store.reload(); //重置store
        } else {
            store.removeAll();  //讓store中的數據為空
        }
    },

    deselectMasterList: function(obj, record, index, eOpts) {
        var me = this;
        var count = obj.getCount();
        var store = me.getDetailGrid().getStore();
        var formEdit = me.getFormEdit();

        if (count == 1) {
            var deselectRecord = obj.selected.items[0];
            store.clearFilter(true); //clearFilter:取消過濾並顯示所有數據 
            store.filter([//filter:在store內過濾資料
                {property: 'brand_id', value: deselectRecord.get('brand_id')}
            ]);
            store.reload();
        } else {
            store.removeAll();
        }
    },
    selectDetailList: function(obj, record, index, eOpts) {
        var me = this;
        var count = obj.getCount();//選取幾筆資料
        var formEdit = me.getFormEdit2();

        if (count == 1) {
            me.loadDetailFormRecord(formEdit, record);  //取下紀錄
        } else {
            formEdit.getForm().reset();

        }
    },
    deselectDetailList: function(obj, record, index, eOpts) {
        var me = this;
        var count = obj.getCount();
        var formEdit = me.getFormEdit2();

        if (count == 1) {
            var deselectRecord = obj.selected.items[0];
            me.loadDetailFormRecord(formEdit, deselectRecord);
        } else {
            formEdit.getForm().reset();
        }
    },

    loadDetailFormRecord: function(form, record) {
        form.loadRecord(record);
    },

    addData: function(btn) {
        var me = this;
        var form = me.getFormAdd(),
            title = me.getFormAddTitle();//新增用戶資料

        me.showForm(form, title);
    },

    addData2: function(btn) {
        var me = this;
        var form = me.getFormAdd2(),
            title = me.getFormAddTitle();
            store = me.getDetailGrid().getStore();
        var record = me.getGridMaster().getSelectionModel().getSelection()[0];//選的那筆資料
        var brand_id = record.data['brand_id'];

        me.showForm(form, title);
        form.getForm().findField('brand_id').setValue(brand_id);
    },
    addServiceCategoryConfirm: function(btn){
        var me = this;
        me.checkSession();

        var actionPanel = me.getActionPanel();
        var formPanel = me.getFormAdd2();
        var grid = me.getDetailGrid();
        var store = grid.getStore();
        var form = formPanel.getForm();
        var record = me.getGridMaster().getSelectionModel().getSelection()[0];
        // check value

        form.submit({
            url: me.getAddRequestUrl_2(),
            method: 'POST',
            success: function() {//回應成功
                actionPanel.collapse(Ext.Component.DIRECTION_RIGHT, true);
                // 視窗動作
                Ext.MessageBox.show({
                    title: MSG['msg_box_info'],
                    msg: MSG['add_success'],//新增成功
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

                store.reload();//重新載入

                switch (action.failureType) {
                    case Ext.form.action.Action.CLIENT_INVALID:
                        error_msg = MSG['form_invalid'];//填入欄位資料有誤
                        break;
                    case Ext.form.action.Action.CONNECT_FAILURE:
                        error_msg = MSG['server_connect_fail'];//連接伺服器失敗！
                        break;
                    case Ext.form.action.Action.SERVER_INVALID:
                        error_msg = action.result.msg;
                        break;
                }

                Ext.MessageBox.show({
                    title: MSG['msg_box_error'],//錯誤
                    msg: error_msg,
                    width: 300,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        });

    },
    addConfirm: function(btn) {
        var me = this;
        me.checkSession();

        var actionPanel = me.getActionPanel();
        var formPanel = me.getFormAdd();
        var grid = me.getGridMaster();
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
                            grid.afterRequest(store, formPanel);//.afterRequest可調回函數請求完成後清理
                        }
                    },
                    icon: Ext.MessageBox.INFO
                });
            },

            failure: function(obj, action) {
                var error_msg = null;

                store.reload();//重置

                switch (action.failureType) {//錯誤判斷
                    case Ext.form.action.Action.CLIENT_INVALID://前端錯誤
                        error_msg = MSG['form_invalid'];//填入欄位資料有誤！
                        break;
                    case Ext.form.action.Action.CONNECT_FAILURE://從服務端返回錯誤
                        error_msg = MSG['server_connect_fail'];//連接伺服器失敗！
                        break;
                    case Ext.form.action.Action.SERVER_INVALID://服務端處理失敗，result success為failure
                        error_msg = action.result.msg;
                        break;
                }

                Ext.MessageBox.show({
                    title: MSG['msg_box_error'],//錯誤
                    msg: error_msg,
                    width: 300,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        });
    },
    
    editData: function(btn) {
        var me = this;
        var form = me.getFormEdit(),
            title = me.getFormEditTitle(),
            record = me.getGridMaster().getSelectionModel().getSelection()[0];//選的第一筆資料   

        me.showForm(form, title);
        me.loadFormReocrd(form, record);
    },
    loadFormReocrd: function(form, record) {
        form.loadRecord(record);
    },
    editData2: function(btn) {
        var me = this;
        var form = me.getFormEdit2(),
            title = me.getFormEditTitle(),
            record = me.getDetailGrid().getSelectionModel().getSelection()[0];

        me.showForm(form, title);
        // me.loadFormReocrd(form, record);
        me.loadDetailFormRecord(form, record);
    },

    editConfirm: function(btn) {
        var me = this;
        me.checkSession();

        var actionPanel = me.getActionPanel();
        var formPanel = me.getFormEdit();
        var grid = me.getGridMaster();
        var store = grid.getStore();
        var form = formPanel.getForm();
        var record = grid.getSelectionModel().getSelection()[0];

        // check value
        if (! form.isValid()) {//驗證屬性
            return;
        }

        form.submit({
            url: me.getEditRequestUrl(),
            method: 'POST',
            submitEmptyText: false,//false:EmptyText不會在form提交時被送出去
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
    editServiceCategoryConfirm: function(btn) {
        var me = this;
        me.checkSession();

        var actionPanel = me.getActionPanel();
        var formPanel = me.getFormEdit2();
        var gridDetail = me.getDetailGrid();
        var storeDetail = gridDetail.getStore();
        var form = formPanel.getForm();

        form.submit({
            url: me.getEditRequestUrl_2(),
            method: 'POST',
            success: function(fp, action) {
                actionPanel.collapse(Ext.Component.DIRECTION_RIGHT, true);

                Ext.MessageBox.show({
                    title: MSG['msg_box_info'],
                    msg: MSG['edit2_success'],
                    width: 300,
                    buttons: Ext.MessageBox.OK,
                    fn: function(btn) {
                        if (btn == 'ok') {
                            gridDetail.afterRequest(storeDetail, formPanel);
                        }
                    },
                    icon: Ext.MessageBox.INFO
                });
            },

            failure: function(obj, response) {
                Ext.MessageBox.show({
                    title: MSG['msg_box_error'],
                    msg: response.result.msg,
                    width: 300,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR,
                    fn: function(btn) {
                        if(btn == 'ok') {
                            store.reload();
                        }
                    }
                });
            }
        });
    },
    deleteData_master: function(btn) {
        var me = this;
        me.checkSession();

        var grid = me.getGridMaster(),
            store = grid.getStore(),
            record = grid.getSelectionModel().getSelection(),
            length = record.length,
            msg = MSG['delete_confirm_header'] + length + MSG['delete_confirm_footer'];

        Ext.MessageBox.show({
            title: MSG['msg_box_info'],
            msg: msg,
            width: 300,
            icon: Ext.MessageBox.INFO,
            buttons: Ext.MessageBox.YESNO,
            fn: function(btn) {
                if (btn == 'yes') {
                    store.remove(record);

                    store.sync({
                        success: function() {
                            Ext.MessageBox.show({
                                msg: MSG['delete_success'],
                                title: MSG['msg_box_info'],
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

                        failure: function(batch,options) {
                            if(batch.proxy.getReader().jsonData=='DeteleFails'){
                                Ext.MessageBox.show({
                                title: MSG['msg_box_info'],
                                msg: MSG['delete_fail_t'],
                                width: 300,
                                buttons: Ext.MessageBox.OK,
                                icon: Ext.MessageBox.ERROR
                            });

                            }else{
                                Ext.MessageBox.show({
                                title: MSG['msg_box_info'],
                                msg: MSG['delete_fail'],
                                width: 300,
                                buttons: Ext.MessageBox.OK,
                                icon: Ext.MessageBox.ERROR
                            });

                            }
                            
                            store.reload();
                        }
                    });
                }
            }
        });
    },
    deleteData: function(btn) {
        var me = this;
        me.checkSession();

        var grid = me.getDetailGrid(),
            store = grid.getStore(),
            record = grid.getSelectionModel().getSelection(),
            length = record.length,
            msg = MSG['delete_confirm_header'] + length + MSG['delete_confirm_footer'];

        Ext.MessageBox.show({
            title: MSG['msg_box_info'],
            msg: msg,
            width: 300,
            icon: Ext.MessageBox.INFO,
            buttons: Ext.MessageBox.YESNO,
            fn: function(btn) {
                if (btn == 'yes') {
                    store.remove(record);

                    store.sync({
                        success: function() {
                            Ext.MessageBox.show({
                                msg: MSG['delete_success'],
                                title: MSG['msg_box_info'],
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


    FormCancel: function(btn) {
        var me = this;
        var form = btn.up('form');

        me.hideForm(form);
    }
});