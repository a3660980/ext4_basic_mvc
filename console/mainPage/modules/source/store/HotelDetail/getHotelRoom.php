<?php
require "../../../../../init.php";
// ini_set('display_error', true);
// $sysConnDebug = true;
$result = [];
$sql = [];

// db execution
$table_branch = 'femobile_hotel_branch';
$table_room = 'femobile_hotel_room';
$user_name = $sysSession->user_name;

$column = "";
$dbColumns = [
    'mysql' => "{$table_room}.*, {$table_branch}.branch_name"
];
$column = $dbColumns[SYS_DBTYPE];

$whereClause = '1=1'; //永遠條件成立
$orderby = "{$table_room}.room_sort";
// like search 對應db格式
$searchColumn = [
    
];
$searchValue = isset($_GET['searchValue']) ? trim($_GET['searchValue']) : null;
$whereClause = get_where_clause_with_live_search($whereClause, $searchColumn, $searchValue);
//透過一個開放的函式去傳出一個私有成員的值

$limit = isset($_POST['limit']) ? trim($_POST['limit']) : 0;
$start = isset($_POST['start']) ? trim($_POST['start']) : 0;

$getTotalSql = "SELECT COUNT(*) FROM {$table_room} where {$whereClause}";
$sql="SELECT {$column} FROM {$table_room} 
LEFT JOIN {$table_branch}
ON {$table_branch}.branch_id = {$table_room}.branch_id
where {$whereClause} ORDER BY {$orderby} LIMIT {$start},{$limit}";


$records = dbGetAll($sql); 
$total = dbGetTotal($records); 
$data = [];
foreach ($records as $key => $value) {
	if(!empty($value['created_date'])){
        $value['created_date'] =date("Y-m-d H:i",strtotime($value['created_date']));
    }
    if(!empty($value['updated_date'])){
        $value['updated_date'] =date("Y-m-d H:i",strtotime($value['updated_date']));
    }
    
    array_push($data, $value);
}
// output result
$result['total'] = $total;
$result['result'] = $data;

echo json_encode($result);
$sysConn = null;