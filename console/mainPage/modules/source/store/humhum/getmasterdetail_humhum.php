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
$table = 'score_d';
$table1= 'profile_d';
$student_id = json_decode($_POST['filter'])[0]->value;
$whereClause = "student_id = '{$student_id}'";
$joinOn = '{$table}.student_id = {$table1}.student_id';
// db execution

$dbColumns = [
    'mysql' => "SQL_CALC_FOUND_ROWS *" , //SQL_CALC_FOUND_ROWS:分頁

    'mssql' => "*"
];
$column = $dbColumns[SYS_DBTYPE];

// master select query
$searchColumn = [   //限制收尋的欄位是哪幾個
    "{$table}.score",
    "{$table}.semester",
    "{$table}.subject"
    ];

$searchValue = isset($_GET['searchValue']) ? $_GET['searchValue'] : '';  //$_GET['searchValue']:得到我們在收尋列裡面的資料
// for extjs searchfield use
$whereClause = get_where_clause_with_live_search($whereClause, $searchColumn, $searchValue);
//get_where_clause_with_live_search:方法，去依照searchValue得到的內容找資料
$joinOn = "{$table}.student_id = {$table1}.student_id";
$sql = [];

$orderby = "{$table}.subject ASC";

$start = isset($_POST['start']) ? $_POST['start'] : 0;
$limit = isset($_POST['limit']) ? $_POST['limit'] : 0;  //限制幾筆資料

$getTotalSql = "SELECT COUNT(*) FROM {$table} WHERE {$whereClause}";
$sql['get_service_category'] = [
    'mysql'    => "SELECT {$column} FROM {$table} WHERE {$whereClause} ORDER BY {$orderby} LIMIT {$start}, {$limit}",
    'mssql' => "SELECT * FROM
            (
                SELECT
                    ROW_NUMBER() OVER (ORDER BY {$orderby}) AS row, {$column}, ({$getTotalSql}) as total
                FROM {$table}
                where {$whereClause}
            ) result
            WHERE result.row
            BETWEEN {$start} + 1 AND {$start} + {$limit}"
];

$records = dbGetAll($sql['get_service_category'][SYS_DBTYPE]);
$total = dbGetTotal($records);

// output result
$result['total'] = $total;
$result['result'] = $records;

echo json_encode($result);
$sysConn = null;