<?php
require "../../../../../init.php";

// $sysConnDebug = true;

$reuslt = [];

// post & session variable
// $old_password = trim($_POST['old_password']);
$new_password = trim($_POST['new_password']);
$user_name = isset($_POST['user_name']) ? trim($_POST['user_name']) : null;
$corp_id = $sysSession->corp_id;
// $user_name = $sysSession->user_name;

// db execution
$table = CPS_TABLE_USER_ACCOUNT;
$dbColumns = [
    'mysql' => 'user_password'
];
$column = $dbColumns[SYS_DBTYPE];
$arrField = [];
$whereClause = "user_name = '{$user_name}'";

$sql['get_user_password'] = [
	'mysql' => "SELECT {$column} FROM {$table} WHERE {$whereClause}"
];

$record = dbGetRow($sql['get_user_password'][SYS_DBTYPE]);

//  if ($old_password != data_decrypt($record['password'])) {
// 	$result['success'] = false;
// 	$result['msg'] = 'old_password_not_match';
// } else {

    $dbPasswords = [
        'mysql' => "'" . data_encrypt($new_password) . "'"
    ];
    $arrField['user_password'] = $dbPasswords[SYS_DBTYPE];
    $update_result = dbExecute("UPDATE " .CPS_TABLE_USER_ACCOUNT
                    ." SET user_password = " .$arrField['user_password']
                    ." WHERE {$whereClause}");

	if (! $update_result) {
		$result['success'] = false;
		$result['msg'] = '重設失敗';
	} else {
		$result['success']	= true;
	}
// }

// output result
echo json_encode($result);