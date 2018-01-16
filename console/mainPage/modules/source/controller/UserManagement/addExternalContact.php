<?php
require "../../../../../init.php";

// debug
 // $sysConnDebug = true;

// result defination
$result = [];

$current_date = date(DB_DATE_FORMAT);


$student_id = isset($_POST['student_id']) ? trim($_POST['student_id']) : null;
$name = isset($_POST['name']) ? trim($_POST['name']) : null;
//isset:true回傳遞一個，不是的話，回傳空值
$gender= isset($_POST['gender']) ? trim($_POST['gender']) : null;
$email = isset($_POST['email']) ? trim($_POST['email']) : null;
$phone = isset($_POST['phone']) ? trim($_POST['phone']) : null;
$address = isset($_POST['address']) ? trim($_POST['address']) : null;
$birthday = isset($_POST['birthday']) ? trim($_POST['birthday']) : null;
 // var_dump($hand_gasoline_offer);


dbBegin();

// db execution
$table = 'profile_ant';

$arrField = [];
$arrField['student_id'] = $student_id;
$arrField['name'] = $name;
$arrField['gender'] = $gender;
$arrField['email'] = $email;
$arrField['phone'] = $phone;
$arrField['address'] = $address;
$arrField['birthday'] = $birthday;

$result['success'] = dbInsert($table, $arrField);
$result['msg'] = $result['success'] ? 'success' : 'fails';


if ($result['success']){
    dbCommit();
}else{
    dbRollback();
}

echo json_encode($result);
