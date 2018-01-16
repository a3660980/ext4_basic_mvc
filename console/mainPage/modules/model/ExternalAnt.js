Ext.define('Console.model.ExternalAnt', {
	extend: 'Ext.data.Model',
	fields: [
    	{
    		name: 'student_id',
    		type: 'Number'
    	}, {
    		name: 'name',
    		type: 'string'
    	}, {
    		name: 'gender',
    		type: 'string'
    	}, {
    		name: 'email',
    		type: 'string'
    	}, {
    		name: 'phone',
    		type: 'string'
    	}, {
    		name: 'birthday',
    		type: 'string'
    	},{
            name: 'address',
            type: 'string'
        }
	]
});