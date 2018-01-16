<?php
require "../../../../../init.php";

// $sysConnDebug = true;

$start = isset($_POST['start']) ? $_POST['start'] : 0;
$limit = isset($_POST['limit']) ? $_POST['limit'] : 0;
$sort = isset($_POST['sort'])? json_decode(str_replace("\\", "", $_POST['sort'])) : '';
$sortBy = isset($_POST['sort'])? $sort[0]->property : '';
$dir = isset($_POST['sort']) ? $sort[0]->direction : 'ASC';
$filters = isset($_POST['filter']) ? $_POST['filter'] : '';
$result = [];

$table = CPS_TABLE_USER_PROFILE;

$user_name = $sysSession->user_name;

$dbColumns = [
    'mysql' => "SQL_CALC_FOUND_ROWS *",
    'mssql' => "{$table}.corp_id,
            {$table}.user_name,
            {$table}.department,
            {$table}.title,
            {$table}.name,
            {$table}.mobile_phone,
            {$table}.email,
            {$table}.authorization_item,
            {$table}.created_date,
            {$table}.last_login_time",
    'oci8' => "{$table}.corp_id,
            {$table}.user_name,
            {$table}.department,
            {$table}.title,
            {$table}.name,
            {$table}.mobile_phone,
            {$table}.email,
            {$table}.authorization_item,
            {$table}.created_date,
            {$table}.last_login_time"
];
$column = $dbColumns[SYS_DBTYPE];

$whereClause = "user_name != 'admin'";
$orderby = "{$table}.created_date ASC";

$getTotalSql = "SELECT COUNT(*) FROM {$table} WHERE {$whereClause}";
// 列表資料
$sql['list'] = [
    'mysql' => "SELECT {$column} FROM {$table} WHERE {$whereClause} LIMIT {$start}, {$limit}",
    'mssql' => "SELECT * FROM
                (
                    SELECT
                        ROW_NUMBER() OVER (ORDER BY {$orderby}) AS row, {$column}, ({$getTotalSql}) as total
                    FROM {$table}
                    WHERE {$whereClause}
                ) result
                WHERE result.row
                BETWEEN {$start} + 1 AND {$start} + {$limit}",
    'oci8' => "SELECT {$column} FROM {$table} WHERE {$whereClause} LIMIT {$start}, {$limit}"
];

$records = dbGetAll($sql['list'][SYS_DBTYPE]);
$total = dbGetTotal($records);

$result['result'] = $records;
$result['total'] = $total;

echo json_encode($result);
$sysConn = null;