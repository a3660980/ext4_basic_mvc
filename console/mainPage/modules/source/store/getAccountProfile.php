<?php
require "../../../../init.php";

// $sysConnDebug = true;

$result = [];
$corp_id = $sysSession->corp_id;

// 取得corp info(cps_corp_account)資訊
$table = CPS_TABLE_CORP_ACCOUNT;
$dbColumns = [
    'mysql' => "SQL_CALC_FOUND_ROWS corp_id, corp_name, corp_code, corp_status, created_date, updated_date",
    'mssql' => "corp_id, corp_name, corp_code, corp_status, created_date, updated_date",
    'oci8' => "corp_id, corp_name, corp_code, corp_status, created_date, updated_date"
];
$column = $dbColumns[SYS_DBTYPE];
$whereClause = "corp_id = '{$corp_id}'";

$getTotalSql = "SELECT {$column} FROM {$table} WHERE {$whereClause}";
$sql['get_corp_data'] = [
	'mysql' => "SELECT {$column} FROM {$table} WHERE {$whereClause}",
	'mssql'	=> "SELECT {$column} FROM {$table} WHERE {$whereClause}",
	'oci8' => "SELECT {$column} FROM {$table} WHERE {$whereClause}"
];

$records = dbGetAll($sql['get_corp_data'][SYS_DBTYPE]);

// 取得CPS info(cps_Server_Info.txt)
$cpsFile = CPS_DOCUMENT_ROOT . "/server/" . PROJECT_NAME . "/streams.cps";
$cps_server_info_data = json_decode(data_decrypt(file_get_contents($cpsFile)));

if (! empty($cps_server_info_data)) {
	$records[0]['server_id'] = $cps_server_info_data->server_id;
	$records[0]['server_domain'] = $cps_server_info_data->server_domain;
	$records[0]['server_max_session'] = $cps_server_info_data->server_max_session;
	$records[0]['server_ip'] = $cps_server_info_data->server_ip;
	$records[0]['server_expire_date'] = $cps_server_info_data->server_expire_date;
	$records[0]['server_port'] = $cps_server_info_data->server_port;
	$records[0]['server_mac1'] = $cps_server_info_data->server_mac1;
	$records[0]['server_mac2'] = $cps_server_info_data->server_mac2;
}

// output result
$result['total'] = 1;
$result['result'] = $records;

echo json_encode($result);
$sysConn = null;