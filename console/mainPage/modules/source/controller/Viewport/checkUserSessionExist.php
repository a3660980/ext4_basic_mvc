<?php
require "../../../../../init.php";

// debug
// $sysConnDebug = true;

// result defination
$result = [];

// post or session variable
$ses_username = $sysSession->user_name;

$table = CPS_TABLE_USER_PROFILE;
$column = "*";
$sql = [];
$whereClause = "user_name = '$ses_username'";

$sql['getUser'] = [
    'mysql' => "SELECT {$column} FROM {$table} WHERE {$whereClause}",
    'mssql' => "SELECT {$column} FROM {$table} WHERE {$whereClause}",
    'oci8'=> "SELECT {$column} FROM {$table} WHERE {$whereClause}"
];

$success = dbGetRow($sql['getUser'][SYS_DBTYPE]);

// check session
if (! $success || empty($ses_username) || $ses_username == 'guest') {
	$result['success']	= false;
} else {
	$result['success']	= true;
}

// output result
echo json_encode($result);