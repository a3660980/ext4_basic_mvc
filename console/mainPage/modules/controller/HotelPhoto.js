Ext.define('Console.controller.HotelPhoto', {
    extend: 'Ext.app.Controller',

    stores: [
        'HotelPhoto.HotelPhoto'
    ],
    models: [
        'HotelPhoto.HotelPhoto'
    ],
    views: [
        'HotelPhoto.GridMaster',
        'HotelPhoto.ActionPanel',
        'HotelPhoto.FormAdd',
        'HotelPhoto.FormEdit',
        'HotelPhoto.PanelMasterDetail',
        'HotelPhoto.GridDetail',
        'HotelPhoto.TabPanel'
    ],

    refs: [
        {
             ref: 'actionPanel',
             selector: 'hotphoactionpanel'
        }, {
             ref: 'gridMaster',
             selector: 'hotphogridmaster'
        }, {
             ref: 'gridDetail',
             selector: 'hotphogriddetail'
        }, {
            ref: 'formAdd',
            selector: 'hotphoformadd'
        }, {
            ref: 'formEdit',
            selector: 'hotphoformedit'
        }
    ],

    config: {
        FormAddTitle: '新增',
        FormEditTitle: '修改',
        addHotelPhoto: './modules/source/controller/HotelPhoto/addHotelPhoto.php',
        editHotelPhoto: './modules/source/controller/HotelPhoto/editHotelPhoto.php'
    },

    init: function() {
        var me = this;

        me.control({
            'hotphogridmaster': {
                select: me.selectMasterList,
                deselect: me.deselectMasterList
            },
            'hotphogriddetail button[action=add_detail]': {
                click: me.addDetail
            },
            'hotphogriddetail button[action=edit_detail]': {
                click: me.editDetail
            },
            'hotphogriddetail button[action=delete_detail]': {
                click: me.deleteDetailData
            },
            'hotphogriddetail': {
                select: me.selectDetailList,
                deselect: me.deselectDetailList
            }, 
            'hotphoformadd button[action=form_add_confirm]': {
                click: me.addDetailConfirm
            },
            'hotphoformadd button[action=form_add_cancel]': {
                click: me.formCancel
            },
            'hotphoformedit button[action=form_edit_confirm]': {
                click: me.editDetailConfirm
            },
            'hotphoformedit button[action=form_edit_cancel]': {
                click: me.formCancel
            },       
        });
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
           
        } else {
            formPanel.show(); //顯示表單(內)
            actionPanel.setTitle(title); //設定標題(內)
            actionPanel.doLayout(); //刷新(內)
            actionPanel.expand(true); //(actionpanel)展開
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
        form.loadRecord(record);
    },


     
    selectMasterList: function(obj, record, index, eOpts) {
        var me = this;
        var count = obj.getCount();      /*返回當前的數據總數*/
        var store = me.getGridDetail().getStore();
        var form = me.getFormAdd();
        if (count == 1) {
            store.clearFilter(true);  //clearFilter:取消過濾並顯示所有數據
            store.filter([  //filter:在store內過濾資料
                {property: 'branch_id', value: record.get('branch_id')}
            ]);
            store.reload(); //類似重制的意思
            me.loadMasterFormRecord(form, record);
            
        } else {
            store.removeAll();  //removeAll:空整個store中的數據
            form.getForm().reset();
        }
    },

    deselectMasterList: function(obj, record, index, eOpts) {
        var me = this;
        var count = obj.getCount();
        var store = me.getGridDetail().getStore();
        var formAdd = me.getFormAdd();

        if (count == 1) {
            var deselectRecord = obj.selected.items[0];
            me.loadMasterFormRecord(formAdd, deselectRecord);
            store.clearFilter(true);
            store.filter('branch_id', deselectRecord.get('branch_id'));
            store.reload();
        } else {
            store.removeAll();
            formAdd.getForm().reset();
        }
    },

    selectDetailList: function(obj, record, index, eOpts) {
        var me = this;
        var count = obj.getCount();
        var formEdit = me.getFormEdit();
        if (count == 1 ) {
            me.loadDetailFormRecord(formEdit, record);
        }
        else {
            formEdit.getForm().reset();
        }
    },


    deselectDetailList: function(obj, record, index, eOpts) {
        var me = this;
        var count = obj.getCount();
        var formEdit = me.getFormEdit();
        if (count == 1 ) {
            var deselectRecord = obj.selected.items[0];
            me.loadDetailFormRecord(formEdit, deselectRecord);
        } else {
            formEdit.getForm().reset();
        }
    },

    loadDetailFormRecord: function(form, record) {
        var me = this;
        form.loadRecord(record);
    },

    addDetail: function(btn){
        var me = this;
        var form = me.getFormAdd(),
            title = me.getFormAddTitle(),
            record = me.getGridMaster().getSelectionModel().getSelection()[0];
        var branch_id = record.data['branch_id'];
        me.showForm(form, title);
        form.getForm().findField('branch_id').setValue(branch_id);
    },

    addDetailConfirm: function(btn){

        var me = this;
        me.checkSession();

        var actionPanel = me.getActionPanel();
        var formPanel = me.getFormAdd();
        var grid = me.getGridDetail();
        var store = grid.getStore();
        var form = formPanel.getForm();
        
        if (! form.isValid()) {
            return;
        }
        form.submit({
            url: me.getAddHotelPhoto(),
            method: 'POST',
            submitEmptyText : false,
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

    editDetail: function(btn) {
        var me = this;
        var form = me.getFormEdit(),
            title = me.getFormEditTitle(),
            record = me.getGridDetail().getSelectionModel().getSelection()[0];
            me.showForm(form, title);
            me.loadDetailFormRecord(form, record);
    },

    editDetailConfirm: function(btn) {
        var me = this;
        me.checkSession();
        var formPanel = me.getFormEdit();
        var form = formPanel.getForm();
        var actionPanel = me.getActionPanel();
        var grid = me.getGridDetail();
        var store = grid.getStore();
       
        // check value
        if (! form.isValid()) {
            return;
        }
        
        form.submit({
            url: me.getEditHotelPhoto(),
            method:'POST',
            submitEmptyText : false,
           success: function(fp, action) {
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

    deleteDetailData: function(grid){
        var me = this;
        me.checkSession();
        //var store = grid.getStore(),

        var grid = me.getGridDetail(),
            store = grid.getStore(),
            record = grid.getSelectionModel().getSelection(),
            length = record.length;
        var msg = MSG['delete_confirm_header'] + length + MSG['delete_confirm_footer'];

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
                                msg: 'fails',
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

    formCancel: function(btn) {
        var me = this;
        var form = btn.up('form');

        me.hideForm(form);
    }
});

