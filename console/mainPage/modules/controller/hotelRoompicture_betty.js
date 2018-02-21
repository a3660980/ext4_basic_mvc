Ext.define('Console.controller.hotelRoompicture_betty', {
    extend: 'Ext.app.Controller',
// 所有元件控制的function
    stores: [
        'betty.Service_Roompicture',
        'betty.Service_hotelbranch',
        'betty.Service_RoomName'
    ],
    models: [
        'betty.RoomPicture',
        'betty.hotelHomepagebranch',
        'betty.hotelRoom',
        'betty.RoomCombo'
    ],
    views: [
        'bettyRoompicture.ActionPanelDetail',
        'bettyRoompicture.FormAddDetail',
        'bettyRoompicture.FormEditDetail',
        'bettyRoompicture.GridMaster',
        'bettyRoompicture.GridDetail',
        'bettyRoompicture.master_plus_detail',
        'bettyRoompicture.TabPanelDetail'
    ],

    refs: [//Controller會使用到的view
        {
            ref: 'actionPanel',
            selector: 'brpactionpaneldetail'
        }, {
            ref: 'DetailGrid',
            selector: 'brpgriddetail'
        }, {
            ref: 'formAdd',
            selector: 'brpformadd'
        }, {
            ref: 'formEdit',
            selector: 'brpformedit'
        },  {
            ref: 'GridMaster',
            selector: 'brpgridmaster'
        }, {
            ref: 'combobox_room',
            selector: 'brpformadd #combobox_room'
        }
    ],

    config: {//把會一直重複用到的檔案匯入
        formAddTitle: '新增',
        formEditTitle: '編輯',
        addRequestUrl: './modules/source/controller/betty_RoomPicture/add_roomPicture.php',
        editRequestUrl: './modules/source/controller/betty_RoomPicture/edit_roomPicture.php'
    },

    init: function() {
        var me = this;

        me.control({
            'brpgridmaster': {
                select: me.selectMasterList,//在grid.js中定義
                deselect: me.deselectMasterList
            },
            'brpgriddetail': {
                select: me.selectDetailList,
                deselect: me.deselectDetailList
            }, 
            'brpgriddetail button[action=add_user]': {
                click: me.addData
            },
            'brpgriddetail button[action=edit_user]': {
                click: me.editData
            },
            'brpgriddetail button[action=delete_user]': {
                click: me.deleteData
            },
            'brpformadd button[action=form_add_confirm]': {
                click: me.addConfirm
            },
            'brpformadd button[action=form_add_cancel]': {
                click: me.FormCancel
            },
            'brpformedit button[action=form_edit_confirm]': {
                click: me.editConfirm
            },
            'brpformedit button[action=form_edit_cancel]': {
                click: me.FormCancel
            },'brpformadd combobox[action=RoomNameExpand]': {
                expand: me.RoomNameExpand
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
                {property: 'branch_id', value: record.get('branch_id')}//用brand_id找資料
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
                {property: 'branch_id', value: deselectRecord.get('branch_id')}
            ]);
            store.reload();
        } else {
            store.removeAll();
        }
    },
    selectDetailList: function(obj, record, index, eOpts) {
        var me = this;
        var count = obj.getCount();//選取幾筆資料
        var formEdit = me.getFormEdit();

        if (count == 1) {
            me.loadDetailFormRecord(formEdit, record);  //取下紀錄
        } else {
            formEdit.getForm().reset();

        }
    },
    deselectDetailList: function(obj, record, index, eOpts) {
        var me = this;
        var count = obj.getCount();
        var formEdit = me.getFormEdit();

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
            title = me.getFormAddTitle();
            store = me.getDetailGrid().getStore();
        var record = me.getGridMaster().getSelectionModel().getSelection()[0];//選的那筆資料
        var branch_id = record.data['branch_id'];

        me.showForm(form, title);
        form.getForm().findField('branch_id').setValue(branch_id);
    },

    addConfirm: function(btn) {
       var me = this;
        me.checkSession();

        var actionPanel = me.getActionPanel();
        var formPanel = me.getFormAdd();
        var grid = me.getDetailGrid();
        var store = grid.getStore();
        var form = formPanel.getForm();
        var record = me.getGridMaster().getSelectionModel().getSelection()[0];
        // check value

        form.submit({
            url: me.getAddRequestUrl(),
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
    
    editData: function(btn) {
        var me = this;
        var form = me.getFormEdit(),
            title = me.getFormEditTitle(),
            record = me.getDetailGrid().getSelectionModel().getSelection()[0];

        me.showForm(form, title);
        // me.loadFormReocrd(form, record);
        me.loadDetailFormRecord(form, record);
    },
    loadFormReocrd: function(form, record) {
        form.loadRecord(record);
    },

    editConfirm: function(btn) {
       var me = this;
        me.checkSession();

        var actionPanel = me.getActionPanel();
        var formPanel = me.getFormEdit();
        var gridDetail = me.getDetailGrid();
        var storeDetail = gridDetail.getStore();
        var form = formPanel.getForm();

        form.submit({
            url: me.getEditRequestUrl(),
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
    },
    //找房型
    RoomNameExpand( field, eOpts ) {
       var me = this;
       var combobox_room=me.getCombobox_room();
       var store=field.getStore();
       var error_msg = "沒有房型可以新增";
       //console.log(store);
       var record = me.getGridMaster().getSelectionModel().getSelection()[0];//選取的那筆資料
       store.clearFilter(true);
       store.filter([//filter:在store內過濾資料
        {property: 'branch_id', value: record.data['branch_id']},//用branch_id找資料
        ]);
        if((store.data.length)==0){
        Ext.MessageBox.show({
        title: MSG['msg_box_info'],//提示
        msg: error_msg,
        width: 300,
        buttons: Ext.MessageBox.OK,
        icon: Ext.MessageBox.ERROR
        });
    }

        store.reload(); //重置store

        //console.log(store);
    }
});