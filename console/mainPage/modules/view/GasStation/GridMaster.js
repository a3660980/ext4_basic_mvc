Ext.define('Console.view.GasStation.GridMaster', {
	extend: 'Console.override.Grid',
	alias: 'widget.gsgridmaster',
// 外框
	requires: [
		'Ext.ux.ProgressBarPager',
		'Ext.ux.form.SearchField'
	],

	// plugins: [
    	// {
    		// ptype: 'rowexpander',
    		// rowBodyTpl: new Ext.XTemplate(
    			// '<div class="rowexpander-row">',
    			// '</div>'
    		// /)
    	// }
	// ],

	selType: 'checkboxmodel',
// 勾勾
    config: {
        store: 'GasStation'
    },
//存取路徑
	initComponent: function() {
        var me = this;

		Ext.apply(me, {
			store: me.getStore(),
			columns: [
        		 {
                    header: MSG['station_id'],
                    dataIndex: 'station_id',
                    flex: 1,
                    hidden:true
                },  {
        			header: MSG['brand_id'],
        			dataIndex: 'brand_id',
        			flex: 1,
                    hidden:true
        		},  {
                    header: MSG['station_code'],
                    dataIndex: 'station_code',
                    flex: 1
                }, {
                    header: MSG['station_name'],
                    dataIndex: 'station_name',
                    flex: 1
                },{
                    header: MSG['station_address'],
                    dataIndex: 'station_address',
                    flex: 3
                },{
                    header: MSG['gps_latitude'],
                    dataIndex: 'gps_latitude',
                    flex: 1
                },{
                    header: MSG['gps_longitude'],
                    dataIndex: 'gps_longitude',
                    flex: 1
                },{
                    header: MSG['service_time'],
                    dataIndex: 'service_time',
                    flex: 1
                },{
                    header: MSG['service_type'],
                    dataIndex: 'service_type',
                    flex: 1
                },{
                    header: MSG['gas_type'],
                    dataIndex: 'gas_type',
                    flex: 1
                },{
                    header: MSG['phone'],
                    dataIndex: 'phone',
                    flex: 2
                },{
                    header: MSG['priority'],
                    dataIndex: 'priority',
                    flex: 1
                },{
                    header: MSG['start_date'],
                    dataIndex: 'start_date',
                    flex: 2
                },{
                    header: MSG['expire_date'],
                    dataIndex: 'expire_date',
                    flex: 2
                },{
                    header: MSG['hand_gasoline_offer'],
                    dataIndex: 'hand_gasoline_offer',
                    flex: 1
                },{
                    header: MSG['self_gasoline_offer'],
                    dataIndex: 'self_gasoline_offer',
                    flex: 1
                },{
                    header: MSG['diesel_offer'],
                    dataIndex: 'diesel_offer',
                    flex: 1
                },{
                    header: MSG['created_date'],
                    dataIndex: 'created_date',
                    flex: 2
                },{
                    header: MSG['updated_date'],
                    dataIndex: 'updated_date',
                    flex: 2
                },{
                    header: MSG['operator'],
                    dataIndex: 'operator',
                    flex: 1
                }
            ],
			tbar: [
    			{
    				text: MSG['add'],
    				action: 'add_user'
    			}, {
    				text: MSG['edit'],
    				action: 'edit_user',
                    allowMulti: false,
    				disabled: true
    			}, {
    				text: MSG['delete'],
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