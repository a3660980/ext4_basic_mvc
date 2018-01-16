Ext.define('Console.controller.Dina', {
    extend: 'Ext.app.Controller',

    stores: [
        'dina.Service_dina',
       
    ],
    models: [
        'dina.Service_dina',
       
    ],
    views: [
        'dina.TabPanel_dina',
        'dina.GridMaster_dina',
        'dina.ActionPanel_dina',
        'dina.FormAdd_dina',
        'dina.FormEdit_dina',
            ],

    refs: [
        {
            ref: 'actionPanel',
            selector: 'dinactionpanel'
        }, {
            ref: 'grid',
            selector: 'dingridmaster'
        }, {
            ref: 'formAdd',
            selector: 'dinformadd'
        }, {
            ref: 'formEdit',
            selector: 'dinformedit'
        }
    ],

    config: {
        formAddTitle: '新增用戶資料',
        formEditTitle: '修改用戶資料',
        addRequestUrl: './modules/source/controller/dina/addService_dina.php',
        editRequestUrl: './modules/source/controller/dina/editService_dina.php'
    },

    init: function() {
        var me = this;

        me.control({
            'dingridmaster': {
                select: me.selectMasterList1,
                deselect: me.deselectMasterList1
            },
            'dingridmaster button[action=add_user]': {
                click: me.addData
            },
            'dingridmaster button[action=edit_user]': {
                click: me.editData
            },
            'dingridmaster button[action=delete_user]': {
                click: me.deleteData
            },
            'dinformadd button[action=form_confirm]': {
                click: me.addConfirm
            },
            'dinformadd button[action=form_cancel]': {
                click: me.addCancel
            },
            'dinformedit button[action=form_confirm]': {
                click: me.editConfirm
            },
            'dinformedit button[action=form_cancel]': {
                click: me.editCancel
            /*},
            'dingridmaster button[action=p_total]': {
                click: me.p_total*/
            }
        });
    },


    

   /* p_total:function(btn){
        var me = this;
        
        Ext.MessageBox.show({
            title:MSG['p_total'],
            msg:'55555',
            width:300
        })*/
        
         /*var record11 = me.getGrid().getSelectionModel().getSelection().length;

            Ext.MessageBox.show({
            msg:record11
        });

        
        var record=me.getGrid().getSelectionModel().getSelection(),
            total=record.data['p_cost'],
            store=grid.getStore(),
            msg=MSG['p_total'];
        

    },*/

    checkSession: function() {  //判斷是否過期
        var me = this;
        var isSessionExist = me.getController('Viewport').checkUserSessionExist();
        //checkUserSessionExist新增tab
        if (! isSessionExist) {
            return;
        }
    },

    showForm: function(formPanel, title) { //顯示表格,新增修改用
        var me = this;
        me.checkSession(); 

        var actionPanel = me.getActionPanel(), 
            isCollapse = actionPanel.getCollapsed(); //折疊,輸出(actionpanel)
            isHidden = formPanel.isHidden(); //顯示表格(新增或修改的資料)
            

        formPanel.getForm().reset(); //開啟表格

        if (isHidden && ! isCollapse) { //顯示又不折疊(已經顯示actionpanel，又將原本隱藏的不隱藏)
            Ext.MessageBox.show({ //顯示提示
                title: MSG['msg_box_info'], //標題為:提示
                msg: MSG['plz_close'], //內容:請先關閉其它視窗再動作
                width: 300,
                buttons: Ext.MessageBox.OK, //按鈕確認
                icon: Ext.MessageBox.INFO //圖標連接
            });
        } else if (! isHidden && ! isCollapse) { //不顯示也不摺疊,不動作
             console.log('isCollapse:',isCollapse);
            console.log('isHidden:',isHidden);
        } else { //顯示或折疊其中之一
            formPanel.show(); //顯示表單(內)
            actionPanel.setTitle(title); //設定標題(內)
            actionPanel.doLayout(); //刷新(內)
            actionPanel.expand(true); //(actionpanel)展開
           

            console.log('isCollapse:',isCollapse);
            console.log('isHidden:',isHidden);

        }
    },

    hideForm: function(formPanel) {
        var me = this;
        me.checkSession();

        var actionPanel = me.getActionPanel(),
            form = formPanel.getForm() //開啟表單(內)

        actionPanel.collapse(Ext.Component.DIRECTION_RIGHT, true);//擴充 不隱藏新增列
        form.reset(); //資料清除
        formPanel.hide(); //隱藏
        actionPanel.doLayout(); //輸出
    },

    selectMasterList1: function(obj, record, index, eOpts) {
        var me = this;
        var count = obj.getCount(); //返回數量
        var formEdit = me.getFormEdit();

        if (count == 1) {
            me.loadFormReocrd(formEdit, record); //載入loadFormReocrd
        } else {
            formEdit.getForm().reset();
        }
    },

    deselectMasterList1: function(obj, record, index, eOpts) {
        var me = this;
        var count = obj.getCount();
        var formEdit = me.getFormEdit();

        if (count == 1) {
            var deselectRecord = obj.selected.items[0]; 
            //.selected=>override=>grid=>selecteditem
            me.loadFormReocrd(formEdit, deselectRecord);
        } else {
            formEdit.getForm().reset(); //編輯表單刷新
        }
    },

    loadFormReocrd: function(form, record) {
        form.loadRecord(record); //將模型內的字串對應到表單字串(內)
    },

    addData: function(btn) { //新增資料做
        var me = this;
        var form = me.getFormAdd(),
            title = me.getFormAddTitle();

        me.showForm(form, title);
    },

    editData: function(btn) { //修改資料
        var me = this;
        var form = me.getFormEdit(),
            title = me.getFormEditTitle(),
            record = me.getGrid().getSelectionModel().getSelection()[0]; //選擇模型找到陣列中的數字
        var name = record.data['p_name']; //對象
        
        me.showForm(form, title);
        me.loadFormReocrd(form, record);
        form.getForm().findField('p_name').setValue(name);
    },

    deleteData: function(btn) {
        var me = this;
        me.checkSession();

        var grid = me.getGrid(),
            store = grid.getStore(),
            record = grid.getSelectionModel().getSelection(),
            length = record.length, 
            msg = MSG['delete_confirm_header'] + length + MSG['delete_confirm_footer'];

            //顯示文字:您確定要刪除這 ? 筆資料嗎

          
        Ext.MessageBox.show({
            title: MSG['msg_box_info'], //提示
            msg: msg,
            width: 300,
            buttons: Ext.MessageBox.YESNO, //.YESNO顯示yes no
            fn: function(btn) { //fn:回傳btn的值
                //console.log('555',btn);
                if (btn == 'yes') {
                    store.remove(record); //將store中資料移除

                    store.sync({  //sync同步
                        success: function() { //成功
                            Ext.MessageBox.show({
                                title: MSG['msg_box_info'], //標題:提示
                                msg: MSG['delete_success'], //刪除成功
                                width: 300,
                                buttons: Ext.MessageBox.OK,
                                fn: function(btn) {
                                    if (btn == 'ok') {
                                        grid.afterRequest(store, null);
                            // .afterRequest可調回函數請求完成後清理
                                    }
                                },

                                //icon: Ext.MessageBox.INFO 圖標
                            });
                        },

                        failure: function() { //失敗
                            Ext.MessageBox.show({
                                title: MSG['msg_box_info'], //提示
                                msg: MSG['delete_fail'], //刪除失敗
                                width: 300,
                                buttons: Ext.MessageBox.OK,
                                //icon: Ext.MessageBox.ERROR
                            });
                            store.reload(); //重新加載
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
        if (! form.isValid()) { //檢查傳遞的date參數
            return;
        }

        form.submit({
            url: me.getAddRequestUrl(),
            method: 'POST',
            submitEmptyText: false,
            success: function() {
                actionPanel.collapse(Ext.Component.DIRECTION_RIGHT, true);

                Ext.MessageBox.show({
                    title: MSG['msg_box_info'], //標題:提示
                    msg: MSG['add_success'], //新增成功
                    width: 300,
                    buttons: Ext.MessageBox.OK, 
                    fn: function(btn) {
                        if (btn == 'ok') {
                            grid.afterRequest(store, formPanel); 
                            // .afterRequest可調回函數請求完成後清理(請求成功)
                        }
                    },
                    //icon: Ext.MessageBox.INFO
                });
            },

            failure: function(obj, action) {
                var error_msg = null;

                store.reload(); //重新載入

                switch (action.failureType) {
                    case Ext.form.action.Action.CLIENT_INVALID: 
                    //CLIENT_INVALID當驗證資料失敗時返回失敗類型(內)
                        error_msg = MSG['form_invalid']; //顯示:填入欄位資料有誤
                        break;
                    case Ext.form.action.Action.CONNECT_FAILURE:
                    //CONNECT_FAILURE伺服器發送請求時發生通信錯誤時返回失敗類型(內)
                        error_msg = MSG['server_connect_fail']; //顯示:連接伺服器失敗！
                        break;
                    case Ext.form.action.Action.SERVER_INVALID:
                    //當伺服器端處理失敗時返回失敗類型(內)
                        error_msg = action.result.msg;
                        break;
                    }

                Ext.MessageBox.show({
                    title: MSG['msg_box_error'],
                    msg: error_msg,
                    width: 300,
                    buttons: Ext.MessageBox.OK,
                    //icon: Ext.MessageBox.ERROR
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
                    //icon: Ext.MessageBox.INFO
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
                    //icon: Ext.MessageBox.ERROR
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