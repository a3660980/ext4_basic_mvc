<?php
require "../../../../../init.php";


// result defination
$result = [];

$uuid = uuid_generator();
$subject = isset($_POST['subject']) ? trim($_POST['subject']) : null;
$student_id = isset($_POST['student_id']) ? trim($_POST['student_id']) : null;
$score = isset($_POST['score']) ? trim($_POST['score']) : null;
$semester = isset($_POST['semester']) ? trim($_POST['semester']) : null;


// db execution
$table = 'score_d';

$arrField = [];
$arrField['uuid'] = $uuid;
$arrField['subject'] = $subject;
$arrField['student_id'] = $student_id;
$arrField['score'] = $score;
$arrField['semester'] = $semester;


dbBegin();

$result['success'] = dbInsert($table, $arrField);
$result['msg'] = $result['success'] ? 'success' : SQL_FAILS;

if ($result['success'] ) {
    dbCommit();
} else {
    dbRollback();
}

// output result
echo json_encode($result);