<?php
require "../../../../../init.php";

$result = [];
$sql = [];

$$result = [];
$detail_id = isset($_POST['detail_id']) ? trim($_POST['detail_id']) : null;
$student_id = isset($_POST['student_id']) ? trim($_POST['student_id']) : null;
$subject= isset($_POST['subject']) ? trim($_POST['subject']) : null;
$score= isset($_POST['score']) ? trim($_POST['score']) : null;
$semester= isset($_POST['semester']) ? trim($_POST['semester']) : null;
$created_date= date(DB_DATE_FORMAT);
$operator= $sysSession->user_name;
$updated_date= date(DB_DATE_FORMAT);


$table = 'studentscore';
$whereClause = "detail_id = '{$detail_id}'";

$arrField = [];
$arrField['detail_id'] = $detail_id;
$arrField['student_id'] = $student_id;
$arrField['subject'] = $subject;
$arrField['score'] = $score;
$arrField['semester'] = $semester;
$arrField['created_date'] = $created_date;
$arrField['updated_date'] = $updated_date;
$arrField['operator'] = $operator;

dbBegin();

$result['success'] = dbUpdate($table, $arrField, $whereClause);
$result['msg'] = $result['success'] ? 'success' : SQL_FAILS;

if ($result['success'] ) {
    dbCommit();
} else {
    dbRollback();
}

echo json_encode($result);
