<?php
require "../../../../../init.php";

// $sysConnDebug = true;

// result defination
$result = [];
$sql = [];


$subject = isset($_POST['subject']) ? trim($_POST['subject']) : null;
$student_id = isset($_POST['student_id']) ? trim($_POST['student_id']) : null;
$score = isset($_POST['score']) ? trim($_POST['score']) : null;
$semester = isset($_POST['semester']) ? trim($_POST['semester']) : null;

// db execution
$table = 'score_d';

$column = "*";

$whereClause = "student_id = '{$student_id}'";

$arrField = [];
$arrField['subject'] = $subject;
$arrField['student_id'] = $student_id;
$arrField['score'] = $score;
$arrField['semester'] = $semester;



dbBegin();

$result['success'] = dbUpdate($table, $arrField, $whereClause);

$result['msg'] = $result['success'] ? 'success' : 'fails';

if ($result['success']) {
    dbCommit();
} else {
    dbRollback();
}

// output result
echo json_encode($result);