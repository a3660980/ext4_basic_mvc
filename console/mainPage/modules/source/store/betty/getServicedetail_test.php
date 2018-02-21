<?php
require "../../../../../init.php";

// $sysConnDebug = true;

// result defination

$result = [];
$sql = [];
// 宣告資料儲存陣列
$table = 'joinme_brand_log';
// 要用的資料表
$whereClause = '1=1';
// 條件永遠成立
$filter = isset($_POST['filter']) ? json_decode(trim($_POST['filter'])) : null;  //json_decode:字符串转换
//($_POST['filter'])，過濾器，在MASTER中對應DETAIL索引，然後才可以過濾出相等的東西
if ($filter == null) {
    echo json_encode($result);
    return;
}
$searchColumn = [
    'hand_gasoline_offer'
    
       // 所要搜尋的欄位名稱
];

$searchValue = isset($_GET['searchValue']) ? trim($_GET['searchValue']) : null;
$whereClause = get_where_clause_with_live_search($whereClause, $searchColumn, $searchValue);

$limit = isset($_POST['limit']) ? trim($_POST['limit']) : 0;
$start = isset($_POST['start']) ? trim($_POST['start']) : 0;
$getTotalSql = "SELECT COUNT(*) FROM {$table} where {$whereClause}";

$sql="SELECT * FROM {$table} where {$whereClause} LIMIT {$start}, {$limit}";

// 根據whereClase輸入的值來搜尋整個資料表


$records = dbGetAll($sql);
$total = dbGetTotal($records);
// output result
$result['total'] = $total;
$result['result'] = $records;

echo json_encode($result);
// 輸出搜尋結果
$sysConn = null;