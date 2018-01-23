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
$table = "johnny_femobile_hotel_branch";

$dbResult = true;

foreach($data as $key => $row) {
    $branch_id = $row->branch_id;
    $whereClause = "{$table}.branch_id = '{$branch_id}'";
    $sql = "SELECT * FROM {$table} WHERE {$whereClause}";

    $records = dbGetAll($sql);

    if(count($records) == 0) {
        return; 
    }

    if (!dbDelete($table, $whereClause)) {
        $dbResult = false; 
        break;
    }


    $result['success'] = $dbResult;
    $result['msg'] = $result['success'] ? 'success' : SQL_FAILS;

   
}

echo json_encode($result);