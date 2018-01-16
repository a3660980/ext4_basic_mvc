<?php
require "../../../../../init.php";

// debug
// $sysConnDebug = true;

// result definition
$result = [
    'success' => false,
    'msg' => null
];

// post variable
$user_name = trim($_POST['user_name']);
$password = trim($_POST['password']);

// db execution
$sql = [];

$table = CPS_TABLE_CORP_ACCOUNT;
$column = 'corp_id';
$sql['get_corp_id'] = [
    'mysql' => "SELECT {$column} FROM {$table} LIMIT 1",
    'mssql' => "SELECT {$column} FROM {$table} LIMIT 1",
    'oci8' => "SELECT {$column} FROM {$table} LIMIT 1"
];

$corp_id = dbGetRow($sql['get_corp_id'][SYS_DBTYPE])['corp_id'];

// 檢查帳號密碼是否輸入正確
$table = CPS_TABLE_USER_PROFILE;
$column = 'password';
$whereClause = "corp_id = '{$corp_id}' AND user_name = '{$user_name}'";

$sql['username_password_check'] = [
    'mysql' => "SELECT {$column} FROM {$table} WHERE {$whereClause}",
    'mssql' => "SELECT {$column} FROM {$table} WHERE {$whereClause}",
    'oci8' => "SELECT {$column} FROM {$table} WHERE {$whereClause}"
];

$check_data = dbGetRow($sql['username_password_check'][SYS_DBTYPE]);

if (count($check_data) == 0 || data_decrypt($check_data['password']) != $password) {
    $result['success'] = false;
    $result['msg'] = "username_password_error";
    echo json_encode($result);

    return;
}

// 登入成功, 取得資料記錄與Session, 同時寫入最後登入時間
$table = CPS_TABLE_USER_PROFILE;
$column = "corp_id, user_name, name, authorization_item";
$whereClause = "corp_id = '{$corp_id}' AND user_name = '{$user_name}'";

$sql['get_user_data'] = [
    'mysql'    => "SELECT {$column} FROM {$table} WHERE {$whereClause}",
    'mssql'    => "SELECT {$column} FROM {$table} WHERE {$whereClause}",
    'oci8' => "SELECT {$column} FROM {$table} WHERE {$whereClause}"
];

$user_profile = dbGetRow($sql['get_user_data'][SYS_DBTYPE]);

$user_info['user_name'] = $user_profile['user_name'];
$user_info['corp_id'] = $user_profile['corp_id'];
$user_info['name'] = $user_profile['name'];
$user_info['authorization_item'] = $user_profile['authorization_item'];
$sysSession->init($user_info);
$sysSession->restore();

$arrField = [];
$arrField['last_login_time'] = date(DB_DATE_FORMAT);
dbUpdate($table, $arrField, $whereClause);

$result['success'] = true;

// output result
echo json_encode($result);