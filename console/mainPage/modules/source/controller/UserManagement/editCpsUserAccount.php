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

$checkRecords = dbGetRow($sql['get_user'][SYS_DBTYPE]);
$checkMobile = $checkRecords['user_mobile_number_1'];
$checkEmail = $checkRecords['user_email_1'];

if ($user_mobile_number_1 != $checkMobile && dbGetRow($sql['get_mobile'][SYS_DBTYPE])) {
    $result['success'] = false;
    $result['msg'] = FAILS_MSG_MOBILE_DOES_EXISTS;

    echo json_encode($result);
    return;
} else if ($user_email_1 != $checkEmail && dbGetRow($sql['get_email'][SYS_DBTYPE])) {
    $result['success'] = false;
    $result['msg'] = FAILS_MSG_EMAIL_DOES_EXISTS;

    echo json_encode($result);
    return;
}

$arrField = [];
$arrField['user_firstname_tw'] = $user_firstname_tw;
$arrField['user_firstname_en'] = $user_firstname_en;
$arrField['user_lastname_tw'] = $user_lastname_tw;
$arrField['user_lastname_en'] = $user_lastname_en;
$arrField['user_organization_id'] = $user_organization_id;
$arrField['user_phone_number_1'] = $user_phone_number_1;
$arrField['user_mobile_number_1'] = $user_mobile_number_1;
$arrField['user_email_1'] = $user_email_1;
$arrField['user_role'] = $user_role;
$arrField['last_updated_date'] = $current_date;
$arrField['operator'] = $operator;

$whereClause = "{$table}.user_name = '{$user_name}'";
dbBegin();

$result['success'] = dbUpdate($table, $arrField, $whereClause);
$result['msg'] = $result['success'] ? 'success' : 'fails';

if ($result['success'] && updateCorpAccount()) {
    dbCommit();
    // updateUserProfile($user_name, $operator);
} else {
    dbRollback();
}

// function updateUserProfile($user_name, $operator){
//     $table1 = CPS_TABLE_USER_PROFILE;
//     $table2 = CPS_TABLE_USER_ACCOUNT;
//     $table3 = CPS_TABLE_USER_ORGANIZATION;
//     $column = "{$table2}.*, {$table3}.organization_name";
//     $joinOn1 = "{$table1}.user_name = {$table2}.user_name";
//     $joinOn2 = "{$table2}.user_organization_id = {$table3}.organization_id";
//     $whereClause = "{$table1}.user_name = '{$user_name}'";

//     $sql = [
//         'mysql' => "SELECT {$column} FROM {$table1} 
//         INNER JOIN {$table2} ON {$joinOn1} INNER JOIN {$table3} ON {$joinOn2} WHERE {$whereClause} LIMIT 1",
//         'mssql' => "SELECT top 1 {$column} FROM {$table1} 
//         INNER JOIN {$table2} ON {$joinOn1} INNER JOIN {$table3} ON {$joinOn2} WHERE {$whereClause}",
//         'oci8' => "SELECT {$column} FROM {$table1} 
//         INNER JOIN {$table2} ON {$joinOn1} INNER JOIN {$table3} ON {$joinOn2} WHERE {$whereClause} LIMIT 1"
//     ];
//     $records = dbGetAll($sql[SYS_DBTYPE]);
//     $total = count($records);

//     if($total > 0){
//         dbBegin();

//         $updateField = [];

//         $updateField['department'] = $records[0]['organization_name'];
//         $updateField['title'] = $records[0]['user_role'];
//         $updateField['name'] = $records[0]['user_lastname_tw'] . $records[0]['user_firstname_tw'];
//         $updateField['mobile_phone'] = $records[0]['user_mobile_number_1'];
//         $updateField['email'] = $records[0]['user_email_1'];
//         $updateField['operator'] = $operator;
    
//         $success = dbUpdate($table1, $updateField, $whereClause);

//         if ($success && updateCorpAccount()) {
//             dbCommit();
//         } else {
//             dbRollback();
//         }
//     }
// }

// output result
echo json_encode($result);