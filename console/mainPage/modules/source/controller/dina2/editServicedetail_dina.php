<?php
require "../../../../../init.php";

// $sysConnDebug = true;

// result defination
$result = [];
$sql = [];

$p_name = isset($_POST['p_name']) ? trim($_POST['p_name']) : null;
$personality = isset($_POST['personality']) ? trim($_POST['personality']) : null;
$luckycolor = isset($_POST['luckycolor']) ? trim($_POST['luckycolor']) : null;
$e_name = isset($_POST['e_name']) ? trim($_POST['e_name']) : null;
$the_ruler = isset($_POST['the_ruler']) ? trim($_POST['the_ruler']) : null;

// db execution
$table = 'score_c'; //儲存位置

$arrField = []; //自定變數陣列
$arrField['personality'] = $personality;
$arrField['luckycolor'] = $luckycolor;
$arrField['e_name'] = $e_name;
$arrField['the_ruler'] = $the_ruler;

$whereClause = "p_name = '{$p_name}'";

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