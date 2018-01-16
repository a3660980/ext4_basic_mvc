<?php
require "../../../../../init.php";

// $sysConnDebug = true;

// result defination
$result = [];
$sql = [];

$current_date = date(DB_DATE_FORMAT);

$user_name = isset($_POST['user_name']) ? trim($_POST['user_name']) : null;
$user_firstname_tw = isset($_POST['user_firstname_tw']) ? trim($_POST['user_firstname_tw']) : null;
$user_firstname_en = isset($_POST['user_firstname_en']) ? trim($_POST['user_firstname_en']) : null;
$user_lastname_tw = isset($_POST['user_lastname_tw']) ? trim($_POST['user_lastname_tw']) : null;
$user_lastname_en = isset($_POST['user_lastname_en']) ? trim($_POST['user_lastname_en']) : null;
$user_phone_number_1 = isset($_POST['user_phone_number_1']) ? trim($_POST['user_phone_number_1']) : null;
$user_mobile_number_1 = isset($_POST['user_mobile_number_1']) ? trim($_POST['user_mobile_number_1']) : null;
$user_email_1 = isset($_POST['user_email_1']) ? trim($_POST['user_email_1']) : null;
$user_role = isset($_POST['user_role']) ? trim($_POST['user_role']) : null;
$user_organization_id = isset($_POST['organization_id']) ? trim($_POST['organization_id']) : null;
// $organization_id_ch = isset($_POST['organization_id_ch']) ? trim($_POST['organization_id_ch']) : null;

// $user_organization_id = ! empty($organization_id_ch) ? $organization_id_ch : $organization_id;

// default
$device_app_id = 17;//要改~
$user_corp_id = $sysSession->corp_id;
$operator = $sysSession->user_name;

// db execution
$table = CPS_TABLE_USER_ACCOUNT;

$column = "*";
$whereClause = "user_name = '{$user_name}'";
$sql['get_user'] = [
    'mysql' => "SELECT {$column} FROM {$table} WHERE {$whereClause}",
    'mssql' => "SELECT {$column} FROM {$table} WHERE {$whereClause}",
    'oci8' => "SELECT {$column} FROM {$table} WHERE {$whereClause}"
];

$whereClause = "user_mobile_number_1 = '{$user_mobile_number_1}'";
$sql['get_mobile'] = [
    'mysql' => "SELECT {$column} FROM {$table} WHERE {$whereClause}",
    'mssql' => "SELECT {$column} FROM {$table} WHERE {$whereClause}",
    'oci8' => "SELECT {$column} FROM {$table} WHERE {$whereClause}"
];

$whereClause = "user_email_1 = '{$user_email_1}'";
$sql['get_email'] = [
    'mysql' => "SELECT {$column} FROM {$table} WHERE {$whereClause}",
    'mssql' => "SELECT {$column} FROM {$table} WHERE {$whereClause}",
    'oci8' => "SELECT {$column} FROM {$table} WHERE {$whereClause}"
];

if (dbGetRow($sql['get_user'][SYS_DBTYPE])) {
    $result['success'] = false;
    $result['msg'] = FAILS_MSG_USER_DOES_EXISTS;

    echo json_encode($result);
    return;
} else if (dbGetRow($sql['get_mobile'][SYS_DBTYPE])) {
    $result['success'] = false;
    $result['msg'] = FAILS_MSG_MOBILE_DOES_EXISTS;

    echo json_encode($result);
    return;
} else if (dbGetRow($sql['get_email'][SYS_DBTYPE])) {
    $result['success'] = false;
    $result['msg'] = FAILS_MSG_EMAIL_DOES_EXISTS;

    echo json_encode($result);
    return;
}

$arrField = [];
$arrField['user_name'] = $user_name;
$arrField['user_firstname_tw'] = $user_firstname_tw;
$arrField['user_firstname_en'] = $user_firstname_en;
$arrField['user_lastname_tw'] = $user_lastname_tw;
$arrField['user_lastname_en'] = $user_lastname_en;
$arrField['user_organization_id'] = $user_organization_id;
$arrField['user_phone_number_1'] = $user_phone_number_1;
$arrField['user_mobile_number_1'] = $user_mobile_number_1;
$arrField['user_email_1'] = $user_email_1;
$arrField['user_role'] = $user_role;
$arrField['device_app_id'] = $device_app_id;
$arrField['registration_date'] = $current_date;
$arrField['last_updated_date'] = $current_date;
$arrField['user_corp_id'] = $user_corp_id;
$arrField['operator'] = $operator;

dbBegin();

$result['success'] = dbInsert($table, $arrField);
$result['msg'] = $result['success'] ? 'success' : 'SQL_FAILS';

if ($result['success'] && updateCorpAccount()) {
    dbCommit();
} else {
    dbRollback();
}

// output result
echo json_encode($result);