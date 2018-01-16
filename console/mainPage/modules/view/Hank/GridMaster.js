Ext.define('Console.view.Hank.GridMaster', {
    extend: 'Console.override.Grid',
    alias: 'widget.hkgridmaster',

    requires: [
        'Ext.ux.ProgressBarPager',
        'Ext.ux.form.SearchField'
    ],
    //讓按鈕在未點擊時不加載js文件

    plugins: [{
        ptype: 'rowexpander',
        rowBodyTpl: new Ext.XTemplate(
            '<div class="rowexpander-row">',
            '<p><b>' + MSG['created_date'] + ':</b> {registration_date}</p>',
            '</div>'
        )
    }],

    selType: 'checkboxmodel',


    config: {
        store: 'Hank.ExternalContact'
    },

    initComponent: function() {
        var me = this;

        Ext.apply(me, {
            store: me.getStore(),
            columns: [{
                header: MSG['student_idx'],
                dataIndex: 'student_id',
                flex: 1
            }, {
                header: MSG['name_'],
                dataIndex: 'name',
                flex: 1
            }, {
                header: MSG['gender_b'],
                dataIndex: 'gender',
                flex: 1
            }, {
                header: MSG['email_b'],
                dataIndex: 'email',
                flex: 1
            }, {
                header: MSG['mobile_number_b'],
                dataIndex: 'phone',
                flex: 1
            }, {
                header: MSG['address_b'],
                dataIndex: 'address',
                flex: 1
            }, {
                header: MSG['birthday_b'],
                dataIndex: 'birthday',
                flex: 1
            }],
            tbar: [{
                text: MSG['add_user'],
                action: 'add_user'
            }, {
                text: MSG['edit_user'],
                action: 'edit_user',
                allowMulti: false,
                disabled: true
            }, {
                text: MSG['delete_user'],
                action: 'delete_user',
                allowMulti: true,
                disabled: true
            }, '->', {
                xtype: 'searchfieldmvc',
                store: me.getStore(),
                fieldLabel: MSG['search'],
                labelWidth: 50,
                width: 200
            }],
            bbar: {
                xtype: 'pagingtoolbar',
                store: me.getStore(),
                displayInfo: true,
                plugins: new Ext.ux.ProgressBarPager()
            }
        });

        me.callParent(arguments);
    }
});