<?php
require "../../../../init.php";

// $sysConnDebug = true;

// result defination
$result = [];
$sql = [];

// db execution
$table = CIMOBILE_TABLE_SERVICE_CATEGORY;

$limit = isset($_POST['limit']) ? trim($_POST['limit']) : 0;
$start = isset($_POST['start']) ? trim($_POST['start']) : 0;

$whereClause = "{$table}.category_name is not null";
$orderby = "updated_date DESC";

$sql['get_service_type'] = [
    'mysql' => "SELECT * FROM {$table} WHERE {$whereClause} ORDER BY {$orderby} LIMIT {$start}, {$limit}",
    'mssql' => "SELECT * FROM {$table} WHERE {$whereClause} ORDER BY {$orderby} LIMIT {$start}, {$limit}",
    'oci8' => "SELECT * FROM {$table} WHERE {$whereClause} ORDER BY {$orderby} LIMIT {$start}, {$limit}"
];

$records = dbGetAll($sql['get_service_type'][SYS_DBTYPE]);
$total = dbGetTotal($records);
// output result
$result['total'] = $total;
$result['result'] = $records;

echo json_encode($result);
$sysConn = null;