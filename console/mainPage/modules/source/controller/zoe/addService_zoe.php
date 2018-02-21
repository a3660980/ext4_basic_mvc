<?php
require "../../../../../init.php";


// result defination
$result = [];
$sql = [];

//畫面上新增的欄位
$t_id = isset($_POST['t_id']) ? trim($_POST['t_id']) : null;
$t_name = isset($_POST['t_name']) ? trim($_POST['t_name']) : null;
$t_dep = isset($_POST['t_dep']) ? trim($_POST['t_dep']) : null;
$t_date1 = isset($_POST['t_date1']) ? trim($_POST['t_date1']) : null;


// db execution
$table = 'tmsempdata';

$arrField = []; //自定變數陣列
$arrField['t_id'] = $t_id;
$arrField['t_name'] = $t_name;
$arrField['t_dep'] = $t_dep;
$arrField['t_date1'] = $t_date1;

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

?>