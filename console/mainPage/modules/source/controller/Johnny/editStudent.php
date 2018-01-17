<?php
require "../../../../../init.php";

$result = [];
$current_date = date(DB_DATE_FORMAT);

$id = isset($_POST['id']) ? trim($_POST['id']) : null;
$name = isset($_POST['name']) ? trim($_POST['name']) : null;
$sex = isset($_POST['sex']) ? trim($_POST['sex']) : null;
$email = isset($_POST['email']) ? trim($_POST['email']) : null;
$cellphone = isset($_POST['cellphone']) ? trim($_POST['cellphone']) : null;

$table = 'johnnyStudent';

$whereClause = "id = '{$id}'";

$arrField = [];
$arrField['id'] = $id;
$arrField['name'] = $name;
$arrField['sex'] = $sex;
$arrField['email'] = $email;
$arrField['cellphone'] = $cellphone;

dbBegin();

$result['success'] = dbUpdate($table, $arrField, $whereClause);
$result['msg'] = $result['success'] ? 'success' : 'fails';

if ($result['success']) {
    dbCommit(); 
} else {
    dbRollback();
}

echo json_encode($result);