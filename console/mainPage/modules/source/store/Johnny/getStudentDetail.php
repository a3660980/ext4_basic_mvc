<?php
require "../../../../../init.php";

$result = [];
$table = "studentscore";
$whereClause = '1=1';

$searchColumn = [
    'score',
    'semester',
    'subject',
    'operator',
];

$searchValue = isset($_GET['searchValue']) ? trim($_GET['searchValue']) : null;
$whereClause = get_where_clause_with_live_search($whereClause, $searchColumn, $searchValue);

$limit = isset($_POST['limit']) ? trim($_POST['limit']) : 0;
$start = isset($_POST['start']) ? trim($_POST['start']) : 0;
$sql="SELECT * FROM {$table} where {$whereClause} LIMIT {$start}, {$limit}";

$records = dbGetAll($sql);
$total = dbGetTotal($records);
$result['total'] = $total;
$result['result'] = $records;

echo json_encode($result);
closeConn();