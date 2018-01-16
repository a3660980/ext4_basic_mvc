<?php
require "../../../../../init.php";

// debug
// $sysConnDebug = true;

// result defination
$result = [];

if (! isset($_POST['data']) || empty($_POST['data'])) {
    $result['success'] = false;
	$result['msg'] = '沒有資料.';
	echo json_encode($result);

	exit();
}

$data = json_decode($_POST['data']);
$current_date = date(DB_DATE_FORMAT);

// object ot array
$data = is_array($data) ? $data : [$data];

$table = 'profile_ant';
$dbResult = true;

dbBegin();

foreach($data as $key => $row) {
    $user_name = $row->user_name;
    $corp_id = $row->corp_id;
    $whereClause = "{$table}.corp_id = '{$corp_id}' AND {$table}.user_name = '{$user_name}'";

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
    $result['msg'] = UPDATE_FAILS;
}

echo json_encode($result);