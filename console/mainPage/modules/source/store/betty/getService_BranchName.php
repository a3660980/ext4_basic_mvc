<?php
require "../../../../../init.php";

$result = [];
$sql = [];
$table = 'femobile_hotel_branch_betty';
$whereClause = '1=1'; 
$sql="SELECT branch_name,branch_id FROM {$table} where {$whereClause}";
$records = dbGetAll($sql); 
$total = dbGetTotal($records); 
// output result
$result['total'] = $total;
$result['result'] = $records;


echo json_encode($result);

$sysConn = null;