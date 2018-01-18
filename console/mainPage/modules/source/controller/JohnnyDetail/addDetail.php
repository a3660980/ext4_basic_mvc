<?php
require "../../../../../init.php";

$result = [];
$detail_id = uuid_generator();
$student_id = isset($_POST['student_id']) ? trim($_POST['student_id']) : null;
$subject= isset($_POST['subject']) ? trim($_POST['subject']) : null;
$score= isset($_POST['score']) ? trim($_POST['score']) : null;
$semester= isset($_POST['semester']) ? trim($_POST['semester']) : null;
$created_date= date(DB_DATE_FORMAT);
$operator= $sysSession->user_name;

dbBegin();

$table = 'studentscore';

$arrField = [];
$arrField['detail_id'] = $detail_id;
$arrField['student_id'] = $student_id;
$arrField['subject'] = $subject;
$arrField['score'] = $score;
$arrField['semester'] = $semester;
$arrField['created_date'] = $created_date;
$arrField['operator'] = $operator;

$result['success'] = dbInsert($table, $arrField);
$result['msg'] = $result['success'] ? 'success' : SQL_FAILS;

if ($result['success']){
    dbCommit();
}else{
    dbRollback();
}
ini_set("display_errors", 1);
echo json_encode($result);
