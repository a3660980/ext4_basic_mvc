Ext.define('Console.view.HotelPhoto.ActionPanel', {
	extend: 'Console.override.ActionPanel',
	alias: 'widget.hotphoactionpanel',

	requires: ['Ext.layout.container.Fit'], //fit頁面布局之一 

	layout: 'fit',//表示一次只顯示一個子元件

	title: 'Action',

	activeItem: 0,//容器中的第一個項目

	initComponent: function() {
        var me = this;

		Ext.apply(me, {
			collapseMode: 'mini', //可手動調整actionpanel
			collapsed: true, //可折疊若為false則只有畫面的一部份
			collapsible: false, //不可折疊actionpanel
            defaults: {
                hidden: true //可隱藏
            },
			items: [ //新增修改時出現
        		{
        			xtype: 'hotphoformadd' //新增
        		}, {
        			xtype: 'hotphoformedit' //修改
        		}
			]
		});

		me.callParent(arguments);
	}
});