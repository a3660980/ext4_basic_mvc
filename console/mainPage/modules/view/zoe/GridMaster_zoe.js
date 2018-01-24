Ext.define('Console.view.zoe.GridMaster_zoe',{
	extend:'Console.override.Grid',
	alias: 'widget.zoegridmaster',  //alias指的是取別名,widget是固定字，後面是自己取的名字

	requires: [
        'Ext.ux.ProgressBarPager',
        'Ext.ux.form.SearchField'
    ],

    plugins: [      
        {
            ptype: 'rowexpander',//名稱前有+,可展開收縮
            rowBodyTpl: new Ext.XTemplate(  //使用模板擴充數組
                '<div class="rowexpander-row">',
                '<p><b>test</b></p>', 
                '</div>'
            )  
        }
    ],

    selType: 'checkboxmodel',

    config:{
    	store: 'zoe.Service_zoe'
    },

    initComponents: function(){
    	var me = this;

    	Ext.apply(me,{
    		store : me.getStore(),
    		columns: [
    		    {
    		    	header: MSG['id_ct'],
    		    	dataIndex:'t_id',
    		    	fiex:1
    		    },{
    		    	header: MSG['name_ct'],
    		    	dataIndex:'t_name',
    		    	fiex:1
    		    },{
    		    	header: MSG['department'],
    		    	dataIndex: 't_dep',
    		    	fiex:1
    		    },{
    		    	header: MSG['t_date1'],
    		    	dataIndex: 't_date1',
    		    	fiex:1
    		    },{
    		    	header: MSG['t_date2'],
    		    	dataIndex: 't_date2',
    		    	fiex:1
    		    }
    		],
    		tbar:[
    		    {
    		    	text: MSG['add_user'],
    		    	action: 'add_user'
    		    },{
    		    	text: MSG['edit_user'],
    		    	action: 'edit_user',
    		    	allowMulti: false,
    		    },{
    		    	text: MSG['delete_user'],
    		    	action: 'delete_user',
    		    	allowMulti: true
    		    },{
    		    	text: MSG['p_total'],
    		    	action: 'p_total',
    		    	allowMulti: true,
    		    	disabled: true,

    		    },'->',{
    		    	xtype: 'searchfieldmvc',
    		    	store: me.getStore(),
    		    	fieldLabel: MSG['search'],
    		    	labelWidth: 50,
    		    	width: 200
    		    }
    		],
    		bbar:[
    		    {
    		    	xtype: 'pagingtoolbar',
    		    	store: me.getStore(),
    		    	displayInfo: true,
    		    	plugins: new Ext.ux.ProgressBarPager()
    		    }
    		]

    	});

    	me.callParent(arguments);

    }

	
});