<?php
require "../../../../../init.php";
// ini_set('display_error', true);
// $sysConnDebug = true;
$result = [];
$sql = [];

// db execution
$table = 'femobile_hotel_branch';

$sql = "SELECT branch_name FROM {$table} ORDER BY branch_name";

$records = dbGetAll($sql); 

$result['result'] = $records;

echo json_encode($result);
