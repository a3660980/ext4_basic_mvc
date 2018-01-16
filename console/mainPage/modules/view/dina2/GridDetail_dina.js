Ext.define('Console.view.dina2.GridDetail_dina', {
	extend: 'Console.override.Grid',
	alias: 'widget.dingriddetail',

	requires: [
        'Ext.ux.ProgressBarPager',
        'Ext.ux.form.SearchField'
    ],

	selType: 'checkboxmodel',

    config: {
        store: 'dina.Servicedetail_dina'
    },

	initComponent: function() {
        var me = this;

		Ext.apply(me, {
			store: me.getStore(),
			columns: [
    			 {
                    header: MSG['e_name'],
                    dataIndex: 'e_name',
                    flex: 1,
                     
                }, {
    				header: MSG['personality'],
    				dataIndex: 'personality',
    				flex: 3
    			}, {
    				header: MSG['luckycolor'],
    				dataIndex: 'luckycolor',
    				flex: 1
    			}, {
    				header: MSG['the_ruler'],
                    dataIndex: 'the_ruler',
                    flex: 1
                   
    			}
    			
			],tbar: [//上層
                {
                    text: MSG['add_user'],
                    action: 'add_user',
                    loadEnabled: true,
                    disabled: true

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
                }
            ],
			bbar: { //確認 取消
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