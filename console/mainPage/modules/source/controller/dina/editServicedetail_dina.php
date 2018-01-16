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
$theruler = isset($_POST['the ruler']) ? trim($_POST['the ruler']) : null;

// db execution
$table = 'score_c'; //儲存位置

$arrField = []; //自定變數陣列
$arrField['p_name'] = $p_name;
$arrField['personality'] = $personality;
$arrField['luckycolor'] = $luckycolor;
$arrField['e_name'] = $e_name;
$arrField['the ruler'] = $theruler;


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