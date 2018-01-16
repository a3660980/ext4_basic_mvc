<?php
require "../../../../../init.php";

// $sysConnDebug = true;

// result defination
$result = [];
$sql = [];

$query = isset($_POST['query']) ? trim($_POST['query']) : null;
$whereClause = '1=1 AND user_status = 1 OR user_status = 2';

// like search
$searchColumn = [
    'user_name',
    'user_phone_number_1',
    'user_mobile_number_1',
    'user_email_1',
    'user_role',
    'user_security',
    combineColumns(['user_lastname_en', 'user_firstname_en']),
    combineColumns(['user_lastname_tw', 'user_firstname_tw']),
    'user_lastname_tw + user_firstname_tw',
    'user_lastname_en + user_firstname_en',
    'organization_name'
];
$searchValue = isset($_GET['searchValue']) ? trim($_GET['searchValue']) : null;
$whereClause = get_where_clause_with_live_search($whereClause, $searchColumn, $searchValue);

$limit = isset($_POST['limit']) ? trim($_POST['limit']) : 0;
$start = isset($_POST['start']) ? trim($_POST['start']) : 0;

// db execution
$table1 = CPS_TABLE_USER_ACCOUNT;
$table2 = CPS_TABLE_USER_ORGANIZATION;

$dbColumns = [
    'mysql' => "SQL_CALC_FOUND_ROWS {$table1}.*, {$table2}.organization_name, {$table2}.organization_parent_id",
    'mssql' => "{$table1}.*, {$table2}.organization_name, {$table2}.organization_parent_id",
    'oci8' => "{$table1}.*, {$table2}.organization_name, {$table2}.organization_parent_id"
];
$column = $dbColumns[SYS_DBTYPE];
$joinOn = "{$table1}.user_organization_id = {$table2}.organization_id";
$orderby = "registration_date DESC";

$getTotalSql = "SELECT COUNT(*) FROM {$table2} INNER JOIN {$table1} ON {$joinOn} where {$whereClause}";
$sql['get_user_account'] = [
    'mysql' => "SELECT {$column} FROM {$table2} INNER JOIN {$table1} ON {$joinOn} where {$whereClause} ORDER BY {$orderby} LIMIT {$start}, {$limit}",
    'mssql' => "SELECT * FROM
                (
                    SELECT
                        ROW_NUMBER() OVER (ORDER BY {$orderby}) AS row, {$column}, ({$getTotalSql}) as total
                    FROM {$table2}
                    INNER JOIN {$table1} ON {$joinOn}
                    where {$whereClause}
                ) result
                WHERE result.row
                BETWEEN {$start} + 1 AND {$start} + {$limit}",
    'oci8' => "SELECT {$column} FROM {$table2} INNER JOIN {$table1} ON {$joinOn} where {$whereClause} ORDER BY {$orderby} LIMIT {$start}, {$limit}"
];

$records = dbGetAll($sql['get_user_account'][SYS_DBTYPE]);
$total = dbGetTotal($records);
// output result
$result['total'] = $total;
$result['result'] = $records;

echo json_encode($result);
$sysConn = null;