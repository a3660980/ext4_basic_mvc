<?php
require "../../../../../init.php";

// $sysConnDebug = true;

// result defination
$result = [];
$sql = [];

$user_name = isset($_POST['user_name']) ? trim($_POST['user_name']) : null;
$user_security = isset($_POST['user_security']) ? trim($_POST['user_security']) : 0;
// default
$current_date = date(DB_DATE_FORMAT);
$operator = $sysSession->user_name;

// db execution
$table = CPS_TABLE_USER_ACCOUNT;

$arrField = [];
$arrField['user_security'] = $user_security;
$arrField['last_updated_date'] = $current_date;
$arrField['operator'] = $operator;

$whereClause = "{$table}.user_name = '{$user_name}'";
dbBegin();

$result['success'] = dbUpdate($table, $arrField, $whereClause);
$result['msg'] = $result['success'] ? 'success' : 'fails';

if ($result['success'] && updateCorpAccount()) {
    dbCommit();
} else {
    dbRollback();
    $result['msg'] = UPDATE_FAILS;
}

// output result
echo json_encode($result);