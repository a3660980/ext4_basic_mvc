Ext.define('Console.store.HotelHomepage.UserI18n', {//因為值是固定的，所以可以直接寫死，不必另外寫PHP處理
    extend: 'Ext.data.Store',
    fields: [
        {
            name: 'value'
        }, {
            name: 'display'
        }
    ],
    data: [
        {
            value: 'tw',
            display: '繁中'
        }, {
            value: 'cn',
            display: '簡中'
        }, {
            value: 'en',
            display: '英文'
        }, {
            value: 'jp',
            display: '日文'
        }
    ]
});
