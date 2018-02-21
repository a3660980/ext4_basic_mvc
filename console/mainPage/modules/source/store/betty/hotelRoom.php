<?php
require "../../../../../init.php";
//ini_set("display_errors", 1);
$result = [];
$sql = [];
$table = 'femobile_hotel_room_betty';
$tableBranch='femobile_hotel_branch_betty';//要使用的資料表名稱
$whereClause = '1=1'; //永遠條件成立
$orderby = "{$table}.room_sort ASC,{$table}.updated_date ASC";
//$getTotalSql = "SELECT COUNT(*) FROM {$table} where {$whereClause}";//where永遠成立
$sql=" SELECT * FROM femobile_hotel_room_betty  join femobile_hotel_branch_betty on femobile_hotel_room_betty.branch_id = femobile_hotel_branch_betty.branch_id WHERE {$whereClause} ORDER BY {$orderby}";

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