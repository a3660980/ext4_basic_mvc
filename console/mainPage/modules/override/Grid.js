Ext.define('Console.override.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.overgrid',

    config: {
        allowMultiButtons: null,
        NotAllowMultiButtons: null
    },

    // 將選擇打開button寫在這邊，以免每一個controller都要寫重複的東西
    // 如果需要額外的功能，可以在controller複寫，並不影響這邊
    selectItems: function(obj, record, index, eOpts) {
        var me = this;
        var count = obj.getCount();
        var mButton = me.getAllowMultiButtons();
        var nButton = me.getNotAllowMultiButtons();
        
        if (count == 0) {
            me.setButtonsDisabled(mButton, true);
            me.setButtonsDisabled(nButton, true);
        } else if (count == 1) {
            me.setButtonsDisabled(mButton, false);
            me.setButtonsDisabled(nButton, false);
        } else if (count > 1) {
            me.setButtonsDisabled(nButton, true);
        }
    },

    setButtonsDisabled: function(buttons, disabled) {
        Ext.each(buttons, function(button) {
            button.setDisabled(disabled);
        });
    },

    // 當呼叫request之後，要將store重整, form隱藏跟重置, 將某些項目關閉使用
    afterRequest: function(store, formPanel) {
        var me = this;
        var mButton = me.getAllowMultiButtons();
        var nButton = me.getNotAllowMultiButtons();

        store.reload();

        if (formPanel) {
            formPanel.getForm().reset();
            formPanel.hide();
        }

        me.setButtonsDisabled(mButton, true);
        me.setButtonsDisabled(nButton, true);
    },

    renderImage: function(obj, img, height) {
        var dcTime = '?' + (new Date()).getTime();

        if (img == '' || img == null || typeof img == 'undefined') {
            return null;
        }else{
            img += dcTime;
        }

        if (typeof height == 'undefined') {
            height = 100;
        }

        return '<img height="' + height + '" src="' + img + '"onload="' + this.AXImg(obj) + '" height="50">';
    },

    AXImg: function(ximg) {
        var image=new Image();
        var iwidth = 500; //图片宽度
        var iheight = 200; //图片高度
        if (typeof ximg.src == 'undefined') return;
        image.src=ximg.src;
        if(image.width>0 && image.height>0){
            flag=true;
            if(image.width/image.height>= iwidth/iheight){
                if(image.width>iwidth){
                    ximg.width=iwidth;
                    ximg.height=(image.height*iwidth)/image.width;
                }else{
                    ximg.width=image.width;
                    ximg.height=image.height;
                }
                ximg.alt=image.width+"×"+image.height;
            }
            else{
                if(image.height>iheight){
                    ximg.height=iheight;
                    ximg.width=(image.width*iheight)/image.height;
                }else{
                    ximg.width=image.width;
                    ximg.height=image.height;
                }
                ximg.alt=image.width+"×"+image.height;
            }
        }
    },

    initComponent: function() {
        var me = this;

        Ext.apply(me, {
            viewConfig: {
                emptyText: 'No matching results'
            },
            listeners: {
                // allowMulti 如果被選取將會enable button
                // 如果設定為true, 則多選時enabled, 如果為false, 多選為disabled
                // 如果不設定則代表此項目可以一直使用

                // loadEnabled 通常用在detailGrid的add按鈕
                // 當master讀取資料後將啟用 button
                beforerender: function(obj, eOpts) {
                    var me = this;
                    var store = me.getStore();

                    me.setAllowMultiButtons(obj.getDockedItems('toolbar[dock=top] button[allowMulti=true]'));
                    me.setNotAllowMultiButtons(obj.getDockedItems('toolbar[dock=top] button[allowMulti=false]'));

                    var mButton = me.getAllowMultiButtons();
                    var nButton = me.getNotAllowMultiButtons();

                    store.on({
                        clear: function(store, eOpts) {
                            // 關閉所有buttons
                            me.setButtonsDisabled(
                                obj.getDockedItems('toolbar[dock=top] button'), true);
                            store.clearFilter(true);

                            if (typeof store.lastOptions != 'undefined') delete store.lastOptions;
                            // reset pagingtoolbar
                            store.totalCount = 0;

                            var paging = obj.getDockedItems('toolbar[dock=bottom]')[0];
                            if (typeof paging != 'undefined') {
                                paging.updateInfo();
                            }
                        },
                        load: function(store, record, successful, eOpts) {
                            var mdp = me.up('overpanelmasterdetail');

                            if (typeof mdp != 'undefined' && mdp.down() != me
                                && mdp.down().getSelectionModel().selected.length > 0) {
                                me.setButtonsDisabled(
                                    obj.getDockedItems('toolbar[dock=top] button[loadEnabled=true]'), false);
                            }
                            me.setButtonsDisabled(
                                obj.getDockedItems('toolbar[dock=top] button[allowMulti=true]'), true);
                            me.setButtonsDisabled(
                                obj.getDockedItems('toolbar[dock=top] button[allowMulti=false]'), true);
                        }
                    }, this, {
                        single: true,
                        delay: 500
                    });

                    // tips true 滑過去會跑出所有文字
                    var tipsFields = obj.query('[tips=true]');
                    Ext.each(tipsFields, function(field) {
                        field.renderer = function(value, p, r) {
                            var tip = "<div style='line-height: 16px; word-wrap: break-word; word-break: normal;'>"
                                    + Ext.util.Format.nl2br(r.get(field.dataIndex)) + "</div>";
                            p.tdAttr = 'data-qtip="' + tip + '"';

                            return value;
                        }
                    });
                },

                select: function(obj, record, index, eOpts) {
                    this.selectItems(obj, record, index, eOpts);
                },

                deselect: function(obj, record, index, eOpts) {
                    this.selectItems(obj, record, index, eOpts);
                }
            }
        });

        me.callParent(arguments);
    }
});