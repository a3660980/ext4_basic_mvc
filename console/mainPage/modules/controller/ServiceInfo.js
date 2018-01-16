Ext.define('Console.controller.ServiceInfo', {
    extend: 'Ext.app.Controller',

    stores: [
        'ServiceInfo.ServiceInfo',
        'ServiceInfo.ServiceInfoLang'
    ],
    models: [
        'ServiceInfo.ServiceInfo'
    ],
    views: [
        'ServiceInfo.TabPanel',
        'ServiceInfo.GridMaster',
        'ServiceInfo.FormAdd',
        'ServiceInfo.ActionPanel',
        'ServiceInfo.FormEdit'
    ],

    refs: [
        {
             ref: 'actionPanel',
             selector: 'siactionpanel'
        }, {
             ref: 'gridMaster',
             selector: 'sigridmaster'
        }, {
            ref: 'FormAdd',
            selector: 'siformadd'
        }, {
            ref: 'FormEdit',
            selector: 'siformedit'
        }, {
            ref: 'formEditMasterImage1',
            selector: 'siformedit #service_icon'
        }, {
            ref: 'formEditMasterDisplay1',
            selector: 'siformedit displayfield'
       
        }
        
    ],

    config: {
        formAddTitle: '新增服務項目',
        formEditTitle: '修改服務項目',
        addServiceInfoUrl: './modules/source/controller/ServiceInfo/addServiceInfo.php',
        editServiceInfoUrl: './modules/source/controller/ServiceInfo/editServiceInfo.php'
    },

    init: function() {
        var me = this;

        me.control({
            'sigridmaster': {
                select: me.selectMasterList,
                deselect: me.deselectMasterList
            },
            'sigridmaster button[action=add_service_info]': {
                click: me.addMaster
            },
            'sigridmaster button[action=edit_service_info]': {
                click: me.editMaster
            },
            'sigridmaster button[action=delete_service_info]': {
                click: me.deleteServiceInfo
            },
            'siformadd button[action=form_add_confirm]': {
                click: me.addServiceInfoConfirm
            },
            'siformadd button[action=form_add_cancel]': {
                click: me.formCancel
            },
            'siformedit button[action=form_edit_confirm]': {
                click: me.editServiceInfoConfirm
            },
            'siformedit button[action=form_edit_cancel]': {
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
    },

    

    loadFormReocrd: function(form, record) {
        var me = this;
        var image = me.getFormEditMasterImage1();
        var display = me.getFormEditMasterDisplay1();
        var dcTime = '?' + (new Date()).getTime();
        var service_icon = record.get('service_icon') + dcTime;
        var service_url = Ext.decode(record.get('service_url'));
        
        if (service_icon == '' || service_icon == null){
            display.setRawValue('沒有圖片');
        } else {
            display.setRawValue(null);
        }

        form.loadRecord(record);
        image.setSrc(service_icon);
    },
     selectMasterList: function(obj, record, index, eOpts) {
        var me = this;
        var count = obj.getCount();
        var formEdit = me.getFormEdit();

        if (count == 1) {
            me.loadFormReocrd(formEdit, record);
        } else {
            formEdit.getForm().reset();
        }
    },

    deselectMasterList: function(obj, record, index, eOpts) {
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

    addMaster: function(btn){
        var me = this;
        var form = me.getFormAdd(),
            title = me.getFormAddTitle();

        me.showForm(form, title);
    },

    addServiceInfoConfirm: function(btn){
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
            url: me.getAddServiceInfoUrl(),
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

    editMaster: function(btn) {
        var me = this;
        var form = me.getFormEdit(),
            title = me.getFormEditTitle(),
            record = me.getGridMaster().getSelectionModel().getSelection()[0];

        me.showForm(form, title);
        me.loadFormReocrd(form, record);//記得對應到loadMasterFormRecord抓圖片的而不是loadFormRecord
    },

    editServiceInfoConfirm: function(btn) {
        var me = this;
        me.checkSession();

        var actionPanel = me.getActionPanel();
        var formPanel = me.getFormEdit();
        var grid = me.getGridMaster();
        var store = grid.getStore();
        var form = formPanel.getForm();

        // check value
        if (! form.isValid()) {
            return;
        }

        form.submit({
            url: me.getEditServiceInfoUrl(),
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
   
    deleteServiceInfo: function(grid){
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
                                msg: this.getReader().jsonData['msg'],
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