<?php
require "../../../../../init.php";

// $sysConnDebug = true;
// result defination
$result = [];
$sql = [];

$student_id = isset($_POST['student_id']) ? trim($_POST['student_id']) : null; //判斷是否有數值 有去掉空白 無則傳回空白
$name = isset($_POST['name']) ? trim($_POST['name']) : null;
$gender = isset($_POST['gender']) ? trim($_POST['gender']) : null;
$email = isset($_POST['email']) ? trim($_POST['email']) : null;
$phone = isset($_POST['phone']) ? trim($_POST['phone']) : null;
$address = isset($_POST['address']) ? trim($_POST['address']) : null;
$birthday = isset($_POST['birthday']) ? trim($_POST['birthday']) : null;
//if ($birthday == '') $birthday = null;

// db execution
$table = 'profile_c'; //儲存位置(資料表名稱)

$arrField = []; //自定變數陣列
$arrField['student_id'] = $student_id;
$arrField['name'] = $name;
$arrField['gender'] = $gender;
$arrField['email'] = $email;
$arrField['phone'] = $phone;
$arrField['address'] = $address;
$arrField['birthday'] = $birthday;


//db函數都在db.php

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