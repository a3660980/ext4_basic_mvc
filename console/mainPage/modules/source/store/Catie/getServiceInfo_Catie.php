<?php
require "../../../../../init.php";

// $sysConnDebug = true;

// result defination
$result = [];
$sql = [];

// db execution
$table = 'profile_c';

$whereClause = '1=1';

// like search
$searchColumn = [
    'student_id',
    'name',
    'gender',
    'email',
    'phone',
    'address',
    'birthday'

];
$searchValue = isset($_GET['searchValue']) ? trim($_GET['searchValue']) : null;
$whereClause = get_where_clause_with_live_search($whereClause, $searchColumn, $searchValue);

$limit = isset($_POST['limit']) ? trim($_POST['limit']) : 0;
$start = isset($_POST['start']) ? trim($_POST['start']) : 0;

$getTotalSql = "SELECT COUNT(*) FROM {$table} where {$whereClause}";
$sql="SELECT * FROM {$table} where {$whereClause} LIMIT {$start},{$limit}";


$records = dbGetAll($sql);
$total = dbGetTotal($records);
// output result
$result['total'] = $total;
$result['result'] = $records;

echo json_encode($result);
$sysConn = null;