<?php
require "../../../../../init.php";


// result defination
$result = [];
$sql = [];

$p_name = isset($_POST['p_name']) ? trim($_POST['p_name']) : null; //判斷是否有數值 有去掉空白 無則傳回空白
$p_cost = isset($_POST['p_cost']) ? trim($_POST['p_cost']) : null;
$p_amount = isset($_POST['p_amount']) ? trim($_POST['p_amount']) : null;
$p_time = isset($_POST['p_time']) ? trim($_POST['p_time']) : null;

// db execution
$table = 'profile_c_copy'; //儲存位置

$arrField = []; //自定變數陣列
$arrField['p_name'] = $p_name;
$arrField['p_cost'] = $p_cost;
$arrField['p_amount'] = $p_amount;
$arrField['p_time'] = $p_time;


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