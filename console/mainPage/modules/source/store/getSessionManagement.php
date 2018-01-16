<?php
require "../../../../init.php";

// $sysConnDebug = true;

$result = [];

$table_session = CPS_TABLE_USER_SESSION;
$table_description = CPS_TABLE_APP_DESCRIPTION;

$where = "Year(session_start_date) = Year(GetDate()) and
        Month(session_start_date)= Month(GetDate()) and
        Day(session_start_date) = Day(GetDate())";

// dp is description talbe mix app_platform
$dbColumns = [
    'mysql' => "SQL_CALC_FOUND_ROWS {$table_session}.session_id,
             {$table_session}.session_user_name,
             {$table_session}.session_start_date,
             {$table_description}.device_app_name",
    'mssql' => "{$table_session}.session_id,
             {$table_session}.session_user_name,
             {$table_session}.session_start_date,
             {$table_description}.device_app_name",
    'oci8' => "{$table_session}.session_id,
             {$table_session}.session_user_name,
             {$table_session}.session_start_date,
             {$table_description}.device_app_name"
];
$column = $dbColumns[SYS_DBTYPE];
$joinonClause = "{$table_session}.device_app_id = {$table_description}.device_app_id";

$count = isset($_POST['limit']) ? $_POST['limit']: 0;
$start = isset($_POST['start']) ? $_POST['start']: 0;

$orderby = "session_start_date DESC";

$getTotalSql = "SELECT COUNT(*) as total FROM {$table_session} INNER JOIN {$table_description} ON {$joinonClause} where {$where}";
$records_total = dbGetAll($getTotalSql);
$sql['get_user_session'] = [
    'mysql' => "SELECT {$column} FROM {$table_session} INNER JOIN {$table_description} ON {$joinonClause} ORDER BY {$orderby} LIMIT {$start},{$count}",
    'mssql' => "SELECT * FROM
                (
                    SELECT
                        ROW_NUMBER() OVER (ORDER BY {$orderby}) AS row, {$column}
                    FROM {$table_session}
                    INNER JOIN {$table_description} ON {$joinonClause}
                    where {$where}
                ) result
                WHERE result.row
                BETWEEN {$start} + 1 AND {$start} + {$count}",
    'oci8'  => "SELECT {$column} FROM {$table_session} INNER JOIN {$table_description} ON {$joinonClause} ORDER BY {$orderby} LIMIT {$start},{$count}"
];

$records = dbGetAll($sql['get_user_session'][SYS_DBTYPE]);
$total = dbGetTotal($records_total);

// output result
$result['total'] = $total;
$result['result'] = $records;

echo json_encode($result);
$sysConn = null;