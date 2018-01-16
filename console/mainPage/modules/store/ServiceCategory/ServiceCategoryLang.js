Ext.define('Console.store.ServiceCategory.ServiceCategoryLang', {//因為值是固定的，所以可以直接寫死，不必另外寫PHP處理
    extend: 'Ext.data.Store',
    fields: [
        {
            name: 'display'
        }, {
            name: 'category_identity'
        }
    ],
    data: [
        {
            display: '預設',
            category_identity: '0'
        }, {
            display: '消費者',
            category_identity: '1'
        }, {
            display: '司機',
            category_identity: '2'
        }, {
            display: '企業客戶',
            category_identity: '3'
        }, {
            display: '車行',
            category_identity: '5'
        }, {
            display: '全鋒(派遣或客服)',
            category_identity: '6'
        }, {
            display: '全鋒(主管)',
            category_identity: '7'
        }
        
    ]
});