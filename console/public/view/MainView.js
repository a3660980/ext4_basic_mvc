Ext.define('Login.view.MainView', {
    extend: 'Ext.container.Viewport',

    requires: [
        'Ext.panel.Panel'
    ],

    itemId: 'mainView',
    layout: 'border',

    config: {

        // footer text
        copyright: [
            '西川系統股份有限公司　',
            '版權所有　Copyright©2017 ',
            'Streams System Co., Ltd. All Rights Reserved.'
        ].join(''),
        website: 'http://www.streams.com.tw',
        email: 'service@streams.com.tw',

        // css style color
        formBgColor: 'rgba(241, 241, 241, 0.2)',//a =透明度
        borderColor: 'rgba(241, 241, 241, 0.5)',

        // resource dir
        dir: './resource/default/image/'
    },
    initComponent: function() {
        var me = this;
        var formBgColor = me.getFormBgColor(),
            borderColor = me.getBorderColor()

        Ext.applyIf(me, {
            defaults: {
                border: 0
            },
            items: [
                {
                    xtype: 'panel',
                    region: 'north',
                    height: 70,
                    width: '100%',
                    border: 0,
                    bodyStyle: {
                        backgroundImage: me.getImageResource('title_bg.png', true),
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '100%',
                    },
                    items: [
                        {
                            xtype: 'image',
                            style: {
                                marginLeft: '24px',//靠左對其
                                marginTop: '13px'//靠上對其
                            },
                            src: me.getImageResource('top_bg.png')
                        }
                    ]
                },
                {
                    region: 'center',
                    xtype: 'container',
                    layout: 'fit',
                    defaults: {
                        border: 0
                    },
                    items: [
                        {
                            layout: 'border',
                            xtype: 'panel',
                            style: {
                                margin: '0 auto'
                            },
                            defaults: {
                                border: 0
                            },
                            items: [
                                {
                                    region: 'center',
                                    style: {
                                        textAlign: "center"
                                    },
                                    items: [
                                        {
                                            xtype: 'image',
                                            style: {
                                                margin: '0 auto',
                                                display: 'block',
                                                marginTop: '165px'
                                            },
                                            src: me.getImageResource('logo_description.png')
                                        }
                                    ]
                                },
                                {
                                    region: 'east',
                                    items: [
                                        {
                                            xtype: 'loginform',
                                            style: {
                                                marginTop: '140px',
                                                marginRight: '160px',
                                                background: me.getImageResource('form_bg.png', true),
                                                backgroundRepeat: 'no-repeat',
                                                border: 0
                                            },
                                            bodyStyle: {
                                                border: 0,
                                            },
                                            headerBgColor: 'rgba(241, 241, 241, 0)'
                                        }
                                    ]
                                }
                            
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    region: 'south',
                    height: 48,
                    bodyStyle: {
                        borderTop: 0,
                        color: '#f0f0f0',
                        fontWeight: 'normal',
                        fontFamily: 'Calibri',
                        textAlign: 'center'
                    },
                    border: 1,
                    html: [
                        '<div class="footer" style="margin-top: 10px;">',
                        '<p class="copyright" style="width: 560px; margin: 0 auto; line-height: 10px;">',
                            '<center style="margin-bottom: 1px;">' + me.getCopyright(),'</center>',
                            '<center>網址：<a target="_blank" href="' + me.getWebsite() + '"',
                            'style="color: #f0f0f0; text-decoration: none;">' + me.getWebsite(),
                            '</a>, 服務信箱：' + me.getEmail() + '</center>',
                        '</p></div>'
                    ].join('')
                }
            ]
        });

        me.callParent(arguments);
    },

    getImageResource: function(name, isCssBackground) {
        var me = this;
        var dir = me.getDir();

        if (isCssBackground) {
            return "url('" + dir + name + "')";
        }

        return dir + name;
    }
});