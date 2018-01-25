<?php
require "../../../../../init.php";

// $sysConnDebug = true;

$result = [];

// POST or SESSION variable
$corp_id = $sysSession->corp_id;

// where (過濾器)
$filter = isset($_POST['filter']) ? json_decode(trim($_POST['filter'])) : null;  //json_decode:字符串转换
//($_POST['filter'])，過濾器，在MASTER中對應DETAIL索引，然後才可以過濾出相等的東西
if ($filter == null) {
    echo json_encode($result);
    return;
}
$table = 'femobile_hotel_detail';
$table_room = 'femobile_hotel_room';
$branch_id = json_decode($_POST['filter'])[0]->value;
$whereClause = "{$table}.branch_id = '{$branch_id}'";
// db execution

$dbColumns = [
    'mysql' => "{$table}.*, {$table_room}.room_name, {$table_room}.room_spec"
];//, {$table_room}.room_name, {$table_room}.room_spec
$column = $dbColumns[SYS_DBTYPE];

// master select query
$searchColumn = [   //限制收尋的欄位是哪幾個
];

$searchValue = isset($_GET['searchValue']) ? $_GET['searchValue'] : '';  //$_GET['searchValue']:得到我們在收尋列裡面的資料
// for extjs searchfield use
$whereClause = get_where_clause_with_live_search($whereClause, $searchColumn, $searchValue);
//get_where_clause_with_live_search:方法，去依照searchValue得到的內容找資料

$sql = [];

$orderby = "{$table}.room_id, {$table}.detail_sort ASC";

$start = isset($_POST['start']) ? $_POST['start'] : 0;
$limit = isset($_POST['limit']) ? $_POST['limit'] : 0;  //限制幾筆資料

$sql['get_service_category'] = [
    'mysql' => "SELECT {$column} FROM {$table} LEFT JOIN {$table_room} ON {$table_room}.room_id =  {$table}.room_id WHERE {$whereClause} ORDER BY {$orderby} LIMIT {$start}, {$limit}"
];

$records = dbGetAll($sql['get_service_category'][SYS_DBTYPE]);
$total = dbGetTotal($records);


foreach ($records as $key => $value) {
    if(!empty($value['created_date'])){
        $records[$key]['created_date'] =date("Y-m-d H:i",strtotime($value['created_date']));
    }
    if(!empty($value['updated_date'])){
        $records[$key]['updated_date'] =date("Y-m-d H:i",strtotime($value['updated_date']));
    }
}

// output result
$result['total'] = $total;
$result['result'] = $records;

echo json_encode($result);
$sysConn = null;