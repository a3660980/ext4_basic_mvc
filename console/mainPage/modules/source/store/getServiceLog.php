<?php
require "../../../../init.php";

// $sysConnDebug = true;

$table = CPS_TABLE_SERVICE_LOG;

$count = isset($_POST['limit']) ? $_POST['limit']: 0;
$start = isset($_POST['start']) ? $_POST['start']: 0;

$dbColumns = [
    'mysql' => "SQL_CALC_FOUND_ROWS *",
    'mssql' => "*",
    'oci8' => "*"
];
$column = $dbColumns[SYS_DBTYPE];
$orderby = "log_time DESC";

$whereClause = "(Year(log_time) = Year(GetDate()) and
        Month(log_time)= Month(GetDate()) and
        Day(log_time) = Day(GetDate()))";

// like search columns
$searchColumn = ["user_name", "device_app_name", "device_vendor", "device_model", "device_os",
                    "service_name", "service_response", "service_url"];
$searchValue = isset($_GET['searchValue']) ? urldecode(trim($_GET['searchValue'])): '';
// for extjs searchfield use
$whereClause = get_where_clause_with_live_search($whereClause, $searchColumn, $searchValue);

$getTotalSql = "SELECT COUNT(*) as total FROM {$table} where {$whereClause}";
$records_total = dbGetAll($getTotalSql);
$sql['getServiceLog'] = [
    'mysql' => "SELECT {$column} FROM {$table} where {$whereClause} ORDER BY {$orderby} LIMIT {$start},{$count}",
    'mssql' => "SELECT * FROM
                (
                    SELECT
                        ROW_NUMBER() OVER (ORDER BY {$orderby}) AS row, {$column}
                    FROM {$table}
                    where {$whereClause}
                ) result
                WHERE result.row
                BETWEEN {$start} + 1 AND {$start} + {$count}",
    'oci8' => "SELECT {$column} FROM {$table} where {$whereClause} ORDER BY {$orderby} LIMIT {$start},{$count}"
];

$records = dbGetAll($sql['getServiceLog'][SYS_DBTYPE]);
$total = dbGetTotal($records_total);

// output result
$result = [];
$result['total'] = $total;
$result['result'] = $records;

echo json_encode($result);
$sysConn = null;