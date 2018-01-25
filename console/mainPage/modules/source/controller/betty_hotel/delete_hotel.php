<?php
require "../../../../../init.php";


$result = [];
$sql = [];

if (! isset($_POST['data']) || empty($_POST['data'])) { //未輸入或輸入空白
    $result['success'] = false;
    $result['msg'] = 'No post data';
    echo json_encode($result);

    exit();
}

$data = json_decode($_POST['data']);

// object ot array
$data = is_array($data) ? $data : [$data]; //is_array是否為陣列 是輸出否則加上陣列輸出

// db execution
$table = 'femobile_hotel_homepage_betty';
$dbResult = true;
dbBegin();
foreach($data as $key => $row) {
    //foreach ( 陣列 as $key => $value )
    // var_dump($row);
    $home_id = $row->home_id;

    $whereClause = "{$table}.home_id = '{$home_id}'";

    // 刪除所有訊息
    $sql = "SELECT * FROM {$table} WHERE {$whereClause}";
    $records = dbGetAll($sql);
    if(count($records) == 0){
        return; //沒有須刪除的資料
    }

    if (! dbDelete($table, $whereClause)) {
        $dbResult = false; //斷線或其他因素刪除db失敗時
        break;
    }//$result = true;刪除成功
}

$result['success'] = $dbResult;
$result['msg'] = $result['success'] ? 'success' : 'fails';

if ($result['success']) {
    dbCommit();//提交$sysConn->commit()
} else {
    dbRollback();
}

// output result
echo json_encode($result);