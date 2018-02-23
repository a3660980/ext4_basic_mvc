<?php
require "../../../../../init.php";


// result defination
$result = [];
$sql = [];

$name = isset($_POST['name']) ? trim($_POST['name']) : null; //判斷是否有數值 有去掉空白 無則傳回空白
$title = isset($_POST['title']) ? trim($_POST['title']) : null;
$content = isset($_POST['content']) ? trim($_POST['content']) : null;
$created_date=date(DB_DATE_FORMAT);
// db execution
$table = 'tabfeed'; //儲存位置

$arrField = []; //自定變數陣列
$arrField['name'] = $name;
$arrField['title'] = $title;
$arrField['content'] = $content;
$arrField['created_date'] = $created_date;


$result['success'] = dbInsert($table, $arrField);
$result['msg'] = $result['success'] ? 'success' : SQL_FAILS;

// output result
echo json_encode($result);