Ext.define('Console.override.Form', {
    extend: 'Ext.form.Panel',
    alias: 'widget.overform',
    listeners: {
        beforerender: function(obj, eOpts) {
            var me = this;
            // 如果allowBlank是false(代表必填), 則會自動套入提示
            var allowBlankFields = obj.query('field[allowBlank=false]');
            var allowBlankFieldContainers = obj.query('fieldcontainer[allowBlank=false]');
            var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';

            Ext.each(allowBlankFields, function(field) {
                field.afterLabelTextTpl = required;
            });
            Ext.each(allowBlankFieldContainers, function(field) {
                field.afterLabelTextTpl = required;
            });

            // reset picture
            var pictureFields = obj.query('image[renderPicture=true]');
            Ext.each(pictureFields, function(field) {
                field.on('afterrender', function(obj, eOpts) {
                    field.setMargin('5px 0 0 105px');
                    me.renderPicture(obj);
                });
            });

            // displayfield 會自動將submitValue設為true
            var displayFields = obj.query('displayfield');

            Ext.each(displayFields, function(field) {
                field.submitValue = true;
            });

            var cellphoneFields = obj.query('field[vtype=cellphone]');

            // 在此統一設置cellphone的field的最大最小長度
            Ext.each(cellphoneFields, function(field) {
                field.maxLength = 10;
                field.minLength = 10;
            });
            // 在此統一設置tellphone的field的最大最小長度
            var tellphoneFileds =obj.query('field[vtype=tellphone]');
            Ext.each(tellphoneFileds,function(field){
                    field.maxLength=9;
                    field.minLength=9;
            });
        }
    },

    initComponent: function() {
        var me = this;
        me.callParent(arguments);
    },

    // 重置picture大小，使圖片不失真
    renderPicture: function(obj) {
        var iwidth = 300; // 寬度
        var iheight = 110; //高度 由此控制 important

        var oWidth = obj.getWidth();
        var oHeight = obj.getHeight();
        if (oWidth > 0 && oWidth > 0) {
            flag = true;
            if (oWidth/oHeight >= iwidth/iheight) {
                obj.setWidth(oWidth);
                obj.setHeight((oHeight*iwidth)/oWidth);
            } else {
                obj.setHeight(iwidth);
                obj.setHeight(iheight);
            }
        }else{
            if (oHeight>iheight) {
                obj.setHeight(iheight);
                obj.width.set((oWidth*iheight) / iheight);
            } else {
                obj.setWidth(oWidth);
                obj.setHeight(oHeight);
            }
        }
        oWidth = obj.getWidth();
        oHeight = obj.getHeight();
    }
});