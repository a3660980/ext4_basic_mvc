<?php
require "../../../../init.php";

// $sysConnDebug = true;

// result defination
$result = [];

// POST or SESSION variable
$corp_id = $sysSession->corp_id;
$user_name = $sysSession->user_name;

$table = CPS_TABLE_USER_PROFILE;
$column = "corp_id,user_name,department,title,name,mobile_phone,email,created_date,updated_date,operator,last_login_time,authorization_item";
$whereClause = "corp_id = '{$corp_id}' AND user_name = '{$user_name}'";

$sql['get_admin_profile'] = array(
	'mysql' => "SELECT {$column} FROM {$table} WHERE {$whereClause}",
	'mssql' => "SELECT {$column} FROM {$table} WHERE {$whereClause}",
	'oci8' => "SELECT {$column} FROM {$table} WHERE {$whereClause}"
);

$records = dbGetAll($sql['get_admin_profile'][SYS_DBTYPE]);

// output result
$result['total'] = 1;
$result['result'] = $records;

echo json_encode($result);
$sysConn = null;