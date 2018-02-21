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
$table = 'tmsperformancedata';

dbBegin();
$dbResult = true;

foreach($data as $key => $row) {
    //foreach(陣列名稱 as 下标变量=> 值变量)
    
    $sysid = $row->sysid;

    $whereClause = "{$table}.sysid = '{$sysid}'";

    // 刪除所有訊息
    $sql = "SELECT * FROM {$table} WHERE {$whereClause}";
    $records = dbGetAll($sql);
    if(count($records) == 0){
        return; //沒有須刪除的資料
    }

    if (! dbDelete($table, $whereClause)) {
        $dbResult = false; //斷線或其他因素刪除db時失敗
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