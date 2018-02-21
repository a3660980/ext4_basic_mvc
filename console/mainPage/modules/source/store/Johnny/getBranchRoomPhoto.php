<?php
require "../../../../../init.php";

$result = [];

$whereClause = '1=1';

$orderby = "johnny_femobile_hotel_detail.room_id, johnny_femobile_hotel_detail.detail_sort ASC";

$sql="SELECT johnny_femobile_hotel_branch.branch_name, johnny_femobile_hotel_room.room_name, johnny_femobile_hotel_room.room_spec, johnny_femobile_hotel_detail.* FROM johnny_femobile_hotel_detail LEFT JOIN johnny_femobile_hotel_branch ON johnny_femobile_hotel_detail.branch_id = johnny_femobile_hotel_branch.branch_id LEFT JOIN johnny_femobile_hotel_room ON johnny_femobile_hotel_room.room_id = johnny_femobile_hotel_detail.room_id where 1=1 ORDER BY {$orderby};";

$records = dbGetAll($sql);
$total = dbGetTotal($records);

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
closeConn();