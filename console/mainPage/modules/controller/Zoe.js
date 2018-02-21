Ext.define('Console.controller.Zoe',{
	extend: 'Ext.app.Controller',
	
	stores: [
	    'zoe.Service_zoe',
	],

	models: [
	    'zoe.Service_zoe'
	],

	views:[
	    'zoe.TabPanel_zoe',
	    'zoe.GridMaster_zoe',
	    'zoe.ActionPanel_zoe',
	    'zoe.FormAdd_zoe',
	    'zoe.FormEdit_zoe'
	],
	
	refs:[
	   {
	    	ref: 'grid',
	    	selector: 'zoeGridMaster'	    	
	   },{
	    	ref: 'actionPanel',
	    	selector: 'zoeactionpanel'	    	
	   },{
	    	ref: 'formAdd',
	    	selector: 'zoeformadd'
	   },{
	    	ref: 'formEdit',
	    	selector: 'zoeformedit'
	   }
	    

	],

	config: {
        formAddTitle: '新增員工資料',
        formEditTitle: '修改員工資料',
        addRequestUrl: './modules/source/controller/zoe/addService_zoe.php',
        editRequestUrl: './modules/source/controller/zoe/editService_zoe.php'
    },

	init: function(){
		var me = this;

		me.control({
			'zoeGridMaster': {
                select: me.selectMasterList1,
                deselect: me.deselectMasterList1
            },
			'zoeGridMaster button[action=add_user]': {
				click: me.addData
				//click:function(o){  
                //    alert("test");  
                //} 
			},
			'zoeGridMaster button[action=delete_user]': {
                click: me.deleteData
            },
			'zoeGridMaster button[action=edit_user]': {
				click: me.editData
			},
			'zoeformadd button[action=form_confirm]': {
                click: me.addConfirm
            },
			'zoeformadd button[action=form_cancel]': {
                click: me.addCancel
            },
            'zoeformedit button[action=form_confirm]': {
                click: me.editConfirm
            },
            'zoeformedit button[action=form_cancel]': {
                click: me.editCancel
            }
		});
	},

	checkSession: function() {  //判斷session是否已timeout
        var me = this;
        var isSessionExist = me.getController('Viewport').checkUserSessionExist();
        //checkUserSessionExist新增tab
        if (! isSessionExist) {
            return;
        }
    },

	showForm: function(formPanel, title){
		var me = this;
		//console.log('showform');
		 me.checkSession(); 

        var actionPanel = me.getActionPanel(); 
        var isCollapse = actionPanel.getCollapsed(); //折疊,判斷是否已開啟actionPanel
        var isHidden = formPanel.isHidden(); //指定要開的form是否已開啟

        if (isHidden && !isCollapse){ //如果指定的from沒有開啟但actionPanel畫面開啟中(意指actionPanel沒有折疊其isCollapse不等於false)，就跳錯誤訊息
        	Ext.MessageBox.show({ //顯示提示
                title: MSG['msg_box_info'],
                msg: MSG['plz_close'], //內容:請先關閉其它視窗再動作
                width: 300,
                buttons: Ext.MessageBox.OK, //按鈕確認
                icon: Ext.MessageBox.INFO //圖標連接
            });
        } else if (!isHidden && !isCollapse) { //actionPanel畫面開啟且為指定開啟的from時不做任何動作
        } else {
        	//開啟畫面
        	formPanel.show(); //顯示表單(內)
            actionPanel.setTitle(title); //設定標題
            actionPanel.doLayout(); //內容刷新
            actionPanel.expand(true); //(actionpanel)展開
        }

	},

	hideForm: function(formPanel) {
        var me = this;
        me.checkSession();

        var actionPanel = me.getActionPanel(),
            form = formPanel.getForm() //取得開啟的form

        actionPanel.collapse(Ext.Component.DIRECTION_RIGHT, true);//擴充 不隱藏新增列
        form.reset(); //資料清除
        formPanel.hide(); //隱藏
        actionPanel.doLayout(); //輸出
    },

	selectMasterList1: function(obj, record, index, eOpts) {
        var me = this;
        var count = obj.getCount(); //取得選擇數量
        var formEdit = me.getFormEdit();

        //當選擇的筆數只有1筆就載入資料到指定form，不然就清空form資料
        if (count == 1) {
            me.loadFormReocrd(formEdit, record);
        } else {
            formEdit.getForm().reset();
        }
    },

    deselectMasterList1: function(obj, record, index, eOpts) {
        var me = this;
        var count = obj.getCount();
        var formEdit = me.getFormEdit();

        if (count == 1) {
            var deselectRecord = obj.selected.items[0]; 
            //.selected=>override=>grid=>selecteditem
            me.loadFormReocrd(formEdit, deselectRecord);
        } else {
            formEdit.getForm().reset(); //編輯表單刷新
        }
    },

    loadFormReocrd: function(form, record) {
        form.loadRecord(record); //將record的資料載進指定的form
    },

    addData: function(btn){		
		var me = this;
		var form = me.getFormAdd();
		var title = me.getFormAddTitle();
		//alert('addform:'.form);    
		me.showForm(form, title);
	},

	addConfirm: function(btn) {
        var me = this;
        me.checkSession();

        var actionPanel = me.getActionPanel();  //觸動的actionPanle
        var formPanel = me.getFormAdd();        //從哪頁新增/修改
        var form = formPanel.getForm();         //這個要確認是什麼意思??
        var grid = me.getGrid();
        var store = grid.getStore();

        //確認addfrom的必填欄位是否都已經填入
        if(! form.isValid()){
        	return ;
        }

        form.submit({
        	url : me.getAddRequestUrl(),
        	method : 'POST',
        	submitEmptyText: false,
        	//有可能新增成功也有可能失敗
            success: function() {
            	actionPanel.collapse(Ext.Component.DIRECTION_RIGHT, true);  //把addform關閉

            	Ext.MessageBox.show({
                    title: MSG['msg_box_info'],
                    msg: MSG['add_success'],
                    width: 250,
                    buttons: Ext.MessageBox.OK, 
                    fn: function(btn) {
                        if (btn == 'ok') {
                            grid.afterRequest(store, formPanel); 
                            // .afterRequest可調回函數請求完成後清理(請求成功)
                        }
                    },
                    icon: Ext.MessageBox.INFO
                });

            },

            failure: function(obj,action) {
            	var err_msg = null;

            	switch (action.failureType) {
                    case Ext.form.action.Action.CLIENT_INVALID: 
                    //CLIENT_INVALID - 填入資料的資料類型有誤
                        error_msg = MSG['form_invalid']; //顯示:填入欄位資料有誤
                        break;
                    case Ext.form.action.Action.CONNECT_FAILURE:
                    //CONNECT_FAILURE伺服器發送請求時發生通信錯誤時返回失敗類型
                        error_msg = MSG['server_connect_fail']; //顯示:連接伺服器失敗！
                        break;
                    case Ext.form.action.Action.SERVER_INVALID: //ex:pk的資料重覆
                    //當伺服器端處理失敗時返回失敗類型(內)
                        error_msg = action.result.msg;
                        break;
                    }

                Ext.MessageBox.show({
                    title: MSG['msg_box_error'],
                    msg: error_msg,
                    width: 250,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.INFO
                });            	

            }
        });
        
    },

	addCancel: function(btn) {
        var me = this;
        var form = me.getFormAdd();

        me.hideForm(form);
    },

	editData: function(btn){
		var me = this;
		var form = me.getFormEdit();
		    title = me.getFormEditTitle();
		    record = me.getGrid().getSelectionModel().getSelection()[0]; //帶入勾選的資料，但因為只帶一筆資料，故指定列數為0

		//1.打開頁面 2.載入資料
		me.showForm(form,title);
		me.loadFormReocrd(form,record);
	},

	editConfirm: function(btn) {
        var me = this;
        me.checkSession();

        var actionPanel = me.getActionPanel();  //觸動的actionPanle
        var formPanel = me.getFormEdit();        //從哪頁新增/修改
        var form = formPanel.getForm();         //這個要確認是什麼意思??
        var grid = me.getGrid();
        var store = grid.getStore();
        //var record = grid.getSelectionModel().getSelection()[0];

        //確認editfrom的必填欄位是否都已經填入
        if(! form.isValid()){
        	return ;
        }

        form.submit({
        	url : me.getEditRequestUrl(),
        	method : 'POST',
        	submitEmptyText: false,
        	//有可能新增成功也有可能失敗
            success: function() {
            	actionPanel.collapse(Ext.Component.DIRECTION_RIGHT, true);  //把addform關閉

            	Ext.MessageBox.show({
                    title: MSG['msg_box_info'],
                    msg: MSG['edit2_success'],
                    width: 250,
                    buttons: Ext.MessageBox.OK, 
                    fn: function(btn) {
                        if (btn == 'ok') {
                        	//afterRequest用來更新store的資料內容
                            grid.afterRequest(store, formPanel); 
                        }
                    },
                    icon: Ext.MessageBox.INFO
                });

            },

            failure: function(obj,action) {
            	var err_msg = null;

            	switch (action.failureType) {
                    case Ext.form.action.Action.CLIENT_INVALID: 
                    //CLIENT_INVALID - 填入資料的資料類型有誤
                        error_msg = MSG['form_invalid']; //顯示:填入欄位資料有誤
                        break;
                    case Ext.form.action.Action.CONNECT_FAILURE:
                    //CONNECT_FAILURE伺服器發送請求時發生通信錯誤時返回失敗類型
                        error_msg = MSG['server_connect_fail']; //顯示:連接伺服器失敗！
                        break;
                    case Ext.form.action.Action.SERVER_INVALID: //ex:pk的資料重覆
                    //當伺服器端處理失敗時返回失敗類型(內)
                        error_msg = action.result.msg;
                        break;
                    }

                Ext.MessageBox.show({
                    title: MSG['msg_box_error'],
                    msg: error_msg,
                    width: 250,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });            	

            }
        });
        
    },

    editCancel: function(btn) {
        var me = this;
        var form = me.getFormEdit();

        me.hideForm(form);
    },

    deleteData:function(btn){
    	var me = this;
    	me.checkSession();

    	var grid = me.getGrid();
        var store = grid.getStore();
        //getSelectionModel是指先從grid中取得選擇器模式，然後在選擇器模式中用getSelections()取得勾選的資料。
        var record = grid.getSelectionModel().getSelection();

        //var length = record.length;
        //msg = MSG['delete_confirm_header'] + length + MSG['delete_confirm_footer'];
        msg = MSG['delete_confirm_header'] + record.length + MSG['delete_confirm_footer'];

        Ext.MessageBox.show({
            title: MSG['msg_box_info'],
            msg: msg,
            width: 300,
            buttons: Ext.MessageBox.YESNO, //.YESNO顯示yes no
            icon: Ext.MessageBox.INFO,
            fn: function(btn){
            	if (btn == 'yes') {
            		//1.要先remove從db抓到store的資料 2.再去db刪資料
            		store.remove(record); //將store中資料移除
            		
            		store.sync({
            			//有可能新增成功也有可能失敗
            			success: function() {
            				Ext.MessageBox.show({
                    			title: MSG['msg_box_info'],
                    			msg: MSG['delete_success'],
                    			width: 250,
                    			buttons: Ext.MessageBox.OK, 
                    			fn: function(btn) {
                        			if (btn == 'ok') {
                            			//afterRequest用來更新store的資料內容,因為是gridmaster故Panel值設null
                            			grid.afterRequest(store, null); 
                        			}
                    			},
                    			icon: Ext.MessageBox.INFO
                			});

           			    },

           			    failure: function() {
           			    	Ext.MessageBox.show({
           			    	    title: MSG['msg_box_info'],
           			    	    msg: MSG['delete_fail'],
           			    	    width: 250,
           			    	    buttons: Ext.MessageBox.OK,
           			    	    icon: Ext.MessageBox.ERROR
                            });
                            //因為刪除失敗所以重load store資料
                            store.reload();
                        }

            		});

            	}

            }
        });



        


    }

    


});