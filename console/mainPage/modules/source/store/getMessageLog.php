<?php
require "../../../../init.php";

// $sysConnDebug = true;

$table_1 = CPS_TABLE_MESSAGE_PUSH_LOG;
$table_2 = CPS_TABLE_APP_DESCRIPTION;


$count = isset($_POST['limit']) ? $_POST['limit']: 0;
$start = isset($_POST['start']) ? $_POST['start']: 0;


// dp is description talbe mix app_platform
$column = "SQL_CALC_FOUND_ROWS {$table_1}.uuid,
             {$table_1}.message_type,
             {$table_1}.message_title,
             {$table_1}.message_source,
             {$table_1}.message_sender,
             {$table_1}.message_receiver,
             {$table_1}.message_created_date,
             {$table_1}.message_notified_date,
             {$table_1}.message_received_date,
             {$table_1}.message_status,
             {$table_1}.message_priority,
             {$table_2}.device_app_name";
$dbColumns = [
    'mysql' => "SQL_CALC_FOUND_ROWS {$table_1}.uuid,
             {$table_1}.message_type,
             {$table_1}.message_title,
             {$table_1}.message_source,
             {$table_1}.message_sender,
             {$table_1}.message_receiver,
             {$table_1}.message_created_date,
             {$table_1}.message_notified_date,
             {$table_1}.message_received_date,
             {$table_1}.message_status,
             {$table_1}.message_priority,
             {$table_2}.device_app_name",
    'mssql' => "{$table_1}.uuid,
             {$table_1}.message_type,
             {$table_1}.message_title,
             {$table_1}.message_source,
             {$table_1}.message_sender,
             {$table_1}.message_receiver,
             {$table_1}.message_created_date,
             {$table_1}.message_notified_date,
             {$table_1}.message_received_date,
             {$table_1}.message_status,
             {$table_1}.message_priority,
             {$table_2}.device_app_name",
    'oci8' => "{$table_1}.uuid,
             {$table_1}.message_type,
             {$table_1}.message_title,
             {$table_1}.message_source,
             {$table_1}.message_sender,
             {$table_1}.message_receiver,
             {$table_1}.message_created_date,
             {$table_1}.message_notified_date,
             {$table_1}.message_received_date,
             {$table_1}.message_status,
             {$table_1}.message_priority,
             {$table_2}.device_app_name"
];
$column = $dbColumns[SYS_DBTYPE];

$joinonClause = "{$table_1}.device_app_id = {$table_2}.device_app_id";
$orderby = "message_created_date DESC";

// where
$whereClause = "(Year(message_created_date) = Year(GetDate()) and
        Month(message_created_date)= Month(GetDate()) and
        Day(message_created_date) = Day(GetDate()))";

// like search columns
$searchColumn = ["{$table_1}.message_sender", "{$table_1}.message_receiver", "{$table_2}.device_app_name"];
$searchValue = isset($_GET['searchValue']) ? urldecode(trim($_GET['searchValue'])): '';
// for extjs searchfield use
$whereClause = get_where_clause_with_live_search($whereClause, $searchColumn, $searchValue);

$getTotalSql = "SELECT COUNT(*) as total FROM {$table_1} INNER JOIN {$table_2} ON {$joinonClause} where {$whereClause}";
$records_total = dbGetAll($getTotalSql);
$sql['get_message_log'] = [
    'mysql' => "SELECT {$column} FROM {$table_1} INNER JOIN {$table_2} ON {$joinonClause} where {$whereClause} ORDER BY {$orderby} LIMIT {$start},{$count}",
    'mssql' => "SELECT * FROM
                (
                    SELECT
                        ROW_NUMBER() OVER (ORDER BY {$orderby}) AS row, {$column}
                    FROM {$table_1}
                    INNER JOIN {$table_2} ON {$joinonClause}
                    where {$whereClause}
                ) result
                WHERE result.row
                BETWEEN {$start} + 1 AND {$start} + {$count}",
    'oci8' => "SELECT {$column} FROM {$table_1} INNER JOIN {$table_2} ON {$joinonClause} where {$whereClause} ORDER BY {$orderby} LIMIT {$start},{$count}",
];

$records = dbGetAll($sql['get_message_log'][SYS_DBTYPE]);
$total = dbGetTotal($records_total);

// output result
$result = [];
$result['total'] = $total;
$result['result'] = $records;

echo json_encode($result);
$sysConn = null;