Ext.define('Console.view.humhum_master_detail.Detail_GridMaster_humhum', {
    extend: 'Console.override.Grid',
    alias: 'widget.detailgridmaster',

    requires: [
        'Ext.ux.ProgressBarPager',
        'Ext.ux.form.SearchField'
    ],

    plugins: [
        {
            ptype: 'rowexpander',
            rowBodyTpl: new Ext.XTemplate(
                '<div class="rowexpander-row">',
                '<p><b>' + MSG['created_date'] + ':</b> {registration_date}</p>',
                '</div>'
            )
        }
    ],

    selType: 'checkboxmodel',


    config: {
        store: 'humhum.store_humhum'
    },

    initComponent: function() {
        var me = this;

        Ext.apply(me, {
            store: me.getStore(),
            columns: [
                {
                    header: MSG['student_id_d'],
                    dataIndex: 'student_id',
                    flex: 2
                },
                {
                    header: MSG['student_name_d'],
                    dataIndex: 'name',
                    flex: 1
                },  {
                    header: MSG['student_gender_d'],
                    dataIndex: 'gender',
                    flex: 1
                }, {
                    header: MSG['student_email_d'],
                    dataIndex: 'email',
                    flex: 4
                },{
                    header: MSG['student_phone_d'],
                    dataIndex: 'phone',
                    flex: 2
                }, {
                    header: MSG['student_address_d'],
                    dataIndex: 'address',
                    flex: 4
                },{
                    header: MSG['student_birthday_d'],
                    dataIndex: 'birthday',
                    flex: 2
                }
            ],

            tbar: [ 
                '->', 
                {
                    xtype: 'searchfieldmvc',
                    store: me.getStore(),
                    fieldLabel: MSG['search'],
                    labelWidth: 50,
                    width: 200,
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
    }
});