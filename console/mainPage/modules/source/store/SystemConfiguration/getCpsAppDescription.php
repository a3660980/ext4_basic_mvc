<?php
require "../../../../../project_init.php";

// $sysConnDebug = true;

$result = [];

$corp_id = $sysSession->corp_id;

// db execution
$table1 = CPS_TABLE_APP_DESCRIPTION;
$table2 = CPS_TABLE_CORP_ACCOUNT;
$column = "SQL_CALC_FOUND_ROWS
            {$table1}.device_app_id,
            {$table1}.app_name_id,
            {$table1}.device_app_name,
            {$table1}.app_icon,
            {$table1}.corp_id,
            {$table1}.server_id,
            {$table1}.contact_department,
            {$table1}.contact_title,
            {$table1}.contact_phone,
            {$table1}.contact_name,
            {$table1}.contact_mobile,
            {$table1}.contact_email,
            {$table1}.app_service_date,
            {$table1}.app_service_status,
            {$table1}.app_created_date,
            {$table1}.app_updated_date,
            {$table1}.operator,
            {$table2}.corp_name";

$whereClause = "1=1";
$searchColumn = ["{$table2}.corp_name", "{$table1}.device_app_name"];
$searchValue = isset($_GET['searchValue']) ? $_GET['searchValue']: '';
// for extjs searchfield use
$whereClause = get_where_clause_with_live_search($whereClause, $searchColumn, $searchValue);

$start = isset($_POST['start']) ? $_POST['start'] : 0;
$limit = isset($_POST['limit']) ? $_POST['limit'] : 0;

$sql['get_app_description'] = [
	'mysql' => "SELECT {$column} FROM {$table1}, {$table2} WHERE {$whereClause} LIMIT {$start}, {$limit}",
	'mssql' => "SELECT {$column} FROM {$table1}, {$table2} WHERE {$whereClause} LIMIT {$start}, {$limit}",
	'oci8' => "SELECT {$column} FROM {$table1}, {$table2} WHERE {$whereClause} LIMIT {$start}, {$limit}"
];

$records = dbGetAll($sql['get_app_description'][SYS_DBTYPE]);
$total = dbGetTotal();

// output result
$result['total'] = $total;
$result['result'] = $records;

echo json_encode($result);
$sysConn = null;