<?php
require "../../../../../init.php";

// $sysConnDebug = true;

// result defination
$result = [];
$sql = [];
$current_date = date(DB_DATE_FORMAT);

$p_name = isset($_POST['p_name']) ? trim($_POST['p_name']) : null;
$p_cost = isset($_POST['p_cost']) ? trim($_POST['p_cost']) : null;
$p_amount = isset($_POST['p_amount']) ? trim($_POST['p_amount']) : null;
$p_time = isset($_POST['p_time']) ? trim($_POST['p_time']) : null;

// db execution
$table = 'profile_c_copy';


$whereClause = "p_name = '{$p_name}'";

$arrField = [];
$arrField['p_name'] = $p_name;
$arrField['p_cost'] = $p_cost;
$arrField['p_amount'] = $p_amount;
$arrField['p_time'] = $p_time;


dbBegin();

$result['success'] = dbUpdate($table, $arrField, $whereClause);
$result['msg'] = $result['success'] ? 'success' : 'fails';

if ($result['success']) {
    dbCommit(); //$sysConn->commit()提交
} else {
    dbRollback();
}

// output result
echo json_encode($result);