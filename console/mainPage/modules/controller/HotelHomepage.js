Ext.define('Console.controller.HotelHomepage', {
    extend: 'Ext.app.Controller',

    stores: [
        'HotelHomepage.HomeSort',
        'HotelHomepage.UserI18n',
        'HotelHomepage.HotelHomepage'
    ],
    models: [
        'HotelHomepage.HotelHomepage'
    ],
    views: [
        'HotelHomepage.GridMaster',
        'HotelHomepage.ActionPanel',
        'HotelHomepage.FormAdd',
        'HotelHomepage.FormEdit',
        'HotelHomepage.TabPanel'
    ],

    refs: [
        {
             ref: 'actionPanel',
             selector: 'hothomactionpanel'
        }, {
             ref: 'gridMaster',
             selector: 'hothomgridmaster'
        }, {
            ref: 'formAdd',
            selector: 'hothomformadd'
        }, {
            ref: 'formEdit',
            selector: 'hothomformedit'
        }
        
        
    ],

    config: {
        FormAddTitle: '新增',
        FormEditTitle: '修改',
        addHotelHomepage: './modules/source/controller/HotelHomepage/addHotelHomepage.php',
        editHotelHomepage: './modules/source/controller/HotelHomepage/editHotelHomepage.php'
    },

    init: function() {
       var me = this;

        me.control({
           'hothomgridmaster': {
                select: me.selectMasterList,
                deselect: me.deselectMasterList
            },
            'hothomgridmaster button[action=add]': {
                click: me.addMaster
            },
            'hothomgridmaster button[action=edit]': {
                click: me.editMaster
            },
            'hothomgridmaster button[action=delete]': {
                click: me.deleteMaster
            },
            'hothomformadd button[action=form_add_confirm]': {
                click: me.addHotelHomepageConfirm
            },
            'hothomformadd button[action=form_add_cancel]': {
                click: me.formCancel
            },
            'hothomformedit button[action=form_edit_confirm]': {
                
                click: me.editHotelHomepageConfirm
            },
            'hothomformedit button[action=form_edit_cancel]': {
                
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
        var formEdit = me.getFormEdit();
        
        if (count == 1) {              
            me.loadMasterFormRecord(formEdit, record);
            
        } else {
            formEdit.getForm().reset();  
          
        }
    },

    deselectMasterList: function(obj, record, index, eOpts) {
        var me = this;
        var count = obj.getCount();
        // var store = me.getGridDetail().getStore();
        var formEdit = me.getFormEdit();

        if (count == 1) {
            var deselectRecord = obj.selected.items[0];
            
            me.loadMasterFormRecord(formEdit, deselectRecord);
            
        } else {
            formEdit.getForm().reset();
            
        }
    },

    addMaster: function(btn){
        var me = this;
        var form = me.getFormAdd(),
            title = me.getFormAddTitle(),
            record = me.getGridMaster().getSelectionModel().getSelection()[0];
        // var name = record.data['brand_id'];
        
        me.showForm(form, title);
        
        // form.getForm().findField('brand_id').setValue(name);
        
    },


    addHotelHomepageConfirm: function(btn){
        var me = this;
        me.checkSession();

        var actionPanel = me.getActionPanel();
        var formPanel = me.getFormAdd();
        var grid = me.getGridMaster();
        var store = grid.getStore();
        var form = formPanel.getForm();
        if (! form.isValid()) {
            return;
        }
        
        form.submit({
            url: me.getAddHotelHomepage(),
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

    editMaster: function(btn) {
        var me = this;
        var form = me.getFormEdit(),
            title = me.getFormEditTitle(),
            record = me.getGridMaster().getSelectionModel().getSelection()[0];
            me.showForm(form, title);
            me.loadMasterFormRecord(form, record);
    },

    editHotelHomepageConfirm: function(btn) {
        var me = this;
        me.checkSession();
        var formPanel = me.getFormEdit();
        var form = formPanel.getForm();
        var actionPanel = me.getActionPanel();
        var grid = me.getGridMaster();
        var store = grid.getStore();
       
        // check value
        
        form.submit({

            url: me.getEditHotelHomepage(),
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

    deleteMaster: function(grid){
        var me = this;
        me.checkSession();
        //var store = grid.getStore(),
        var grid = me.getGridMaster(),
            store = grid.getStore(),
            record = grid.getSelectionModel().getSelection(),
            length = record.length,
            msg = MSG['delete_confirm_header'] + length + MSG['delete_confirm_footer'] +"？";

        
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

