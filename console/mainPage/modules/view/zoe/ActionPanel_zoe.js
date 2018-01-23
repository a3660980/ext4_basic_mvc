Ext.define('Console.view.zoe.ActionPanel_zoe'{
    extend: 'Console.override.ActionPanel',
    alias: 'widget.zoeactionpanel',

    requires: ['Ext.layout.container.Fit'], //fit頁面布局之一 

    layout : 'fit',

    title : 'action',

    initComponent: function(){
       var me = this;

       Ext.apply(me,{
           collapseMode: 'mini', //可手動調整actionpanel
           collapsed: true, //可折疊若為false則只有畫面的一部份
           collapsible: false, //不可折疊actionpanel
            defaults: {
                hidden: true //可隱藏
            },
       });


    }
	
});