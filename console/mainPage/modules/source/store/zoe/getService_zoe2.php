<?php
require "../../../../../init.php";


$result = [];
$sql = [];

// db execution
$table = 'profile_zoe';
//$table2 = 'tmsdepdata';

$whereClause = '1=1'; //永遠條件成立

// 這裡的search指的是gridmaster畫面右上方的search欄位與畫面上的顯示欄位無關，如套用override.js的searchfieldmvc裡面不可包含日期欄位
// 如連日期都要search就要另寫controller
$searchColumn = [
    's_id',
    'name',
    'sex',
    'email',
    'phone',
    'address'
];
$searchValue = isset($_GET['searchValue']) ? trim($_GET['searchValue']) : null;
$whereClause = get_where_clause_with_live_search($whereClause, $searchColumn, $searchValue);
//透過一個開放的函式去傳出一個私有成員的值

$limit = isset($_POST['limit']) ? trim($_POST['limit']) : 0;
$start = isset($_POST['start']) ? trim($_POST['start']) : 0;

$getTotalSql = "SELECT COUNT(*) FROM {$table} where {$whereClause}";
$sql="SELECT * FROM {$table} where {$whereClause} LIMIT {$start},{$limit}";
//$sql="SELECT * FROM {$table} LEFT join {$table2} on t_dep = d_no where {$whereClause} order by t_id LIMIT {$start},{$limit}";


$records = dbGetAll($sql); //dbgetall 回傳資料使用陣列格式
$total = dbGetTotal($records); //dbGetTotal回傳總數 不受limit影響
// output result
$result['total'] = $total;
$result['result'] = $records;

echo json_encode($result);
$sysConn = null;

?>