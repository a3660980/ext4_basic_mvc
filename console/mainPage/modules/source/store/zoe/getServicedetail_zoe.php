<?php
require "../../../../../init.php";


$result = [];
$sql = [];

// db execution
$table = 'tmsperformancedata';

$whereClause = "1=1";

$corp_id = $sysSession->corp_id;

// 這裡的search指的是gridmaster畫面右上方的search欄位與畫面上的顯示欄位無關，如套用override.js的searchfieldmvc裡面不可包含日期欄位
// 如連日期都要search就要另寫controller
$searchColumn = [
    't_id',
    'p_year',
    'p_part1',
    'p_part2',
    'p_total',
    'p_grade'
];
$searchValue = isset($_GET['searchValue']) ? trim($_GET['searchValue']) : null;
$whereClause = get_where_clause_with_live_search($whereClause, $searchColumn, $searchValue);
//透過一個開放的函式去傳出一個私有成員的值

$limit = isset($_POST['limit']) ? trim($_POST['limit']) : 0;
$start = isset($_POST['start']) ? trim($_POST['start']) : 0;

//$getTotalSql = "SELECT COUNT(*) FROM {$table} where {$whereClause}";
$sql="SELECT * FROM {$table} where {$whereClause} LIMIT {$start},{$limit}";


$records = dbGetAll($sql); //dbgetall 回傳資料使用陣列格式
$total = dbGetTotal($records); //dbGetTotal回傳總數 不受limit影響
// output result
$result['total'] = $total;
$result['result'] = $records;

echo json_encode($result);
$sysConn = null;


/*$result = [];

// POST or SESSION variable
$corp_id = $sysSession->corp_id;

// where (過濾器)
$filter = isset($_POST['filter']) ? json_decode(trim($_POST['filter'])) : null;  //json_decode:字符串转换
//($_POST['filter'])，過濾器，在MASTER中對應DETAIL索引，然後才可以過濾出相等的東西
if ($filter == null) {
    echo json_encode($result);
    return;
}
$table = 'tmsperformancedata';
$table1= 'tmsempdata';
$t_id = json_decode($_POST['filter'])[0]->value;
$whereClause = "t_id = '{$t_id}'";
$joinOn = '{$table}.t_id = {$table1}.t_id';
// db execution

$dbColumns = [
    'mysql' => "SQL_CALC_FOUND_ROWS *" , //SQL_CALC_FOUND_ROWS:分頁

    'mssql' => "*"
];
$column = $dbColumns[SYS_DBTYPE];

// master select query
$searchColumn = [
     't_id',
     'p_year',
     'p_part1',
     'p_part2',
     'p_total',
     'p_grade'
 ];

$searchValue = isset($_GET['searchValue']) ? $_GET['searchValue'] : '';  //$_GET['searchValue']:得到我們在收尋列裡面的資料
// for extjs searchfield use
$whereClause = get_where_clause_with_live_search($whereClause, $searchColumn, $searchValue);
//get_where_clause_with_live_search:方法，去依照searchValue得到的內容找資料
$joinOn = "{$table}.t_id = {$table1}.t_id";
$sql = [];

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
$sysConn = null;*/
?>