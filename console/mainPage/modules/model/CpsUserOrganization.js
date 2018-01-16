Ext.define('Console.model.CpsUserOrganization', {
	extend: 'Ext.data.Model',
	fields: [
    	{
    		name: 'corp_id',
    		type: 'string'
    	}, {
    		name: 'organization_id',
    		type: 'string'
    	}, {
    		name: 'organization_code',
    		type: 'string'
    	}, {
    		name: 'organization_name',
    		type: 'string'
    	}, {
    		name: 'organization_picture',
    		type: 'string'
    	}, {
    		name: 'organization_parent_id',
    		type: 'string'
    	}, {
    		name: 'created_date',
    		type: 'string'
    	}, {
    		name: 'updated_date',
    		type: 'string'
    	}, {
    		name: 'operator',
    		type: 'string'
    	}
	]
});
