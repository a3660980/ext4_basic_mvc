Ext.define('Console.model.humhum.model_humhum', {
	extend: 'Ext.data.Model',
	fields: [
    	{
    		name: 'student_id',
    		type: 'varchar'
    	}, {
    		name: 'name',
    		type: 'varchar'
    	}, {
    		name: 'gender',
    		type: 'char'
    	}, {
    		name: 'email',
    		type: 'varchar'
    	}, {
    		name: 'phone',
    		type: 'varchar'
    	}, {
    		name: 'birthday',
    		type: 'varchar'
    	},{
            name: 'address',
            type: 'varchar'
        }
	]
});