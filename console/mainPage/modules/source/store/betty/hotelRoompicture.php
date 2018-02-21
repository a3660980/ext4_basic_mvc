<?php
require "../../../../../init.php";
//ini_set("display_errors", 1);
$result = [];
$sql = [];
//$table = 'femobile_hotel_room_betty';
// $tableBranch='femobile_hotel_branch_betty';
// $tableDetail='femobile_hotel_detail_betty';
$filter = isset($_POST['filter']) ? json_decode(trim($_POST['filter'])) : null;  //json_decode:字符串转换
//($_POST['filter'])，過濾器，在MASTER中對應DETAIL索引，然後才可以過濾出相等的東西
if ($filter == null) {
    echo json_encode($result);
    return;
}
$whereClause = '1=1'; //永遠條件成立
$orderby = "{$table}.detail_sort ASC,{$table}.updated_date ASC";
$getTotalSql = "SELECT COUNT(*) FROM {$table} where {$whereClause}";//where永遠成立
$sql="  SELECT * FROM femobile_hotel_detail_betty  join femobile_hotel_room_betty on femobile_hotel_detail_betty.branch_id = femobile_hotel_room_betty.branch_id ORDER BY femobile_hotel_detail_betty.detail_sort asc ,femobile_hotel_detail_betty.updated_date ASC  ";

$records = dbGetAll($sql); 
$total = dbGetTotal($records); 

//把datetime傳成date
foreach ($records as $i => $value) {

    if(!empty($value['start_date'])){
        $records[$i]['start_date'] = date("Y-m-d",strtotime($value['start_date']));
    }
    if(!empty($value['expire_date'])){
        $records[$i]['expire_date']= date("Y-m-d",strtotime($value['expire_date']));
    }
    if(!empty($value['created_date']))
        $records[$i]['created_date'] =date("Y-m-d H:i:s",strtotime($value['created_date']));
    if(!empty($value['updated_date']))
        $records[$i]['updated_date'] =date("Y-m-d H:i:s",strtotime($value['updated_date']));
}

$result['total'] = $total;
$result['result'] = $records;

echo json_encode($result);

$sysConn = null;