Ext.define('Console.view.zoe_detail.DetailGridMaster_zoe', {
    extend: 'Console.override.PanelMasterDetail',
    alias: 'widget.zoedetailgridmaster',
    
    requires: ['Ext.layout.container.Border'],

    layout: 'border',

    //這邊因為要放gridmaster跟上面gridmaster的detail資料
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            //header: false,
            //closable: true,
            items: [
                {
                    region: 'north',
                    split: true,
                    xtype: 'zoedetailgridmaster2',                    
                    //如果不下畫面會隨著資料內容變動排版內容
                    flex: 2
                },{
                    region: 'center',
                    xtype: 'zoedetailgrid',
                    flex: 1
                }
            ]

        });

        me.callParent(arguments);
    }

});