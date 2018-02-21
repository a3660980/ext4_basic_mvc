Ext.define('Console.view.bettyRoompicture.GridDetail', {
	extend: 'Console.override.Grid',
	alias: 'widget.brpgriddetail',
// 外框
	requires: [
		'Ext.ux.ProgressBarPager'
	],
	selType: 'checkboxmodel',
// 勾勾
    config: {
        store: 'betty.Service_Roompicture',//checkboxmodel,checkbox 選取
    },
//存取store檔案路徑
	initComponent: function() {
        var me = this;

		Ext.apply(me, {
			store: me.getStore(),//連結到store
			columns: [
        		{
                    header: MSG['room_name'],//房型名稱
                    dataIndex: 'room_name',
                    flex: 1
                },{
                    header: MSG['detail_sort'],//顯示順序
                    dataIndex: 'detail_sort',
                    flex: 1
                },{
                    header: MSG['detail_name'],//房型簡介
                    dataIndex: 'detail_name',
                    flex: 1
                },{
                    header: MSG['detail_photo'],//房型展示圖片
                    dataIndex: 'detail_photo',
                    flex: 1,
                    renderer: function(value, p, r) {
                        return me.renderImage(this, r.data['detail_photo']);//取得圖片
                        //顯示logo
                    }
                },{
                    header: MSG['created_date'],
                    dataIndex: 'created_date',
                    flex: 1
                },{
                    header: MSG['updated_date'],
                    dataIndex: 'updated_date',
                    flex: 1
                },{
                    header: MSG['operator'],
                    dataIndex: 'operator',
                    flex: 1
                }
            ],
			tbar: [
    			{
                    text: MSG['add'],
                    action: 'add_user',
                    loadEnabled: true,
                    disabled: true
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
				xtype: 'pagingtoolbar',//告知Server要顯示的資料為何
				store: me.getStore(),//要綁定的store物件
				displayInfo: false,//是否顯示grid中的分頁條訊息 
				plugins: new Ext.ux.ProgressBarPager()//外掛Ext.ux.ProgressBarPager()
            }

		});
    
		me.callParent(arguments);
         
	}
});