<?php
require "../../../../../init.php";

$result = [];
$sql = [];
$table = 'femobile_hotel_room_betty';
$tableBranch='femobile_hotel_branch_betty';
$whereClause = '1=1'; 
$sql="select room_id,room_name,branch_id from femobile_hotel_room_betty ;";

$records = dbGetAll($sql); 
$total = dbGetTotal($records); 
// output result
$result['total'] = $total;
$result['result'] = $records;


echo json_encode($result);

$sysConn = null;