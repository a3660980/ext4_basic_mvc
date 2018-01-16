Ext.define('Console.controller.SystemConfiguration', {
    extend: 'Ext.app.Controller',

    stores: [
        'SystemConfiguration.CpsAppDescription',
        'SystemConfiguration.CpsAppPlatform'
    ],
    models: [
        'SystemConfiguration.CpsAppDescription',
        'SystemConfiguration.CpsAppPlatform'
    ],
    views: [
        'SystemConfiguration.TabPanel',
        'SystemConfiguration.PanelMasterDetail',
        'SystemConfiguration.ActionPanel',
        'SystemConfiguration.GridMaster',
        'SystemConfiguration.GridDetail',
        'SystemConfiguration.FormEditDescription',
        'SystemConfiguration.FormEditPlatform'
    ],

    refs: [
        {
            ref: 'actionPanel',
            selector: 'scactionpanel'
        }, {
            ref: 'gridMaster',
            selector: 'scgridmaster'
        }, {
            ref: 'gridDetail',
            selector: 'scgriddetail'
        }, {
            ref: 'formEditDescription',
            selector: 'scformeditdescription'
        }, {
            ref: 'formEditPlatform',
            selector: 'scformeditplatform'
        }
    ],

    config: {
        formEditTitle: '修改資料',
        descriptionRequestUrl: './modules/source/controller/SystemConfiguration/editAppDescriptionContact.php',
        platformRequestUrl: './modules/source/controller/SystemConfiguration/editAppPlatformPushSetting.php'
    },

    init: function() {
        var me = this;

        me.control({
            'scgridmaster': {
                select: me.selectMasterList,
                deselect: me.deselectMasterList
            },
            'scgriddetail': {
                select: me.selectDetailList,
                deselect: me.deselectDetailList
            },
            'scgridmaster button[action=edit_app_description]': {
                click: me.editMaster
            },
            'scgriddetail button[action=edit_app_platform]': {
                click: me.editDetail
            },
            'scformeditdescription button[action=form_edit_description_cancel]': {
                click: me.editCancel
            },
            'scformeditplatform button[action=form_edit_platform_cancel]': {
                click: me.editCancel
            },
            'scformeditdescription button[action=form_edit_description_confirm]': {
                click: me.editDescriptionConfirm
            },
            'scformeditplatform button[action=form_edit_platform_confirm]': {
                click: me.editAppPlatformConfirm
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

    selectMasterList: function(obj, record, index, eOpts) {
        var me = this;
        var count = obj.getCount();
        var store = me.getGridDetail().getStore();
        var formEdit = me.getFormEditDescription();

        if (count == 1) {
            me.loadMasterFormRecord(formEdit, record);
            store.clearFilter(true);
            store.filter('device_app_id', record.get('device_app_id'));

            store.load();
        } else {
            store.removeAll();
        }
    },

    deselectMasterList: function(obj, record, index, eOpts) {
        var me = this;
        var count = obj.getCount();
        var store = me.getGridDetail().getStore();
        var formEdit = me.getFormEditDescription();

        if (count == 1) {
            var deselectRecord = obj.selected.items[0];
            me.loadMasterFormRecord(formEdit, deselectRecord);

            store.clearFilter(true);
            store.filter('device_app_id', deselectRecord.get('device_app_id'));

            store.load();
        } else {
            store.removeAll();
        }
    },

    loadMasterFormRecord: function(form, record) {
        var me = this;
        // var image = me.getFormEditImage();
        // var display = me.getFormEditDisplay();
        // var file = record.get('organization_picture');

        // if (file == '' || file == null) {
        //     display.setRawValue('沒有圖片');
        // } else {
        //     display.setRawValue(null);
        // }
        // image.setSrc(file);
        form.loadRecord(record);
    },

    selectDetailList: function(obj, record, index, eOpts) {
        var me = this;
        var count = obj.getCount();
        var formEdit = me.getFormEditPlatform();

        if (record.get('app_package_type') == 'iOS') {
            Ext.getCmp('app-push-setting-ios').show();
            Ext.getCmp('app-push-setting-android').hide();
        } else if(record.get('app_package_type') == 'Android') {
            Ext.getCmp('app-push-setting-ios').hide();
            Ext.getCmp('app-push-setting-android').show();
        } else {
            Ext.getCmp('app-push-setting-ios').hide();
            Ext.getCmp('app-push-setting-android').hide();
        }

        if (count == 1) {
            me.loadDetailFormRecord(formEdit, record);
        } else {
            formEdit.getForm().reset();
        }
    },

    deselectDetailList: function(obj, record, index, eOpts) {
        var me = this;
        var count = obj.getCount();
        var formEdit = me.getFormEditPlatform();

        if (record.get('app_package_type') == 'iOS') {
            Ext.getCmp('app-push-setting-ios').show();
            Ext.getCmp('app-push-setting-android').hide();
        } else if(record.get('app_package_type') == 'Android') {
            Ext.getCmp('app-push-setting-ios').hide();
            Ext.getCmp('app-push-setting-android').show();
        } else {
            Ext.getCmp('app-push-setting-ios').hide();
            Ext.getCmp('app-push-setting-android').hide();
        }

        if (count == 1) {
            var deselectRecord = obj.selected.items[0];
            me.loadDetailFormRecord(formEdit, deselectRecord);
        } else {
            formEdit.getForm().reset();
        }
    },

    loadDetailFormRecord: function(form, record) {
        var me = this;
        // var image = me.getFormEditImage();
        // var display = me.getFormEditDisplay();
        // var file = record.get('organization_picture');

        // if (file == '' || file == null) {
        //     display.setRawValue('沒有圖片');
        // } else {
        //     display.setRawValue(null);
        // }
        // image.setSrc(file);
        form.loadRecord(record);
    },

    editMaster: function(btn) {
        var me = this;
        var form = me.getFormEditDescription(),
            title = me.getFormEditTitle(),
            record = me.getGridMaster().getSelectionModel().getSelection()[0];

        me.showForm(form, title);
        me.loadMasterFormRecord(form, record);
    },

    editDetail: function(btn) {
        var me = this;
        var form = me.getFormEditPlatform(),
            title = me.getFormEditTitle(),
            record = me.getGridDetail().getSelectionModel().getSelection()[0];

        me.showForm(form, title);
        me.loadDetailFormRecord(form, record);
    },

    editDescriptionConfirm: function(btn) {
        var me = this;
        me.checkSession();

        var actionPanel = me.getActionPanel();
        var formPanel = me.getFormEditDescription();
        var grid = me.getGridMaster();
        var store = grid.getStore();
        var form = formPanel.getForm();

        // check value
        if (! form.isValid()) {
            return;
        }

        form.submit({
            url: me.getDescriptionRequestUrl(),
            method: 'POST',
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

    editAppPlatformConfirm: function(btn) {
        var me = this;
        me.checkSession();

        var actionPanel = me.getActionPanel();
        var formPanel = me.getFormEditPlatform();
        var grid = me.getGridDetail();
        var store = grid.getStore();
        var form = formPanel.getForm();

        // var masterRecord = me.getGrid().getSelectionModel().getSelection()[0];
        // var values = form.getValues()

        // values.organization_parent_id = masterRecord.get('organization_id');
        // form.setValues(values);

        // check value
        if (! form.isValid()) {
            return;
        }

        form.submit({
            url: me.getPlatformRequestUrl(),
            method: 'POST',
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

    editCancel: function(btn) {
        var me = this;
        var form = btn.up('form');

        me.hideForm(form);
    }
});