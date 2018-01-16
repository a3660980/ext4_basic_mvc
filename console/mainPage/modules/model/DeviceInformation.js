Ext.define('Console.model.DeviceInformation', {
	extend: 'Ext.data.Model',
	fields: [
    	{
    		name: 'user_name',
    		type: 'string'
    	}, {
    		name: 'device_app_name',
    		type: 'string'
    	}, {
    		name: 'app_package_version',
    		type: 'string'
    	}, {
    		name: 'device_vendor',
    		type: 'string'
    	}, {
    		name: 'device_model',
    		type: 'string'
    	}, {
    		name: 'device_os',
    		type: 'string'
    	}, {
            name: 'device_updated_date',
            type: 'string'
        }, {
            name: 'registration_date',
            type: 'string'
        }, {
    		name: 'device_status',
    		type: 'string'
    	}, {
    		name: 'device_app_id',
    		type: 'string'
    	}
	]
});
