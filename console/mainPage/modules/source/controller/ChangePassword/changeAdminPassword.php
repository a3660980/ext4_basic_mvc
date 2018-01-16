<?php
require "../../../../../init.php";

// $sysConnDebug = true;

$reuslt = [];

// post & session variable
$old_password = trim($_POST['old_password']);
$new_password = trim($_POST['new_password']);
$corp_id = $sysSession->corp_id;
$user_name = $sysSession->user_name;

// db execution
$table = CPS_TABLE_USER_PROFILE;
$dbColumns = [
    'mysql' => 'password',
    'mssql' => 'password',
    'oci8' => 'password'
];
$column = $dbColumns[SYS_DBTYPE];
$arrField = [];
$whereClause = "corp_id = '{$corp_id}' AND user_name = '{$user_name}'";

$sql['get_admin_password'] = [
	'mysql' => "SELECT {$column} FROM {$table} WHERE {$whereClause}",
	'mssql' => "SELECT {$column} FROM {$table} WHERE {$whereClause}",
	'oci8' => "SELECT {$column} FROM {$table} WHERE {$whereClause}"
];

$record = dbGetRow($sql['get_admin_password'][SYS_DBTYPE]);

if ($old_password != data_decrypt($record['password'])) {
	$result['success'] = false;
	$result['msg'] = 'old_password_not_match';
} else {

    $dbPasswords = [
        'mysql' => "'" . data_encrypt($new_password) . "'",
        'mssql' => "'" . data_encrypt($new_password) . "'",
        'oci8' => "'" . data_encrypt($new_password) . "'"
    ];
    $arrField['password'] = $dbPasswords[SYS_DBTYPE];
    $update_result = dbExecute("UPDATE " .CPS_TABLE_USER_PROFILE
                    ." SET password = " .$arrField['password']
                    ." WHERE {$whereClause}");

	if (! $update_result) {
		$result['success'] = false;
		$result['msg'] = 'sql_fail';
	} else {
		$result['success']	= true;
	}
}

// output result
echo json_encode($result);