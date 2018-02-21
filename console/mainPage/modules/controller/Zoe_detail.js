Ext.define('Console.controller.Zoe_detail',{
	extend: 'Ext.app.Controller',
	
	stores: [
	    'zoe.Service_zoe',
        'zoe.Servicedetail_zoe'
	],

	models: [
	    'zoe.Service_zoe',
        'zoe.Servicedetail_zoe'
	],

	views:[
	    //'zoe.TabPanel_zoe',
	    //'zoe.GridMaster_zoe',
        'zoe_detail.DetailTabPanel_zoe',
        'zoe_detail.DetailGridMaster_zoe',
        'zoe_detail.DetailGridMaster_zoe2',
        'zoe_detail.DetailGrid',
        'zoe_detail.DetailFormAdd_zoe',
        'zoe_detail.DetailFormEdit_zoe',
        'zoe_detail.DetailActionPanel_zoe'
	],
	
	refs:[ //主要是用於下方control辨識的id
	   {
	    	ref: 'masterGrid',
	    	selector: 'zoedetailgridmaster2'
	   },{
	    	ref: 'actionPanel',
	    	selector: 'zoedetailactionpanel'
	   },{ //如果是form要放在actionpanel上記得要加到對應的actionPanel上
	    	ref: 'formAdd',
	    	selector: 'zoedetailformadd'
	   },{
	    	ref: 'formEdit',
	    	selector: 'zoedetailformedit'
	   },{
            ref: 'detailGrid',
            selector: 'zoedetailgrid'           
       }
	    

	],
	config: {
        formAddTitle: '新增考績資料',
        formEditTitle: '修改考績資料',
        addRequestUrl: './modules/source/controller/zoe_detail/addServicedetail_zoe.php',
        editRequestUrl: './modules/source/controller/zoe_detail/editServicedetail_zoe.php'
    },

	init :function(){
		var me = this;

		me.control({
			'zoedetailgridmaster2': {
                select: me.selectMasterList,
                deselect: me.deselectMasterList
            },
            'zoedetailgrid': {
                select: me.selectDetailList,
                deselect: me.deselectDetailList
            },
            'zoedetailgrid button[action=add_data]':{
            	click: me.adddata
            },
            'zoedetailgrid button[action=edit_data]':{
            	click: me.editdata
            },
            'zoedetailgrid button[action=delete_data]':{
            	click: me.deletedata
            },
            'zoedetailformadd button[action=detail_form_confirm]':{
            	click: me.addConfirm
            },
            'zoedetailformadd button[action=detail_form_cancel]':{
            	click: me.addCancel
            },
            'zoedetailformedit button[action=detail_form_confirm]':{
            	click: me.editConfirm
            },
            'zoedetailformedit button[action=detail_form_cancel]':{
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

    selectMasterList: function(obj, record, index, eOpts) {
        var me = this;
        var count = obj.getCount(); //取得選擇數量
        var store = me.getDetailGrid().getStore();//取得detail的store
        //var formEdit = me.getFormEdit(); //因為是detail所以是放到detailgridmaster下方的detailgrid故不用抓form
        
        //當選擇的筆數只有1筆就載入資料到detailgrid，不然就清空detailgrid的store資料
        if (count == 1) {
            store.clearFilter(true); //clearFilter:取消過濾並顯示所有數據 
            store.filter([//filter:在store內過濾資料
                {property: 't_id', value: record.get('t_id')}//前面是detail表的t_id後面是gridmaster的t_id
            ]);
            store.reload(); //每次都抓不同的資料，所以重置store
        } else {
            store.removeAll();
        }
    },

    deselectMasterList: function(obj, record, index, eOpts) {
        var me = this;
        var count = obj.getCount();//選取幾筆資料      
        var formEdit = me.getFormEdit();
        var store = me.getDetailGrid().getStore();//取得detail的store

        if (count == 1) {              
            /*store.clearFilter(true);
            store.filter([
                {property: 't_id', value: record.get('t_id')}
            ]);
            store.reload(); */
            var deselectRecord = obj.selected.items[0];
            me.loadFormReocrd(formEdit, deselectRecord);

            store.clearFilter(true);
            store.filter('t_id', deselectRecord.get('t_id'));

            store.reload();
        } else {
            store.removeAll();
        }
    },

    selectDetailList: function(obj, record, index, eOpts) {
        var me = this;
        var count = obj.getCount(); //取得選擇數量
        var formEdit = me.getFormEdit();
        
        //當選擇的筆數只有1筆就載入資料到detailgrid，不然就清空detailgrid的store資料
        if (count == 1) {
            //me.loadDetailFormRecord(formEdit, deselectRecord);
            me.loadFormReocrd(formEdit,record);
        } else {
            formEdit.getForm().reset();
        }
    },

    deselectDetailList: function(obj, record, index, eOpts) {
        var me = this;
        var count = obj.getCount();//選取幾筆資料      
        var formEdit = me.getFormEdit();

        if (count == 1) {
            var deselectRecord = obj.selected.items[0]; 
            //.selected=>override=>grid=>selecteditem
            me.loadFormReocrd(formEdit, deselectRecord);
        } else {
            formEdit.getForm().reset(); //編輯表單刷新
        }
    },

    showForm: function(formPanel, title){
		var me = this;
		//console.log('showform');
		 me.checkSession(); 

        var actionPanel = me.getActionPanel(); 
        var isCollapse = actionPanel.getCollapsed(); //折疊,判斷是否已開啟actionPanel
        var isHidden = formPanel.isHidden(); //指定要開的form是否已開啟

        formPanel.getForm().reset();


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

    loadFormReocrd: function(form, record) {
        form.loadRecord(record);
    },

    loadDetailFormRecord: function(form, record) {
        form.loadRecord(record); //將record的資料載進指定的form
    },

    adddata: function(btn){
    	var me = this;
    	var form = me.getFormAdd();  //這裡如果抓不到form就檢查是不是沒放到actionPanel
		var title = me.getFormAddTitle();
		//取得選取的那比資料的pk
		var store = me.getDetailGrid().getStore();
        var record = me.getMasterGrid().getSelectionModel().getSelection()[0];
        var t_id = record.data['t_id'];

		me.showForm(form, title);

		//把上面的t_id指給detailgrid的t_id
        form.getForm().findField('t_id').setValue(t_id);
    },

    addConfirm: function(btn) {
        var me = this;
        me.checkSession();

        var actionPanel = me.getActionPanel();  //觸動的actionPanle
        var formPanel = me.getFormAdd();        //從哪頁新增/修改
        var form = formPanel.getForm();         //這個要確認是什麼意思??
        var grid = me.getMasterGrid();
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

    editdata: function(btn){
    	var me = this;
    	var form = me.getFormEdit();  //這裡如果抓不到form就檢查是不是沒放到actionPanel
		var title = me.getFormAddTitle();
		//取得選取的那比資料的pk
        var record = me.getDetailGrid().getSelectionModel().getSelection()[0];

		me.showForm(form, title);
		me.loadFormReocrd(form, record);

    },

    editConfirm: function(btn) {
        var me = this;
        me.checkSession();

        var actionPanel = me.getActionPanel();  //觸動的actionPanle
        var formPanel = me.getFormEdit();        //從哪頁新增/修改
        var form = formPanel.getForm();         //這個要確認是什麼意思??
        var grid = me.getMasterGrid();
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

    deletedata:function(btn){
    	var me = this;
    	me.checkSession();

    	var grid = me.getDetailGrid();
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