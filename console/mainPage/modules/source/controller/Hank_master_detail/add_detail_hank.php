<?php
// ini_set('display_errors', 1);
// 設置指定配置選項的值。這個選項會在腳本運行時保持新的值，並在腳本結束時恢復。
require "../../../../../init.php";
//debug
// $sysConnDebug = true;
// result defination
$result = [];
// $sql = [];

$user_corp_id = $sysSession->corp_id;
$operator = $sysSession->user_name;
$name = isset($_POST['name']) ? trim($_POST['name']) : null;
$student_id = isset($_POST['student_id']) ? trim($_POST['student_id']) : null;
$gender = isset($_POST['gender']) ? trim($_POST['gender']) : null;
$email = isset($_POST['email']) ? trim($_POST['email']) : null;
$phone = isset($_POST['phone']) ? trim($_POST['phone']) : null;
$address = isset($_POST['address']) ? trim($_POST['address']) : null;
$birthday = isset($_POST['birthday']) ? trim($_POST['birthday']) : null;
//isset 判斷post值是否為空值 是，執行 trim ，將post的值去掉空白鍵值。否，null。

// db execution
$table = 'profile_b_hank';
$arrField = [];
$arrField['name'] = $name;
$arrField['student_id'] = $student_id;
$arrField['gender'] = $gender;
$arrField['email'] = $email;
$arrField['phone'] = $phone;
$arrField['address'] = $address;
$arrField['birthday'] = $birthday;
dbBegin();
//呼叫server端
$result['success'] = dbInsert($table, $arrField);
$result['msg'] = $result['success'] ? 'success' : SQL_FAILS;
if ($result['success'] ) {
dbCommit();
//執行成功
} else {
dbRollback();
//執行失敗&回復到dbBegin時間點
}
// output result
echo json_encode($result);
//回傳json