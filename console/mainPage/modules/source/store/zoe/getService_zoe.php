<?php
require "../../../../../init.php";


$result = [];
$sql = [];

// db execution
$table = 'tmsempdata';

$whereClause = '1'; //永遠條件成立

// like search 對應db格式
$searchColumn = [
    't_id',
    't_name',
    't_dep',
    't_date1',
    't_date2'
];
$searchValue = isset($_GET['searchValue']) ? trim($_GET['searchValue']) : null;
$whereClause = get_where_clause_with_live_search($whereClause, $searchColumn, $searchValue);
//透過一個開放的函式去傳出一個私有成員的值

$limit = isset($_POST['limit']) ? trim($_POST['limit']) : 0;
$start = isset($_POST['start']) ? trim($_POST['start']) : 0;

$getTotalSql = "SELECT COUNT(*) FROM {$table} where {$whereClause}";
$sql="SELECT * FROM {$table} where {$whereClause} LIMIT {$start},{$limit}";


$records = dbGetAll($sql); //dbgetall 回傳資料使用陣列格式
$total = dbGetTotal($records); //dbGetTotal回傳總數 不受limit影響
// output result
$result['total'] = $total;
$result['result'] = $records;

echo json_encode($result);
$sysConn = null;

?>