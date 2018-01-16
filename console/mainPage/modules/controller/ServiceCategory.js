Ext.define('Console.controller.ServiceCategory', {
    extend: 'Ext.app.Controller',

    stores: [
        'ServiceCategory.ServiceCategory',
        'ServiceInfo.ServiceInfo',
        'ServiceCategory.ServiceCategoryLang'

    ],
    models: [
        'ServiceCategory.ServiceCategory',
        'ServiceInfo.ServiceInfo'
    ],
    views: [
        'ServiceCategory.TabPanel',
        'ServiceCategory.PanelMasterDetail',
        'ServiceCategory.GridDetail',
        'ServiceCategory.GridMaster',
        'ServiceCategory.FormAddDetail',
        'ServiceCategory.ActionPanel',
        'ServiceCategory.FormEditDetail'
    ],

    refs: [
        {
             ref: 'actionPanel',
             selector: 'scyactionpanel'
        }, {
             ref: 'gridMaster',
             selector: 'scygridmaster'
        }, {
             ref: 'gridDetail',
             selector: 'scygriddetail'
        }, {
            ref: 'formAddDetail',
            selector: 'scyformadddetail'
        }, {
            ref: 'formEditDetail',
            selector: 'scyformeditdetail'
        }, {
        //     ref: 'formEditMasterDisplay',
        //     selector: 'scyformeditdetail displayfield'
        // }, {
        //     ref: 'formEditMasterImage',
        //     selector: 'scyformeditdetail #service_icon'
        // }, {
            ref: 'formEditDetailDisplay',
            selector: 'scyformeditdetail displayfield'
        }, {
            ref: 'formEditDetailImage',
            selector: 'scyformeditdetail #category_icon'
         }
        
    ],

    config: {
        FormAddTitle: '新增功能選項',
        FormEditTitle: '修改功能選項',
        addServiceCategoryUrl: './modules/source/controller/ServiceCategory/addServiceCategory.php',
        editServiceCategoryUrl: './modules/source/controller/ServiceCategory/editServiceCategory.php'
    },

    init: function() {
        var me = this;

        me.control({
            'scygridmaster': {
                select: me.selectMasterList,
                deselect: me.deselectMasterList
            },
            'scygriddetail': {
                select: me.selectDetailList,
                deselect: me.deselectDetailList
            },            
            'scygriddetail button[action=add_service_category]': {
                click: me.addDetail
            },
            'scygriddetail button[action=edit_service_category]': {
                click: me.editDetail
            },
            'scygriddetail button[action=delete_service_category]': {
                click: me.deleteServiceCategory
            },
            'scyformadddetail button[action=form_add_confirm]': {
                click: me.addServiceCategoryConfirm
            },
            'scyformadddetail button[action=form_add_cancel]': {
                click: me.formCancel
            },
            //'scyformedit button[action=form_edit_confirm]': {
                'scyformeditdetail button[action=form_edit_confirm]': {
                
                click: me.editServiceCategoryConfirm
            },
            //'scyformedit button[action=form_edit_cancel]': {
                'scyformeditdetail button[action=form_edit_cancel]': {
                
                click: me.formCancel
            }
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
            formPanel.show();
            formPanel.body.dom.scrollTop = 0;
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
   loadMasterFormRecord: function(form, record) {
        var me = this;
        // var image = me.getFormEditMasterImage();
        // var display = me.getFormEditMasterDisplay();
        // var dcTime = '?' + (new Date()).getTime();
        // var category_icon = record.get('category_icon') + dcTime;
        // var category_url = Ext.decode(record.get('category_url'));
        // if (category_icon == '' || category_icon == null){
        //     display.setRawValue('沒有圖片');
        // } else {
        //     display.setRawValue(null);
        // }

        form.loadRecord(record);
        // image.setSrc(category_icon);
    },


     
    selectMasterList: function(obj, record, index, eOpts) {
        var me = this;
        var count = obj.getCount();      /*返回當前的數據總數*/
        var store = me.getGridDetail().getStore();
        var formEdit = me.getFormEditDetail(); 

        if (count == 1) {              /*再說按master，detail會有資料，如果沒案或案2個以上，就沒有東西*/
            store.clearFilter(true);  //clearFilter:取消過濾並顯示所有數據
            store.filter([  //filter:在store內過濾資料
                {property: 'service_id', value: record.get('service_id')}
            ]);
            store.reload(); //類似重制的意思
            // me.loadMasterFormRecord(formEdit, record);
        } else {
            store.removeAll();  //removeAll:空整個store中的數據
        }
    },

    deselectMasterList: function(obj, record, index, eOpts) {
        var me = this;
        var count = obj.getCount();
        var store = me.getGridDetail().getStore();
        var formEdit = me.getFormEditDetail();

        if (count == 1) {
            var deselectRecord = obj.selected.items[0];
            me.loadMasterFormRecord(formEdit, deselectRecord);

            store.clearFilter(true);
            store.filter('service_id', deselectRecord.get('service_id'));

            store.reload();
        } else {
            store.removeAll();
        }
    },

    selectDetailList: function(obj, record, index, eOpts) {
        var me = this;
        var count = obj.getCount();
        var formEdit = me.getFormEditDetail();

        if (count == 1) {
            me.loadDetailFormRecord(formEdit, record);  //取下紀錄
        } else {
            formEdit.getForm().reset();

        }
    },


    deselectDetailList: function(obj, record, index, eOpts) {
        var me = this;
        var count = obj.getCount();
        var formEdit = me.getFormEditDetail();

        if (count == 1) {
            var deselectRecord = obj.selected.items[0];
            me.loadDetailFormRecord(formEdit, deselectRecord);
        } else {
            formEdit.getForm().reset();
        }
    },

   loadDetailFormRecord: function(form, record) {
        var me = this;
        var image = me.getFormEditDetailImage();
        var display = me.getFormEditDetailDisplay();
        var dcTime = '?' + (new Date()).getTime();
        var category_icon = record.get('category_icon') + dcTime;
        var category_url = Ext.decode(record.get('category_url'));
        if (category_icon == '' || category_icon == null){
            display.setRawValue('沒有圖片');
        } else {
            display.setRawValue(null);
        }

        form.loadRecord(record);
        image.setSrc(category_icon);
    },

    addDetail: function(btn){
        var me = this;
        var form = me.getFormAddDetail(),
            title = me.getFormAddTitle(),
            store = me.getGridDetail().getStore();

        me.showForm(form, title);
    },


    addServiceCategoryConfirm: function(btn){
        var me = this;
        me.checkSession();

        var actionPanel = me.getActionPanel();
        var formPanel = me.getFormAddDetail();
        var grid = me.getGridDetail();
        var store = grid.getStore();
        var form = formPanel.getForm();
        var record = me.getGridMaster().getSelectionModel().getSelection()[0];
        //getGridMaster() getGridDetail() 傻傻分不清呀...
        // check value
        if (! form.isValid()) {
            return;
        }
        form.findField('service_id').setValue(record.data['service_id']);

        form.submit({
            url: me.getAddServiceCategoryUrl(),
            method: 'POST',
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
        var form = me.getFormEditDetail(),
            title = me.getFormEditTitle(),
            record = me.getGridDetail().getSelectionModel().getSelection()[0];

        me.showForm(form, title);
        //me.loadFormReocrd(form, record);
        me.loadDetailFormRecord(form, record);
    },

    editServiceCategoryConfirm: function(btn) {
        var me = this;
        me.checkSession();

        var actionPanel = me.getActionPanel();
        var formPanel = me.getFormEditDetail();
        var gridDetail = me.getGridDetail();
        var storeDetail = gridDetail.getStore();
        var form = formPanel.getForm();

        // check value
        if (! form.isValid()) {
            return;
        }

        form.submit({
            url: me.getEditServiceCategoryUrl(),
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
   // deleteServiceCategoryDetail: function(btn){
   //      var me = this;
   //      me.checkSession();

   //      var grid = me.getGridDetail();
   //      this.deleteServiceCategoryData(grid);
   //  },
   
      deleteServiceCategory: function(grid){
        var me = this;
        me.checkSession();
        //var store = grid.getStore(),
       var grid = me.getGridDetail(),
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

    formCancel: function(btn) {
        var me = this;
        var form = btn.up('form');

        me.hideForm(form);
    }
});

