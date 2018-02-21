Ext.define('Console.view.zoe_detail.DetailActionPanel_zoe', {
  extend: 'Console.override.ActionPanel',
  alias: 'widget.zoedetailactionpanel',

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
            },items:[ //這個actionpanel會出現的form頁面
                {
                  xtype: 'zoedetailformadd'
                },{
                  xtype: 'zoedetailformedit'
                }
            ]
    });

    me.callParent(arguments);
  }
});