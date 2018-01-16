Ext.define('Console.store.ServiceInfo.ServiceInfoLang', {//因為值是固定的，所以可以直接寫死，不必另外寫PHP處理
    extend: 'Ext.data.Store',
    fields: [
        {
            name: 'display'
        }, {
            name: 'service_identity'
        }
    ],
    data: [
        {
            display: '預設',
            service_identity: '0'
        }, {
            display: '消費者',
            service_identity: '1'
        }, {
            display: '司機',
            service_identity: '2'
        }, {
            display: '企業客戶',
            service_identity: '3'
        }, {
            display: '車行',
            service_identity: '5'
        }, {
            display: '全鋒(派遣或客服)',
            service_identity: '6'
        }, {
            display: '全鋒(主管)',
            service_identity: '7'
        }
        
    ]
});