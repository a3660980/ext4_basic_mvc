Ext.define('Console.view.NorthToolbar', {
    //若要刪除NorthToolbar的項目，
    //必須連index.js->buttons and controllers一起刪掉，才不會發生錯誤
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.northtoolbar',

    activeItem: 0,
    margins: '5 5 5 5',

    initComponent: function() {
        var me = this;

        Ext.apply(me, {
            defaults: {
                hidden: true
            },
            items: [
                {
                    id: 'study-a',
                    text: MSG['study_a'],
                    defaults: {
                        hidden: true
                    },
                    menu: [
                        {
                            id: 'hank_wang',
                            text: MSG['external_contact'],
                            action: 'new_tab_hank_wang'
                        }//, {
                        //     id: 'master-detail-a',
                        //     text: MSG['master_detail'],
                        //     action: 'new_tab_master_detail_a'
                        //  },{
                        //     id: 'hank_wang_2',
                        //     text: MSG['external_contact_2'],
                        //     action: 'new_tab_hank_wang_2'
                        // }
                    ]
                }, {
                    id: 'study-b',
                    text: MSG['study_b'],
                    defaults: {
                        hidden: true
                    },
                    menu: [
                        {
                            id: 'external-ant',
                            text: MSG['external_contact_1'],
                            action: 'new_tab_external_contact'
                        }, {
                            id: 'MW_ant',
                            text: MSG['MW_ant'],
                            action: 'new_tab_MW_ant'
                        }, {
                            id:'joinme_gas_brand',
                            text: MSG['joinme_gas_brand'],
                            action: 'new_tab_joinme_gas_brand'
                        }, {
                            id:'joinme_gas_station',
                            text: MSG['joinme_gas_station'],
                            action:'new_tab_joinme_gas_station'
                        }
                    ]
                }, {
                    id: 'study-c',
                    text: MSG['study_c'],
                    defaults: {
                        hidden: true
                    },
                    menu: [
                         /*{
                            id: 'how',
                            text: MSG['show'],
                            action: 'new_tab_show'
                        }
                        , */{
                            id: 'demo',
                            text: MSG['demo'],
                            action: 'new_tab_demo'
                        },
                        {
                            id: 'momo',
                            text: MSG['momo'],
                            action: 'new_tab_momo'
                        }
                    ]
                }, {

                    id: 'study-d',
                    text: MSG['study_d'],
                    defaults: {
                        hidden: true
                    },
                    menu: [
                        {
                            id: 'clickme',
                            text: MSG['click_me'],
                            action: 'clickmela'
                        },
                        {
                            id: 'clickme2',
                            text: MSG['click_me2'],
                            action: 'clickmela2'
                        }
                    ]
                },{
                    id: 'study-e',
                    text: MSG['study_e'],
                    defaults: {
                        hidden: true
                    },
                   
                    menu: [
                        {
                            id: 'clickone',
                            text: MSG['click_one'],
                            action:'clickone'
                        },
                        {
                            id: 'clicktwo',
                            text: MSG['click_two'],
                            action:'clicktwo'
                        }   
                    ]

                },{
                    id: 'study-f',
                    text: MSG['study_f'],
                    defaults: {
                        hidden: true
                    },
                   
                    menu: [
                        {
                            id: 'btn_Student',
                            text: MSG['btn_Student'],
                            action:'btn_Student'
                        },
                        {
                            id: 'btn_Subject',
                            text: MSG['btn_Subject'],
                            action:'btn_Subject'
                        }
                    ]

                },{
                    id: 'study-g',
                    text: '施文薰',
                    defaults: {
                        hidden: true
                    },
                    menu:[
                        {
                            id:'btn_emp',
                            text:'人事資料',
                            action:'btn_emp'

                        }
                    ]
                },{
                    id: 'hotel_johnny',
                    text: MSG['hotel_johnny'],
                    defaults: {
                        hidden: true
                    },
                   
                    menu: [
                        {
                            id: 'btn_HomePage',
                            text: MSG['btn_HomePage'],
                            action:'btn_HomePage'
                        }
                    ]

                },{
                    id: 'hotel_betty',
                    text: MSG['hotel_betty'],
                    defaults: {
                        hidden: true
                    },
                   
                    menu: [
                        {
                            id: 'btn_homePage_t',
                            text: MSG['btn_homePage_t'],
                            action:'btn_homePage_t'
                        }
                    ]

                },{
                    id: 'femobile_hotel',
                    text: MSG['femobile_hotel'],
                    defaults: {
                        hidden: true
                    },
                   
                    menu: [
                        {
                            id: 'hotel-branch',
                            text: MSG['hotel_branch'],
                            action:'hotel_branch'
                        }
                    ]

                },
                    {
                      hidden: false,
                      xtype: 'tbfill'
                },  {
                    hidden: false,
                    text: MSG['logout'],
                    action: 'logout'
                }
            ]
        });

        me.callParent(arguments);
    }

});
