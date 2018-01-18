<?php
require "../../../../../init.php";

if (!isset($_POST['data']) || empty($_POST['data'])) { 
    $result['success'] = false;
    $result['msg'] = 'No post data';
    echo json_encode($result);

    exit();
}
$result = [];
$data = json_decode($_POST['data']);
$data = is_array($data) ? $data : [$data];
$table = 'johnnyStudent';
$detailTable = 'studentscore';
$dbResult = true;
$DeleteFail = false;

//驗證資料表格要事先做判斷
foreach($data as $key => $row) {
    $id = $row->id;
    $sql2 = "SELECT  * FROM {$detailTable} WHERE {$detailTable}.student_id = {$id}";
    $detailRecords = dbGetAll($sql2);
    $detailCount = dbGetTotal($detailRecords);
    if($detailCount > 0) { //如果detail裡面 有資料 >0 的話 $DeleteFail = true
        $dbResult = false; 
        $DeleteFail = true; 
        break;
    }
}

if($DeleteFail == true) { // 如果$DeleteFail = true 直接給result fail
    $result['success'] = $dbResult;
    $result['msg'] = 'deleteFails';   //前端顯示訊息判斷
} else {

    dbBegin(); //單一資料表格 不用使用 transection 浪費資源 所以這邊可以不用

    $dbResult = true;

    foreach($data as $key => $row) {
        $id = $row->id;
        $whereClause = "{$table}.id = '{$id}'";
        $sql = "SELECT * FROM {$table} WHERE {$whereClause}";
        
        $records = dbGetAll($sql);
        
        if(count($records) == 0) {
            return; 
        }

        if (!dbDelete($table, $whereClause)) {
            $dbResult = false; 
            break;
        }
    }


    $result['success'] = $dbResult;
    $result['msg'] = $result['success'] ? 'success' : SQL_FAILS;

    if ($result['success']) {
        dbCommit();
    } else {
        dbRollback();
    }
}


echo json_encode($result);