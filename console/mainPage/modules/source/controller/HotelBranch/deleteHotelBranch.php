<?php
require "../../../../../init.php";
// ini_set('display_error', true);
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
$table = 'femobile_hotel_branch';
$table_photo ='femobile_hotel_photo';
$table_room = 'femobile_hotel_room';
$table_detail = 'femobile_hotel_detail';


// $records = dbGetAll($sql);
// var_dump($records);

dbBegin();
$dbResult = true;

foreach($data as $key => $row) {
    // var_dump($row);
    $branch_id = $row->branch_id;

    $whereClause = "{$table}.branch_id = '{$branch_id}'";
    //確認各館照片是否有值
    $sql_photo = "SELECT branch_id FROM {$table_photo} WHERE {$table_photo}.branch_id = '{$branch_id}'";
    $records_photo = dbGetAll($sql_photo);


    //確認各館房型是否有值
    $sql_room = "SELECT branch_id FROM {$table_room} WHERE {$table_room}.branch_id = '{$branch_id}'";
    $records_room = dbGetAll($sql_room);
    
    
    //確認房型照片是否有值
    $sql_detail = "SELECT branch_id FROM {$table_detail} WHERE {$table_detail}.branch_id = '{$branch_id}'";
    $records_detail = dbGetAll($sql_detail);

    // 確定detail沒有資料刪除所有訊息
    $sql = "SELECT * FROM {$table} WHERE {$table}.branch_id = '{$branch_id}'";
    $records = dbGetAll($sql);

    if(count($records_photo) != 0 || count($records_detail) != 0 || count($records_room) != 0){
// var_dump($records_photo);
        $dbResult = false;
        
        $fails = "請確認各館照片、各館房型及房型照片仍有資料！";
        break;

    }

      
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
$result['msg'] = $result['success'] ? 'success' : $fails ;

if ($result['success']) {
    dbCommit();
} else {
    dbRollback();
}

// output result
echo json_encode($result);