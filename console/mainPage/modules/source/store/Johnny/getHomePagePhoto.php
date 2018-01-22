<?php
require "../../../../../init.php";

$result = [];
$table = "johnny_femobile_hotel_homepage";
$whereClause = '1=1';

$sql="SELECT * FROM {$table} where {$whereClause}";

$records = dbGetAll($sql);
$total = dbGetTotal($records);
$result['total'] = $total;
$result['result'] = $records;

echo json_encode($result);
closeConn();