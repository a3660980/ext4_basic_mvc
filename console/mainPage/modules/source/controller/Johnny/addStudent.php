<?php
require "../../../../../init.php";


$id = isset($_POST['id']) ? trim($_POST['id']) : null;
$name = isset($_POST['name']) ? trim($_POST['name']) : null;
$sex = isset($_POST['sex']) ? trim($_POST['sex']) : null;
$email = isset($_POST['email']) ? trim($_POST['email']) : null;
$cellphone = isset($_POST['cellphone']) ? trim($_POST['cellphone']) : null;

$table = 'johnnyStudent';

$arrField = []; //自定變數陣列
$arrField['id'] = $id;
$arrField['name'] = $name;
$arrField['sex'] = $sex;
$arrField['email'] = $email;
$arrField['cellphone'] = $cellphone;

dbBegin(); 

$result['success'] = dbInsert($table, $arrField);
$result['msg'] = $result['success'] ? 'success' : SQL_FAILS;

if ($result['success'] ) {
    dbCommit(); 
} else {
    dbRollback(); 
}

echo json_encode($result);