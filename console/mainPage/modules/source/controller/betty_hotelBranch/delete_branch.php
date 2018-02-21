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

$table = 'femobile_hotel_branch_betty';
$table_photo='femobile_hotel_photo_betty';
$table_detail='femobile_hotel_detail_betty';
$dbResult = true;
dbBegin();
foreach($data as $key => $row) {
    //foreach ( 陣列 as $key => $value )
    // var_dump($row);
    $branch_id = $row->branch_id;
    $whereClause = "{$table}.branch_id = '{$branch_id}'";
    $sql_photo = "SELECT branch_id FROM {$table_photo} WHERE {$table_photo}.branch_id = '{$branch_id}'";//取得photo中是否有資料
    $records_photo=dbGetAll($sql_photo);
    $sql_detail = "SELECT branch_id FROM {$table_detail} WHERE {$table_detail}.branch_id = '{$branch_id}'";//取得detail中是否有資料
    $records_photo=dbGetAll($sql_detail);
    //刪除所有訊息
    $sql = "SELECT * FROM {$table} WHERE {$whereClause}";
    $records = dbGetAll($sql);
    if(count($records_photo) !=0 || count($records_detail) !=0){//判斷photo和detail中是否有資料
       $dbResult = false;
       $fails='請先刪除其他資料表的資料';
       break;
    }
    if(count($records) == 0){
        return; //沒有須刪除的資料
    }

    if (! dbDelete($table, $whereClause)) {
        $dbResult = false; //斷線或其他因素刪除db失敗時
        $fails='fails';
        break;
    }//$result = true;刪除成功
}

$result['success'] = $dbResult;
$result['msg'] = $result['success'] ? 'success' : $fails;//'success':顯示成功訊息;$fails:取得上面if判斷中的錯誤訊息

if ($result['success']) {
    dbCommit();//提交$sysConn->commit()
} else {
    dbRollback();
}

// output result
echo json_encode($result);