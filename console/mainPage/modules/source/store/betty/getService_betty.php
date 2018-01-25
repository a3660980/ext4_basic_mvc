<?php
require "../../../../../init.php";

$result = [];
$sql = [];
// $sysConnDebug = true;//測試用
// db execution
$table = 'profile_c';//要使用的資料表名稱

$whereClause = '1=1'; //永遠條件成立

// 要搜尋的欄位名稱，日期搜尋要另外寫
$searchColumn = [
    'student_id',
    'name',
    'gender',
    'email',
    'phone',
    'address'
];

$searchValue = isset($_GET['searchValue']) ? trim($_GET['searchValue']) : null;//取搜尋框中要搜尋的值
//結果= ( 條件) ? "條件為真":"條件為假";判斷變數是否存在?"清除空白":"空值";
$whereClause = get_where_clause_with_live_search($whereClause, $searchColumn, $searchValue);
//$searchColumn like $searchValue搜尋,get_where_clause_with_live_search自己定義的函數

$limit = isset($_POST['limit']) ? trim($_POST['limit']) : 0;//限制筆數
$start = isset($_POST['start']) ? trim($_POST['start']) : 0;

$getTotalSql = "SELECT COUNT(*) FROM {$table} where {$whereClause}";//where永遠成立
$sql="SELECT * FROM {$table} where {$whereClause}";
// -- where  LIMIT {$start},{$limit}


$records = dbGetAll($sql); //dbgetall 回傳資料使用陣列格式
$total = dbGetTotal($records); //dbGetTotal回傳總數 不受limit影響
// output result
$result['total'] = $total;
$result['result'] = $records;

echo json_encode($result);//php回傳json格式

$sysConn = null;//在db.php中,$sysConn = new PDO($db_connection, $db_username, $db_password);