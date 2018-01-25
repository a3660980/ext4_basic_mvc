Ext.define('Console.store.HotelHomepage.HomeSort', {//因為值是固定的，所以可以直接寫死，不必另外寫PHP處理
    extend: 'Ext.data.Store',
    fields: [
        {
            name: 'value'
        }
    ],
    data: [
        {
            value: '1'
        }, {
            value: '2'
        }, {
            value: '3'
        }, {
            value: '4'
        }, {
            value: '5'
        }, {
            value: '6'
        }, {
            value: '7'
        }, {
            value: '8'
        }, {
            value: '9'
        }, {
            value: '10'
        }
    ]
});
