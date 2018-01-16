<?php
require "../../../../../init.php";

// $sysConnDebug = true;

// result defination
$result = [];
$sql = [];
$current_date = date(DB_DATE_FORMAT);

$student_id = isset($_POST['student_id']) ? trim($_POST['student_id']) : null;
$name = isset($_POST['name']) ? trim($_POST['name']) : null;
$gender = isset($_POST['gender']) ? trim($_POST['gender']) : null;
$email = isset($_POST['email']) ? trim($_POST['email']) : null;
$phone = isset($_POST['phone']) ? trim($_POST['phone']) : null;
$address = isset($_POST['address']) ? trim($_POST['address']) : null;
$birthday = isset($_POST['birthday']) ? trim($_POST['birthday']) : null;

// db execution
$table = 'profile_c';

$column = "*";

$whereClause = "student_id = '{$student_id}'";

$arrField = [];
$arrField['name'] = $name;
$arrField['student_id'] = $student_id;
$arrField['gender'] = $gender;
$arrField['email'] = $email;
$arrField['phone'] = $phone;
$arrField['address'] = $address;
$arrField['birthday'] = $birthday;


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