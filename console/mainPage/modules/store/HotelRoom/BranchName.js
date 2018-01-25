Ext.define('Console.store.HotelRoom.BranchName', {
    extend: 'Ext.data.Store',
    model: 'Console.model.HotelBranch.HotelBranch',
    proxy: {
        type: 'ajax',
        url: './modules/source/store/HotelRoom/getBranchName.php',
        reader: {
            type: 'json',
            root:'result'
        }
    }
});
