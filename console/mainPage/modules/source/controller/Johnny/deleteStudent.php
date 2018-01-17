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

dbBegin();

$dbResult = true;
$DeleteFail = false;


foreach($data as $key => $row) {
    $id = $row->id;
    $whereClause = "{$table}.id = '{$id}'";
    $sql = "SELECT * FROM {$table} WHERE {$whereClause}";
    $sql2 = "SELECT  * FROM {$detailTable} WHERE {$table}.student_id = {$id}";
    $detailRecords = dbGetAll($sql2);
    $detailCount = dbGetTotal($detailRecords);
    
    $records = dbGetAll($sql);
    
    if(count($records) == 0) {
        return; 
    }

    if($detailCount == 0) {
        $dbResult = false; 
        $DeleteFail = true; 
        break;
    }

    if (!dbDelete($table, $whereClause)) {
        $dbResult = false; 
        break;
    }
}


$result['success'] = $dbResult;
$result['msg'] = $result['success'] ? 'success' : $DeleteFail ? 'deleteFails' : 'fails';

if ($result['success']) {
    dbCommit();
} else {
    dbRollback();
}

echo json_encode($result);