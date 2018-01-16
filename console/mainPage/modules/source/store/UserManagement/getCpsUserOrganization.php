<?php
require "../../../../../init.php";

// $sysConnDebug = true;

// result defination
$result = [];
$sql = [];

$organization_id = isset($_POST['organization_id']) ? trim($_POST['organization_id']): null;

// db execution
$table = CPS_TABLE_USER_ORGANIZATION;

$dbColumns = [
    'mysql' => "SQL_CALC_FOUND_ROWS *",
    'mssql' => "*",
    'oci8' => "*"
];
$column = $dbColumns[SYS_DBTYPE];
$whereClause = $organization_id
            ? "{$table}.organization_parent_id = '$organization_id'"
            : "{$table}.organization_parent_id is NULL";

$getTotalSql = "SELECT COUNT(*) FROM {$table} WHERE {$whereClause}";
$sql['get_user_organization'] = [
	'mysql'	=> "SELECT {$column} FROM {$table} WHERE {$whereClause}",
	'mssql'	=> "SELECT {$column} FROM {$table} WHERE {$whereClause}",
	'oci8'=> "SELECT {$column} FROM {$table} WHERE {$whereClause}"
];

// output result
$result['result'] = dbGetAll($sql['get_user_organization'][SYS_DBTYPE]);
$result['total'] = count($result['result']);

echo json_encode($result);
$sysConn = null;