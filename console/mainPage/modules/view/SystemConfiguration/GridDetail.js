Ext.define('Console.view.SystemConfiguration.GridDetail', {
	extend: 'Console.override.Grid',
	alias: 'widget.scgriddetail',

	plugins: [
        {
    		ptype: 'rowexpander',
    		rowBodyTpl: new Ext.XTemplate(
    			'<p class="row-expander-title"><b><u>' + MSG['app_push_setting'] + '</u></b></p>',
    			'{certificate_url:this.renderCertificateUrl}',
    			'{certificate_password:this.renderCertificatePassword}',
    			'{production:this.renderProduction}',
    			'{api_key:this.renderApiKey}',
    			{
    				renderCertificateUrl: function(value)
    				{
    					if(value != null && value != '')
    					{
    						return '<p class="row-expander-single-field"><b>' + MSG['certificate_url'] + ':</b> ' + value + '</p>';
    					}
    					return;
    				},
    				renderCertificatePassword: function(value)
    				{
    					if(value != null && value != '')
    					{
    						return '<p class="row-expander-single-field"><b>' + MSG['certificate_password'] + ':</b> ' + value + '</p>';
    					}
    					return;
    				},
    				renderProduction: function(value)
    				{
    					if(value != null && value != '')
    					{
    						return '<p class="row-expander-single-field"><b>' + MSG['production'] + ':</b> ' + value + '</p>';
    					}
    					return;
    				},
    				renderApiKey: function(value)
    				{
    					if(value != null && value != '')
    					{
    						return '<p class="row-expander-single-field"><b>' + MSG['api_key'] + ':</b> ' + value + '</p>';
    					}
    					return;
    				}
    			}
    		)
	}
	],

	selType: 'checkboxmodel',

    config: {
        store: 'SystemConfiguration.CpsAppPlatform'
    },
	initComponent: function() {
        var me = this;

		Ext.apply(me, {
			store: me.getStore(),
			columns: [
    			{
                    xtype: 'rownumberer'
                }, {
    				header: MSG['app_package_type'],
    				dataIndex: 'app_package_type',
    				editor: 'textfield'
    			}, {
    				header: MSG['app_package_name'],
    				dataIndex: 'app_package_name',
    				flex: 1,
    				editor: 'textfield'
    			}, {
    				header: MSG['app_package_version'],
    				dataIndex: 'app_package_version',
    				editor: 'textfield'
    			}, {
    				header: MSG['app_push_payload'],
    				dataIndex: 'app_push_payload',
    				flex: 1,
    				editor: 'textfield'
    			}, {
    				header: MSG['app_created_date'],
    				dataIndex: 'app_created_date'
    			}, {
    				header: MSG['app_updated_date'],
    				dataIndex: 'app_updated_date'
    			}
			],

			tbar: [
    			{
    				text: MSG['edit2'],
    				action: 'edit_app_platform',
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
				clearFilter: false,
				plugins: new Ext.ux.ProgressBarPager()
            }
		});

		me.callParent(arguments);

		// rowexpander事件監聽
		me.getView().addListener('expandbody', function(rowNode, record, expandRow, eOpts) {
			this.getSelectionModel().select([record]);
		});
	}
});