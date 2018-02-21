<?php
require "../../../../../init.php";

// $sysConnDebug = true;

$result = [];

// POST or SESSION variable
$corp_id = $sysSession->corp_id;

// db execution
$table = 'femobile_hotel_homepage';

$column = "";
$dbColumns = [
    'mysql' => "SQL_CALC_FOUND_ROWS {$table}.*",//取得總筆數
    'mssql' => "{$table}.*"
];
$column = $dbColumns[SYS_DBTYPE];

$whereClause = "1=1";//永遠為真 不必再另行做判斷
$searchColumn = [//要做搜尋之欄位
		];
$searchValue = isset($_GET['searchValue']) ? $_GET['searchValue']: '';
// for extjs searchfield use
$whereClause = get_where_clause_with_live_search($whereClause, $searchColumn, $searchValue);

$orderby = "{$table}.home_sort ASC, {$table}.start_date ASC";

$limit = isset($_POST['limit']) ? trim($_POST['limit']) : 0;//結束
$start = isset($_POST['start']) ? trim($_POST['start']) : 0;//起始

$getTotalSql = "SELECT COUNT(*) FROM {$table} WHERE {$whereClause}";
$sql['get_service_info'] = [//限制每頁顯示數目
    'mysql' => "SELECT {$column} FROM {$table} WHERE {$whereClause} ORDER BY {$orderby} LIMIT {$start}, {$limit}",
    'mssql' => "SELECT * FROM
                (
                    SELECT
                        ROW_NUMBER() OVER (ORDER BY {$orderby}) AS row, {$column}, ({$getTotalSql}) as total
                    FROM {$table} where {$whereClause}
                ) result
                WHERE result.row
                BETWEEN {$start} + 1 AND {$start} + {$limit}"
];

$records = dbGetAll($sql['get_service_info'][SYS_DBTYPE]);
$total = dbGetTotal($records);

foreach ($records as $key => $value) {
    if(!empty($value['start_date'])){
        $records[$key]['start_date'] =date("Y-m-d H:i",strtotime($value['start_date']));
    }
    if(!empty($value['expire_date'])){
        $records[$key]['expire_date'] =date("Y-m-d H:i",strtotime($value['expire_date']));
    }
}
// output result
$result['total'] = $total;
$result['result'] = $records;

echo json_encode($result);
$sysConn = null;