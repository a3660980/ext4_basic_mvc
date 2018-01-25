<?php
require "../../../../../init.php";
$result = [];
$sql = [];
$table = 'femobile_hotel_photo_betty';//要使用的資料表名稱
$whereClause = '1=1'; //永遠條件成立
$orderby = "{$table}.photo_sort ASC,{$table}.updated_date ASC";
$getTotalSql = "SELECT COUNT(*) FROM {$table} where {$whereClause}";//where永遠成立
$sql="SELECT * FROM {$table} where {$whereClause} order by {$orderby} ";

$records = dbGetAll($sql); 
$total = dbGetTotal($records); 

//把datetime傳成date
foreach ($records as $i => $value) {
    if(!empty($value['created_date']))
        $records[$i]['created_date'] =date("Y-m-d H:i:s",strtotime($value['created_date']));
    if(!empty($value['updated_date']))
        $records[$i]['updated_date'] =date("Y-m-d H:i:s",strtotime($value['updated_date']));
}

$result['total'] = $total;
$result['result'] = $records;

// output result
$result['total'] = $total;
$result['result'] = $records;

echo json_encode($result);

$sysConn = null;