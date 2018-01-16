Ext.define('Console.view.SystemConfiguration.GridMaster', {
    extend: 'Console.override.Grid',
    alias: 'widget.scgridmaster',

    plugins: [
        {
            pluginId: 'sc-master-row-expander',
            ptype: 'rowexpander',
            rowBodyTpl: new Ext.XTemplate(
                '<table border="0" cellpadding="0" cellspacing="0" class="row-expander-table-with-logo"><tbody><tr>',
                // '<td rowspan=2 height="80px" width="80px"><img src="{app_icon}" height="72" width="72"></td>',
                '<td width="80px" class="row-expander-td-label"><b>' + MSG['contact_department'] + ':</b></td><td class="row-expander-td-fieldvalue">{contact_department:this.checkNull}</td>',
                '<td width="80px" class="row-expander-td-label"><b>' + MSG['contact_title'] + ':</b></td><td class="row-expander-td-fieldvalue">{contact_title:this.checkNull}</td>',
                '<td width="80px" class="row-expander-td-label"><b>' + MSG['contact_name'] + ':</b></td><td class="row-expander-td-fieldvalue">{contact_name:this.checkNull}</td>',
                '</tr><tr>',
                '<td width="80px" class="row-expander-td-label"><b>' + MSG['contact_phone'] + ':</b></td><td class="row-expander-td-fieldvalue">{contact_phone:this.checkNull}</td>',
                '<td width="80px" class="row-expander-td-label"><b>' + MSG['contact_mobile'] + ':</b></td><td class="row-expander-td-fieldvalue">{contact_mobile:this.checkNull}</td>',
                '<td width="80px" class="row-expander-td-label"><b>' + MSG['contact_email'] + ':</b></td><td class="row-expander-td-fieldvalue">{contact_email:this.checkNull}</td>',
                '</tr></tbody></table>',
                {
                    checkNull: function(value)
                    {
                        if(value == null || value == '')
                        {
                            return '&nbsp;';
                        }
                        return value;
                    }
                }
            )
        }
    ],

    selType: 'checkboxmodel',

    config: {
        store: 'SystemConfiguration.CpsAppDescription'
    },

    initComponent: function() {
        var me = this;

        Ext.apply(me, {
            store: me.getStore(),
            columns: [
                {
                    header: MSG['corp_name'],
                    dataIndex: 'corp_name',
                    flex: 1
                }, {
                    header: MSG['device_app_id'],
                    dataIndex: 'device_app_id'
                }, {
                    header: MSG['device_app_name'],
                    dataIndex: 'device_app_name',
                    flex: 1
                }, {
                    header: MSG['app_icon'],
                    flex: 1,
                    renderer: function(value, p, r) {
                        return me.renderImage(this, r.data['app_icon']);
                    },
                }, {
                    header: MSG['app_service_date'],
                    dataIndex: 'app_service_date',
                    flex: 1
                }, {
                    header: MSG['app_service_status'],
                    dataIndex: 'app_service_status',
                    flex: 1
                }, {
                    header: MSG['app_created_date'],
                    dataIndex: 'app_created_date',
                    flex: 1
                }, {
                    header: MSG['app_updated_date'],
                    dataIndex: 'app_updated_date',
                    flex: 1
                }
            ],

            tbar: [
                {
                    text: MSG['edit2'],
                    action: 'edit_app_description',
                    allowMulti: false,
                    disabled: true
                }, '->', {
                    xtype: 'searchfieldmvc',
                    store: me.getStore(),
                    fieldLabel: MSG['search'],
                    labelWidth: 50,
                    width: 200
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
        this.getView().addListener('expandbody', function(rowNode, record, expandRow, eOpts) {
            this.getSelectionModel().select([record]);
        });
    }
});