<?php
require "../../../../../init.php";

$result = [];
$table = "johnny_femobile_hotel_photo";
$whereClause = '1=1';
$orderby = "{$table}.photo_sort ASC";

$limit = isset($_POST['limit']) ? trim($_POST['limit']) : 0;
$start = isset($_POST['start']) ? trim($_POST['start']) : 0;
$sql="SELECT * FROM {$table} where {$whereClause} ORDER BY {$orderby} LIMIT {$start}, {$limit}";

$records = dbGetAll($sql);
$total = dbGetTotal($records);
$result['total'] = $total;
$result['result'] = $records;

echo json_encode($result);
closeConn();