
Ext.define('Console.view.ServiceCategory.GridDetail', {
	extend: 'Console.override.Grid',
	alias: 'widget.scygriddetail',

	requires: [
        'Ext.ux.ProgressBarPager',
        'Ext.ux.form.SearchField'
    ],

    plugins: [
        {
            ptype: 'rowexpander',
            rowBodyTpl: new Ext.XTemplate(
                '<table border="0" cellpadding="0" cellspacing="0" class="row-expander-table-with-logo"><tbody><tr>',
                '<td width="80px" class="row-expander-td-label"><b>' + MSG['created_date'] + ':</b></td><td class="row-expander-td-fieldvalue">{created_date}</td>',
                '<td width="80px" class="row-expander-td-label"><b>' + MSG['operator'] + ':</b></td><td class="row-expander-td-fieldvalue">{operator}</td>',
                '</tr></tbody></table>',
                {
                    checkNull: function(value)
                    {
                        if(value == null || value == '')
                        {
                            return '&nbsp;';  //&nbsp:空白字元
                        }
                        return value;
                    }
                }
            )
       }
    ],

	selType: 'checkboxmodel',

    config: {
        store: 'ServiceCategory.ServiceCategory'
    },

	initComponent: function() {
        var me = this;

		Ext.apply(me, {
			store: me.getStore(),
			columns: [
    			{
                    header: MSG['category_code'],
                    dataIndex: 'category_code',
                    flex: 1
                }, {
    				header: MSG['category_name'],
    				dataIndex: 'category_name',
    				flex: 1
    			}, {
    				header: MSG['category_introduction'],
    				dataIndex: 'category_introduction',
    				flex: 1
    			}, {
    				header: MSG['category_icon'],
    				dataIndex: 'category_icon',
    				flex: 1,
                     renderer: function(value, p, r) {
                        return me.renderImage(this, r.data['category_icon']);
                   }
    			}, {
    				header: MSG['category_sort'],
                    dataIndex: 'category_sort',
                    flex: 1
                   
    			}, {
                    header: MSG['category_identity'],
                    dataIndex: 'category_identity',
                    flex: 1,
                    renderer: function(value, p, r) {
                       return r.data['category_identity'] == 0 ? '預設'
                            : r.data['category_identity'] == 1 ? '消費者'
                            : r.data['category_identity'] == 2 ? '司機'
                            : r.data['category_identity'] == 3 ? '企業客戶'
                            : r.data['category_identity'] == 5 ? '車行'
                            : r.data['category_identity'] == 6 ? '全鋒(派遣或客服)'
                            : r.data['category_identity'] == 7 ? '全鋒(主管)'
                            : 'Undefined';
                    }
                   
                }, {
                   header: MSG['created_date'],
                    dataIndex: 'created_date',
                    flex: 1
                    
                }, {
                    header: MSG['updated_date'],
                    dataIndex: 'updated_date',
                    flex: 1
                   
                }
    			
			],tbar: [//上層
                {
                    text: MSG['add'],
                    action: 'add_service_category',
                    loadEnabled: true,
                    disabled: true

                }, {
                    text: MSG['edit'],
                    action: 'edit_service_category',
                    allowMulti: false,
                    disabled: true
                }, {
                    text: MSG['delete'],
                    action: 'delete_service_category',
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