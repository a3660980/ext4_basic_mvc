<?php
require "../../../../../init.php";

// $sysConnDebug = true;

$result = [];
$current_date = date(DB_DATE_FORMAT);

// post & session variable
$corp_id = trim($_POST['corp_id']);
$user_name = trim($_POST['user_name']);
$name = trim($_POST['name']);
$department = trim($_POST['department']);
$title = trim($_POST['title']);
$mobile_phone = trim($_POST['mobile_phone']);
$email = trim($_POST['email']);

$authorization_item	= trim($_POST['authorization_item']);
$operator = $sysSession->user_name;

// db execution
$table = CPS_TABLE_USER_PROFILE;
$arrField = [];
$whereClasue = "user_name='{$user_name}'";

empty($department) ? null: ($arrField['department'] = $department);
empty($title) ? null: ($arrField['title'] = $title);
$arrField['name'] = $name;
$arrField['mobile_phone'] = $mobile_phone;
$arrField['email'] = $email;
$arrField['updated_date'] = $current_date;
$arrField['operator'] = $operator;
$arrField['authorization_item']	= $authorization_item;

$result['success'] = dbUpdate($table, $arrField, $whereClasue);
$result['msg'] = $result['success'] ? 'success' : 'fails';

// output result
echo json_encode($result);