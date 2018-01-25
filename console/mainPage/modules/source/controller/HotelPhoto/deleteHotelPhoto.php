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

// object ot array
$data = is_array($data) ? $data : [$data];

// db execution
$table = 'femobile_hotel_photo';

dbBegin();
$dbResult = true;

foreach($data as $key => $row) {
    // var_dump($row);
    $branch_photo_id = $row->branch_photo_id;

    $whereClause = "{$table}.branch_photo_id = '{$branch_photo_id}'";

    if (! dbDelete($table, $whereClause)) {
        $dbResult = false;
        break;
    }
}

$result['success'] = $dbResult;
$result['msg'] = $result['success'] ? 'success' : 'fails';

if ($result['success']) {
    dbCommit();
} else {
    dbRollback();
}

// output result
echo json_encode($result);