Ext.define('Console.controller.Viewport', {
	extend: 'Ext.app.Controller',

	views: ['Console.view.Viewport'],

    refs: [
        {
            ref: 'mainViewport',
            selector: 'mainviewport'
        }
    ],

	init: function() {
        var me = this;

		me.control({

			'northpanel menuitem[action=new_tab_account_profile]': {
				click: this.addTab
			},
			'northpanel menuitem[action=new_tab_system_configuration]': {
				click: this.addTab
			},
			'northpanel menuitem[action=new_tab_device_information]': {
				click: this.addTab
			},
			'northpanel menuitem[action=new_tab_session_management]': {
                click: this.addTab
            },
            'northpanel menuitem[action=new_tab_service_log]': {
                click: this.addTab
            },
			'northpanel menuitem[action=new_tab_message_queue]': {
				click: this.addTab
			},
			'northpanel menuitem[action=new_tab_message_log]': {
				click: this.addTab
			},
			'northpanel menuitem[action=new_tab_basic_information]': {
                click: this.addTab
            },
            'northpanel menuitem[action=new_tab_permission_level]': {
                click: this.addTab
            },
            'northpanel menuitem[action=new_tab_user_blockade]': {
                click: this.addTab
            },
            'northpanel menuitem[action=new_tab_remote_control]': {
                click: this.addTab
            },
			'northpanel menuitem[action=new_tab_access_setting]': {
				click: this.addTab
			},
			'northpanel menuitem[action=new_tab_change_password]': {
				click: this.addTab
			},
			'northpanel menuitem[action=new_tab_external_contact]': {
				click: this.addTab
			},
			'northpanel menuitem[action=new_tab_MW_ant]': {
				click: this.addTab
			},
			'northpanel menuitem[action=new_tab_joinme_gas_brand]': {
				click: this.addTab
			},
			'northpanel menuitem[action=new_tab_joinme_gas_station]': {
				click: this.addTab
			},
			'northpanel button[action=new_tab_acl]': {
				click: this.addTab
			},
			'northpanel button[action=new_tab2]': {
				click: this.addTab
			},
			'northpanel menuitem[action=new_tab_hank_wang]': {
                click: this.addTab
            },
            'northpanel menuitem[action=new_tab_hank_wang_2]': {
                click: this.addTab
            },
			'northpanel button[action=logout]': {
				click: this.logout
			},
			'southpanel button[action=send_mail]': {
				click: this.sendMail
			},

			/*'northpanel menuitem[action=new_tab_show]': {
                click: this.addTab
            },*/
            'northpanel menuitem[action=new_tab_demo]': {
                click: this.addTab
            },
            'northpanel menuitem[action=new_tab_momo]': {
                click: this.addTab
            },
			'northpanel menuitem[action=clickmela]': {
				click: this.addTab
			},
			'northpanel menuitem[action=clickmela2]': {
				click: this.addTab
			},
			'northpanel menuitem[action=clickone]': {
				click: this.addTab
			},
			'northpanel menuitem[action=clicktwo]': {
				click: this.addTab
			},
			'northpanel menuitem[action=btn_Student]': {
				click: this.addTab
			},
			'northpanel menuitem[action=btn_Subject]': {
				click: this.addTab
			},
			'northpanel menuitem[action=btn_HomePage]': {
				click: this.addTab
			},
			'northpanel menuitem[action=btn_Branch]': {
				click: this.addTab
			},
			'northpanel menuitem[action=btn_BranchPhoto]': {
				click: this.addTab
			},
			'northpanel menuitem[action=btn_BranchRoom]': {
				click: this.addTab
			},
			'northpanel menuitem[action=btn_BranchRoomPhoto]': {
				click: this.addTab
			},
			'northpanel menuitem[action=btn_homePage_t]': {
				click: this.addTab
			},
			'northpanel menuitem[action=hotel_homepage]': {
				click: this.addTab
			},
			'northpanel menuitem[action=hotel_branch]': {
				click: this.addTab
			},
			'northpanel menuitem[action=hotel_photo]': {
				click: this.addTab
			},
			'northpanel menuitem[action=hotel_room]': {
				click: this.addTab
			},
			'northpanel menuitem[action=hotel_detail]': {
				click: this.addTab
			},
			'northpanel menuitem[action=btn_emp]':{
				click: this.addTab
			},
			'northpanel menuitem[action=btn_Hotelbranch]':{
				click: this.addTab
			},
			'northpanel menuitem[action=btn_HotelbranchPicture]':{
				click: this.addTab
			},
			'northpanel menuitem[action=btn_HotelRoom]':{
				click: this.addTab
			},
			'northpanel menuitem[action=btn_HotelRoomPicture]':{
				click: this.addTab
			},
			'northpanel menuitem[action=btn_emp2]':{
				click: this.addTab
			},
			'northpanel menuitem[action=btn_zoetest]':{
				click: this.addTab
			}
		});
	},

	

	// function宣告
	checkUserSessionExist: function() {
        var me = this;

		// 請在每個資料庫(新增/刪除/修改/查詢)或其他AJAX動作、新增tab動作執行此方法
		// 執行方式:	(內部Controller)this.checkUserSessionExist();
		// 			(外部Controller)this.getController('Viewport').checkUserSessionExist();
		var isExist = false;

		// 由於Ext.Ajax.request()方法為非同步
		// 需要透過event觸發後續回傳動作
		// 不然會影響後續程式碼沒辦法動作(原因: return動作已執行)
		Ext.Ajax.on("requestcomplete", function(conn, response, options, eOpts) {
			var text = response.responseText;
			var json = Ext.decode(text);

			if (json.success == true) {
				isExist = true;
			}
		});

		Ext.Ajax.request({
			url: './modules/source/controller/Viewport/checkUserSessionExist.php',
			async: false,
			success: function(response) {
				var text = response.responseText;
				var json = Ext.decode(text);

				if (! json.success) {
					Ext.MessageBox.show({
						title: MSG['msg_box_error'],
						msg: MSG['login_timeout'] + '<br />' + MSG['login_again'],
						width: 300,
						buttons: Ext.MessageBox.OK,
						icon: Ext.MessageBox.ERROR,
                        fn: function() {
                            // destroy view
                            if (me.getMainViewport()) {
                                me.getMainViewport().destroy();
                            }

                            window.location = '../index.php';
                            return;
                        }
					});
				}
			}
		});

		return isExist;
	},

	logout: function() {
		Ext.Ajax.request({
			url: './modules/source/controller/Viewport/logoutUserSession.php',
			async: false,
			success: function(response) {
				window.location = '../index.php';
			},
			failure: function(response, opts) {
    		}
		}
		);
	},

	sendMail: function() {
		// 檢查session是否還存在
		var isSessionExist = this.checkUserSessionExist();
		if (! isSessionExist) return;

		window.location = 'mailto:service@streams.com.tw';
	},

	addTab: function(btn) {
		// 檢查session是否還存在
		var isSessionExist = this.checkUserSessionExist();
		if (! isSessionExist)	return;

		tabpanel = btn.up('northtoolbar').up('northpanel').up('viewport').down('centerpanel');

		var itemId = null;
		var title = null;
		var xtype = null;
		// 依據按鈕itemId判斷應該tab顯示的內容與標題
		if(btn.getId() == 'account-profile') {
			itemId = 'tab-account-profile';
			title = MSG['account_profile'];
			xtype = 'aptabpanel';
		} else if (btn.getId() == 'system-configuration') {
			itemId = 'tab-system-configuration';
			title = MSG['system_configuration'];
			xtype = 'sctabpanel';
		} else if  (btn.getId() == 'device-information') {
			itemId = 'tab-device-information';
			title = MSG['device_information'];
			xtype = 'ditabpanel';
		} else if  (btn.getId() == 'session-management') {
            itemId = 'tab-session-management';
            title = MSG['session_management'];
            xtype = 'smtabpanel';
        } else if  (btn.getId() == 'service-log') {
            itemId = 'tab-service-log';
            title = MSG['service_log'];
            xtype = 'sltabpanel';
        } else if  (btn.getId() == 'message-queue') {
			itemId = 'tab-message-queue';
			title = MSG['message_queue'];
			xtype = 'mqtabpanel';
		} else if  (btn.getId() == 'message-log') {
			itemId = 'tab-message-log';
			title = MSG['message_log'];
			xtype = 'mltabpanel';
		} else if (btn.getId() == 'basic-information') {
            itemId = 'tab-basic-information';
            title = MSG['basic_information'];
            xtype = 'umtabpanel';
        } else if (btn.getId() == 'permission-level') {
            itemId = 'tab-permission-level';
            title = MSG['permission_level'];
            xtype = 'pltabpanel';
        } else if (btn.getId() == 'user-blockade') {
            itemId = 'tab-user-blockade';
            title = MSG['user_blockade'];
            xtype = 'ubtabpanel';
        } else if (btn.getId() == 'remote-control') {
            itemId = 'tab-remote-control';
            title = MSG['remote_control'];
            xtype = 'rctabpanel';
        } else if (btn.getId() == 'access-setting') {
			itemId = 'tab-access-setting';
			title = MSG['access_setting'];
			xtype = 'astabpanel';
		} else if (btn.getId() == 'change-password') {
			itemId = 'tab-change-passowrd';
			title = MSG['change_password'];
			xtype = 'cptabpanel';
		}else if (btn.getId() == 'external-ant') {
			itemId = 'tab-external-ant';
			title = MSG['external_contact_1'];
			xtype = 'ectabpanel';
		}else if (btn.getId() == 'MW_ant') {
			itemId = 'tab-external-ant-2';
			title = MSG['MW_ant'];
			xtype = 'ectabpanel2';
		}
		else if (btn.getId() == 'joinme_gas_brand') {
			itemId = 'tab-joinme-gas-brand';
			title = MSG['joinme_gas_brand'];
			xtype = 'gbtabpanel';
		}
		else if (btn.getId() == 'joinme_gas_station') {
			itemId = 'tab-joinme-gas-station';
			title = MSG['joinme_gas_station'];
			xtype = 'gstabpanel';
		}
		else if (btn.getId() == 'hank_wang') {
			itemId = 'tab-hank-wang';
			title = MSG['external_contact'];
			xtype = 'hktabpanel';
		}
		else if (btn.getId() == 'hank_wang_2') {
			itemId = 'tab-hank-wang_2';
			title = MSG['external_contact_2'];
			xtype = 'ectabpanel';
		}
		else if (btn.getId() == 'demo') {
			itemId = 'new_tab_demo';
			title = MSG['demo'];
			xtype = 'dintabpanel';		
		}
		else if (btn.getId() == 'momo') {
			itemId = 'new_tab_momo';
			title = MSG['momo'];
			xtype = 'dinpanelmasterdetail';		
		}
		else if (btn.getId() == 'clickme') {
			itemId = 'clickmebt';
			title = MSG['click_me'];
			xtype = 'yoyotabpanel';		
		}
		else if (btn.getId() == 'clickme2') {
			itemId = 'clickmebt2';
			title = MSG['click_me2'];
			xtype = 'New_TabPanel_humhum';		
		}
		else if(btn.getId()=='clickone'){

			itemId='clickone1';
			title=MSG['click_one'];
			xtype='bettytabpanel';

		}
		else if(btn.getId()=='clicktwo'){
			itemId='clicktwo';
			title=MSG['click_two'];
			xtype='bettytabpanel2';

		}
		else if(btn.getId()=='btn_Student'){
			itemId='btn_Student';
			title=MSG['btn_Student'];
			xtype='johnnyTabPanel';
		}
		else if(btn.getId()=='btn_Subject'){
			itemId='btn_Subject';
			title=MSG['btn_Subject'];
			xtype='johnnyDetailTabPanel';
		}
		else if(btn.getId()=='btn_HomePage'){
			itemId='btn_HomePage';
			title=MSG['btn_HomePage'];
			xtype='johnnyHomePageTabPanel';
		}
		else if(btn.getId()=='btn_Branch'){
			itemId='btn_Branch';
			title=MSG['btn_Branch'];
			xtype='johnnyBranchTabPanel';
		}
		else if(btn.getId()=='btn_BranchRoom'){
			itemId='btn_BranchRoom';
			title=MSG['btn_BranchRoom'];
			xtype='johnnyBranchRoomTabPanel';
		}
		else if(btn.getId()=='btn_BranchPhoto'){
			itemId='btn_BranchPhoto';
			title=MSG['btn_BranchPhoto'];
			xtype='johnnyBranchPhotoTabPanel';
		}
		else if(btn.getId()=='btn_BranchRoomPhoto'){
			itemId='btn_BranchRoomPhoto';
			title=MSG['btn_BranchRoomPhoto'];
			xtype='johnnyBranchRoomPhotoTabPanel';
		}
		else if(btn.getId()=='btn_homePage_t'){
			itemId='btn_homePage_t';
			title=MSG['btn_homePage_t'];
			xtype='bhtabpanel';
		}
		else if(btn.getId()=='hotel-homepage'){
			itemId='hotel-homepage';
			title=MSG['hotel_homepage'];
			xtype='hothomtabpanel';
		}
		else if(btn.getId()=='hotel-branch'){
			itemId='hotel-branch';
			title=MSG['hotel_branch'];
			xtype='hotbratabpanel';
		}
		else if(btn.getId()=='hotel-photo'){
			itemId='hotel-photo';
			title=MSG['hotel_photo'];
			xtype='hotphotabpanel';
		}
		else if(btn.getId()=='hotel-room'){
			itemId='hotel-room';
			title=MSG['hotel_room'];
			xtype='hotrootabpanel';
		}
		else if(btn.getId()=='hotel-detail'){
			itemId='hotel-detail';
			title=MSG['hotel_detail'];
			xtype='hotdettabpanel';
		}
		else if(btn.getId()=='btn_emp'){
			itemId='btn-emp';
			title='人事資料';
			xtype='zoetabpanel';
		}else if(btn.getId()=='btn_Hotelbranch'){
			itemId='btn_Hotelbranch';
			title=MSG['btn_Hotelbranch'];
			xtype='bhbtabpanel';
		}else if(btn.getId()=='btn_HotelbranchPicture'){
			itemId='btn_HotelbranchPicture';
			title=MSG['btn_HotelbranchPicture'];
			xtype='bbptabpaneldetail';
		}else if(btn.getId()=='btn_HotelRoom'){
			itemId='btn_HotelRoom';
			title=MSG['btn_HotelRoom'];
			xtype='bhrtabpanel';
		}else if(btn.getId()=='btn_HotelRoomPicture'){
			itemId='btn_HotelRoomPicture';
			title=MSG['btn_HotelRoomPicture'];
			xtype='brptabpanedetail';
		}else if(btn.getId()=='btn_emp2'){
			itemId='btn-emp2';
			title='考績資料';
			xtype='zoedetailtabpanel';
		}else if (btn.getId() == 'btn_zoetest') {
			itemId='btn-zoetest';
			title='學生資料';
			xtype='zoetabpanel2';
		}
		
		

		var n = tabpanel.getComponent(itemId);

		if (! n) {
			n = tabpanel.add({
				itemId: itemId,
				title: title,
				items: [
    				{
    					xtype: xtype
    				}
				],
                autoDestroy: false,
				closable: true
			});
		}

		tabpanel.setActiveTab(n);
        tabpanel.doLayout();

        //日期查詢恢復原狀
        var resetArr = [
        	'clotabpanel','costabpanel',
        	'caotabpanel','ctatabpanel',
        	'cattabpanel','catutabpanel',
        	'mptabpanel','rumtabpanel',
        	'sdtabpanel','rdatabpanel',
        	'dertabpanel','dritabpanel',
        	'dttabpanel','dtrtabpanel',
        	'dsetabpanel','trtabpanel',
			'dltabpanel','pctabpanel',
			'cctabpanel','clgtabpanel',
			'aicatabpanel','msttabpanel',
			'mstxtabpanel','cltutabpanel'
        ];

        if(Ext.Array.contains(resetArr, xtype)){
        	this.resetStore(n);
        }

		if (n.down(xtype) != null) {
            n.down(xtype).setHeight(n.getHeight());
        }
	},

	resetStore: function(tappanal){
		var panel = tappanal.down().down();
		var type = panel.xtype

		//判斷是否有master-detail
		if(type.includes("gridmaster")){
			grid = panel;
		}else{
			grid = panel.down();
		}

      	var store = grid.getStore();
      	var proxy = store.getProxy();
      	var url = proxy.api.read;

      	var tmp = url.split('?');
      	if(tmp.length>1){
            store.loadPage(1);
        }
        proxy.api.read = tmp[0];
      	store.setProxy(proxy);
      	store.reload();
	}
});
