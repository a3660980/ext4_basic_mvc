<?php
require "../../../../../init.php";

// $sysConnDebug = true;

// result defination
$result = [];
$sql = [];

$current_date = date(DB_DATE_FORMAT);
// 取得當前的時間
$uuid = isset($_POST['uuid']) ? trim($_POST['uuid']) : null;
$subject = isset($_POST['subject']) ? trim($_POST['subject']) : null;
$student_id = isset($_POST['student_id']) ? trim($_POST['student_id']) : null;
$score = isset($_POST['score']) ? trim($_POST['score']) : null;  
//isset:true回傳遞一個，不是的話，回傳空值
$test_date= isset($_POST['test_date']) ? trim($_POST['test_date']) : null;
// $欄位名稱=取得所需資料表欄位的值 否則回傳空值到欄位



// default
// $operator = $sysSession->name;

// db execution
$table = 'score_ant';
// 資料表
$column = "*";
// 全部
$whereClause = "uuid = '{$uuid}'";
//PK



$arrField = [];
$arrField['subject'] = $subject;
$arrField['student_id'] = $student_id;
$arrField['score'] = $score;
$arrField['test_date'] = $test_date;
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