<?php
require "../../../../../init.php";

// $sysConnDebug = true;

// result defination
$result = [];
$sql = [];

// db execution
$table1 = CPS_TABLE_USER_ACCOUNT;
$table2 = CPS_TABLE_USER_ORGANIZATION;
$table3 = CPS_TABLE_USER_PROFILE;

$searchValue = isset($_POST['query']) ? trim($_POST['query']) : null;
$whereClause = "{$table1}.user_identity <> 9 AND {$table3}.user_name IS null";

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

if($searchValue != null)
    $whereClause .= " AND {$table1}.user_name LIKE '{$searchValue}%'";

$limit = isset($_POST['limit']) ? trim($_POST['limit']) : 0;
$start = isset($_POST['start']) ? trim($_POST['start']) : 0;

$dbColumns = [
    'mysql' => "SQL_CALC_FOUND_ROWS {$table1}.*, {$table2}.organization_name, {$table2}.organization_parent_id",
    'mssql' => "{$table1}.*, {$table2}.organization_name, {$table2}.organization_parent_id",
    'oci8' => "{$table1}.*, {$table2}.organization_name, {$table2}.organization_parent_id"
];
$column = $dbColumns[SYS_DBTYPE];
$joinOn1 = "{$table1}.user_organization_id = {$table2}.organization_id";
$joinOn2 = "{$table1}.user_name = {$table3}.user_name";
$orderby = "registration_date DESC";

$getTotalSql = "SELECT COUNT(*) FROM {$table1} INNER JOIN {$table2} ON {$joinOn1} WHERE {$whereClause}";
$sql['get_user_account'] = [
    'mysql' => "SELECT {$column} FROM {$table1} INNER JOIN {$table2} ON {$joinOn1} WHERE {$whereClause} ORDER BY {$orderby} LIMIT {$start}, {$limit}",
    'mssql' => "SELECT * FROM
                (
                    SELECT
                        ROW_NUMBER() OVER (ORDER BY {$orderby}) AS row, {$column}, ({$getTotalSql}) AS total
                    FROM {$table1}
                    INNER JOIN {$table2} ON {$joinOn1}
                    LEFT JOIN {$table3} ON {$joinOn2}
                    WHERE {$whereClause}
                ) result
                WHERE result.row
                BETWEEN {$start} + 1 AND {$start} + {$limit}",
    'oci8' => "SELECT {$column} FROM {$table2} INNER JOIN {$table2} ON {$joinOn1} WHERE {$whereClause} ORDER BY {$orderby} LIMIT {$start}, {$limit}"
];

$records = dbGetAll($sql['get_user_account'][SYS_DBTYPE]);
$total = dbGetTotal($records);
// output result
$result['total'] = $total;
$result['result'] = $records;

echo json_encode($result);
$sysConn = null;