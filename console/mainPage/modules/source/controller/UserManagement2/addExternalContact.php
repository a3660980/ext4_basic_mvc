<?php
require "../../../../../init.php";

// debug
// $sysConnDebug = true;

// result defination
$result = [];

$current_date = date(DB_DATE_FORMAT);

$uuid = uuid_generator();
$subject = isset($_POST['subject']) ? trim($_POST['subject']) : null;
$student_id = isset($_POST['student_id']) ? trim($_POST['student_id']) : null; 
$score = isset($_POST['score']) ? trim($_POST['score']) : null;
//isset:true回傳遞一個，不是的話，回傳空值
$test_date= isset($_POST['test_date']) ? trim($_POST['test_date']) : null;


dbBegin();

// db execution
$table = 'score_ant';

$arrField = [];
$arrField['uuid'] = $uuid;
$arrField['subject'] = $subject;
$arrField['student_id'] = $student_id;
$arrField['score'] = $score;
$arrField['test_date'] = $test_date;

$result['success'] = dbInsert($table, $arrField);
$result['msg'] = $result['success'] ? 'success' : 'fails';


if ($result['success']){
    dbCommit();
}else{
    dbRollback();
}

echo json_encode($result);
