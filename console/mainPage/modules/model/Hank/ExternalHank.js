Ext.define('Console.model.Hank.ExternalHank', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'student_id',
        type: 'string'
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
    }, {
        name: 'address',
        type: 'string'
    }]
});
//指定fields可進行資料驗證、資料預設值、轉換函數