Ext.define('Console.controller.AccountProfile', {
	extend: 'Ext.app.Controller',

	stores: [
        'AccountProfile'
    ],
    models: [
        'AccountProfile'
    ],
	views: [
		'AccountProfile.TabPanel',
		'AccountProfile.FormProfile'
	],

	init: function() {
        var me = this;

		me.control({
			'apformprofile': {
				afterrender: me.setFormProfileValues
			}
		});
	},

	setFormProfileValues: function(obj, e0pts) {
		var store = this.getStore('AccountProfile');
		store.reload();

		var record = store.getAt(0);

		obj.getForm().loadRecord(record);

		if(record.get('server_expire_date') != null && record.get('server_expire_date') != '') {
			var field = Ext.getCmp('field-server-expire-date');
			field.show();
			field.labelCell.setVisible(true);
			obj.doComponentLayout();
			obj.doLayout();
		}
	}
});