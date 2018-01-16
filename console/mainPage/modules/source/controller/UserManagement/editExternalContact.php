<?php
require "../../../../../init.php";

// $sysConnDebug = true;

// result defination
$result = [];
$sql = [];

$current_date = date(DB_DATE_FORMAT);
// 取得當前的時間
$student_id = isset($_POST['student_id']) ? trim($_POST['student_id']) : null;
$name = isset($_POST['name']) ? trim($_POST['name']) : null;  
//isset:true回傳遞一個，不是的話，回傳空值
$gender= isset($_POST['gender']) ? trim($_POST['gender']) : null;
$email = isset($_POST['email']) ? trim($_POST['email']) : null;
$phone = isset($_POST['phone']) ? trim($_POST['phone']) : null;
$address = isset($_POST['address']) ? trim($_POST['address']) : null;
$birthday = isset($_POST['birthday']) ? trim($_POST['birthday']) : null;
// $欄位名稱=取得所需資料表欄位的值 否則回傳空值到欄位



// default
// $operator = $sysSession->name;

// db execution
$table = 'profile_ant';
// 資料表
$column = "*";
// 全部
$whereClause = "student_id = '{$student_id}'";
//PK



$arrField = [];
$arrField['name'] = $name;
$arrField['gender'] = $gender;
$arrField['email'] = $email;
$arrField['phone'] = $phone;
$arrField['address'] = $address;
$arrField['birthday'] = $birthday;
//存取資料陣列

dbBegin();
// 呼叫server端準備進行操作

$result['success'] = dbUpdate($table, $arrField, $whereClause);
// 成功後依輸入值執行更新欄位的值
$result['msg'] = $result['success'] ? 'success' : 'fails';
// 判斷更新資料是否成功

if ($result['success'] ) {
    dbCommit();
    // 上傳更新資料
} else {
    dbRollback();
    // 不要執行更新，把資料庫的狀態復原至我們執行dbBegin的時間點
}

echo json_encode($result);
// 輸出是否成功訊息