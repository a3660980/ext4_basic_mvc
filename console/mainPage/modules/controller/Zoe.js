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
			'zoeGridMaster button[action=edit_user]': {
				click: me.editData
			},
			'zoeformadd button[action=form_cancel]': {
                click: me.addCancel
            },
            'zoeformedit button[action=form_cancel]': {
                click: me.editCancel
            }
		});
	},

	checkSession: function() {  //判斷是否過期
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

        var actionPanel = me.getActionPanel(), 
            isCollapse = actionPanel.getCollapsed(); //折疊,輸出(actionpanel)
            isHidden = formPanel.isHidden(); //顯示表格(新增或修改的資料)
            
         formPanel.getForm().reset(); //開啟表格
         formPanel.show(); //顯示表單(內)
         actionPanel.setTitle(title); //設定標題(內)
         actionPanel.doLayout(); //刷新(內)
         actionPanel.expand(true); //(actionpanel)展開

        /*if (isHidden && ! isCollapse) { //顯示又不折疊(已經顯示actionpanel，又將原本隱藏的不隱藏)
            Ext.MessageBox.show({ //顯示提示
                title: MSG['msg_box_info'], //標題為:提示
                msg: MSG['plz_close'], //內容:請先關閉其它視窗再動作
                width: 300,
                buttons: Ext.MessageBox.OK, //按鈕確認
                icon: Ext.MessageBox.INFO //圖標連接
            });
        } else if (! isHidden && ! isCollapse) { //不顯示也不摺疊,不動作
             console.log('isCollapse:',isCollapse);
            console.log('isHidden:',isHidden);
        } else { //顯示或折疊其中之一
            formPanel.show(); //顯示表單(內)
            actionPanel.setTitle(title); //設定標題(內)
            actionPanel.doLayout(); //刷新(內)
            actionPanel.expand(true); //(actionpanel)展開
           

            console.log('isCollapse:',isCollapse);
            console.log('isHidden:',isHidden);

        }*/

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
        var count = obj.getCount(); //返回數量
        var formEdit = me.getFormEdit();

        if (count == 1) {
            me.loadFormReocrd(formEdit, record); //載入loadFormReocrd
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
        form.loadRecord(record); //將模型內的字串對應到表單字串(內)
    },

    addData: function(btn){		
		var me = this;
		var form = me.getFormAdd();
		    title = me.getFormAddTitle();
		alert('addform:'.form);    
		me.showForm(form, title);
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

    editCancel: function(btn) {
        var me = this;
        var form = me.getFormEdit();

        me.hideForm(form);
    }

    


});