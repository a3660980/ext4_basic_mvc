<?php
require "../../../../../init.php";


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


dbBegin(); //開始資料表 beginTransaction()開始一個事務 關閉自動提交

$result['success'] = dbInsert($table, $arrField);
$result['msg'] = $result['success'] ? 'success' : SQL_FAILS;

if ($result['success'] ) {
    dbCommit(); //提交$sysConn->commit()結束事物才提交
} else {
    dbRollback(); //返回rollBack 回滾對數據庫做的更改返回自動提交模式
}

// output result
echo json_encode($result);