<?php
require "../../../../../init.php";

// $sysConnDebug = true;

if (! isset($_POST['data']) || empty($_POST['data'])) {
    $result['success'] = false;
    $result['msg'] = 'No post data';
    echo json_encode($result);

    exit();
}

$data = $_POST['data'];
$status = $_POST['status'];
// result defination
$result = [];
$sql = [];

// default
$current_date = date(DB_DATE_FORMAT);
$operator = $sysSession->user_name;

// db execution
$table = CPS_TABLE_USER_ACCOUNT;
$table2 = CPS_TABLE_USER_DEVICE;
dbBegin();

$data = explode(',', $data);

if (! is_array($data)) {
    $data = [$data];
}

foreach ($data as $key => $value) {
    $user_name = $value;

    $arrField = [];
    $arrField['user_status'] = $status;
    $arrField['last_updated_date'] = $current_date;
    $arrField['operator'] = $operator;
    $whereClause = "user_name = '{$user_name}'";

    if ($status == 0) $whereClause .= " AND user_status != 1";

    if (! dbUpdate($table, $arrField, $whereClause)) {
        $result['success'] = false;
        $result['msg'] = '修改失敗';
        echo json_encode($result);

        exit;
    }

    $arrField = [];
    $arrField['device_status'] = $status;
    $arrField['device_updated_date'] = $current_date;

    $whereClause = "user_name = '{$user_name}'";

    if ($status == 0) $whereClause .= " AND device_status != 1";

    dbUpdate($table2, $arrField, $whereClause);
}

$result['success'] = true;
$result['msg'] = 'success';

if ($result['success'] && updateCorpAccount()) {
    dbCommit();
} else {
    dbRollback();
    $result['msg'] = UPDATE_FAILS;
}

// output result
echo json_encode($result);