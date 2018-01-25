<?php
require "../../../../../init.php";

// $sysConnDebug = true;

// result defination
$result = [];
$sql = [];

if (! isset($_POST['data']) || empty($_POST['data'])) {
    $result['success'] = false;
    $result['msg'] = 'No post data';
    echo json_encode($result);

    exit();
}

$data = json_decode($_POST['data']);
$current_date = date(DB_DATE_FORMAT);

// object ot array
$data = is_array($data) ? $data : [$data];

// db execution
$table = 'femobile_hotel_room';
$table_detail = 'femobile_hotel_detail';

// $sql = "SELECT branch_id FROM {$table_photo} WHERE {$table}.branch_name = {$table_photo}.'{$branch_name}'"
// $records = dbGetAll($sql);
// var_dump($records);

dbBegin();
$dbResult = true;

foreach($data as $key => $row) {
    // var_dump($row);


    $room_id = $row->room_id;

    $whereClause = "{$table}.room_id = '{$room_id}'";


    //確認房型照片是否有值
    $sql_detail = "SELECT room_id FROM {$table_detail} WHERE {$table_detail}.room_id = '{$room_id}'";
    $records_detail = dbGetAll($sql_detail);
    if(count($records_detail) != 0 ){
        $dbResult = false;
        
        $fails = "請確認房型照片仍有資料！";
        break;

    }


    // 刪除所有訊息
    $sql = "SELECT * FROM {$table} WHERE {$whereClause}";
    $records = dbGetAll($sql);
    if(count($records) == 0){
        return;
    }

    if (! dbDelete($table, $whereClause)) {
        $dbResult = false;
        $fails = 'fails';
        break;
    }
}

$result['success'] = $dbResult;
$result['msg'] = $result['success'] ? 'success' : $fails;

if ($result['success']) {
    dbCommit();
} else {
    dbRollback();
}

// output result
echo json_encode($result);