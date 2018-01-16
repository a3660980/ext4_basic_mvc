<?php
require "../../../../init.php";

// $sysConnDebug = true;

$result = [];

$table_message_push = CPS_TABLE_MESSAGE_PUSH;
$table_description = CPS_TABLE_APP_DESCRIPTION;

// dp is description talbe mix app_platform
$dbColumns = [
    'mysql' => "SQL_CALC_FOUND_ROWS {$table_message_push}.uuid,
             {$table_message_push}.message_type,
             {$table_message_push}.message_title,
             {$table_message_push}.message_source,
             {$table_message_push}.message_sender,
             {$table_message_push}.message_receiver,
             {$table_message_push}.message_created_date,
             {$table_message_push}.message_notified_date,
             {$table_message_push}.message_received_date,
             {$table_message_push}.message_status,
             {$table_message_push}.message_priority,
             {$table_description}.device_app_name",
    'mssql' => "{$table_message_push}.uuid,
             {$table_message_push}.message_type,
             {$table_message_push}.message_title,
             {$table_message_push}.message_source,
             {$table_message_push}.message_sender,
             {$table_message_push}.message_receiver,
             {$table_message_push}.message_created_date,
             {$table_message_push}.message_notified_date,
             {$table_message_push}.message_received_date,
             {$table_message_push}.message_status,
             {$table_message_push}.message_priority,
             {$table_description}.device_app_name",
    'oci8' => "{$table_message_push}.uuid,
             {$table_message_push}.message_type,
             {$table_message_push}.message_title,
             {$table_message_push}.message_source,
             {$table_message_push}.message_sender,
             {$table_message_push}.message_receiver,
             {$table_message_push}.message_created_date,
             {$table_message_push}.message_notified_date,
             {$table_message_push}.message_received_date,
             {$table_message_push}.message_status,
             {$table_message_push}.message_priority,
             {$table_description}.device_app_name"
];
$column = $dbColumns[SYS_DBTYPE];

$whereClause = "(Year(message_created_date) = Year(GetDate()) and
        Month(message_created_date)= Month(GetDate()) and
        Day(message_created_date) = Day(GetDate()))";

// like search columns
$searchColumn = ["message_receiver", "message_sender"];
$searchValue = isset($_GET['searchValue']) ? urldecode(trim($_GET['searchValue'])): '';
// for extjs searchfield use
$whereClause = get_where_clause_with_live_search($whereClause, $searchColumn, $searchValue);

$joinonClause = "{$table_message_push}.device_app_id = {$table_description}.device_app_id";

$count = isset($_POST['limit']) ? $_POST['limit']: 0;
$start = isset($_POST['start']) ? $_POST['start']: 0;

$orderby = "message_created_date DESC";

$getTotalSql = "SELECT COUNT(*) as total FROM {$table_message_push} INNER JOIN {$table_description} ON {$joinonClause} where {$whereClause}";
$records_total = dbGetAll($getTotalSql);
$sql['get_message_push'] = [
    'mysql' => "SELECT {$column} FROM {$table_message_push} INNER JOIN {$table_description} ON {$joinonClause} ORDER BY {$orderby} LIMIT {$start},{$count}",
    'mssql' => "SELECT * FROM
                (
                    SELECT
                        ROW_NUMBER() OVER (ORDER BY {$orderby}) AS row, {$column}
                    FROM {$table_message_push}
                    INNER JOIN {$table_description} ON {$joinonClause}
                    where {$whereClause}
                ) result
                WHERE result.row
                BETWEEN {$start} + 1 AND {$start} + {$count}",
    'oci8' => "SELECT {$column} FROM {$table_message_push} INNER JOIN {$table_description} ON {$joinonClause} ORDER BY {$orderby} LIMIT {$start},{$count}"
];

$records = dbGetAll($sql['get_message_push'][SYS_DBTYPE]);
$total = dbGetTotal($records_total);

// output result
$result['total'] = $total;
$result['result'] = $records;

echo json_encode($result);
$sysConn = null;