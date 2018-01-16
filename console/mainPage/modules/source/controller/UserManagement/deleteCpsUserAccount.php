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
$current_date = date(DB_DATE_FORMAT);

// object ot array
$data = is_array($data) ? $data : [$data];

// db execution
$table = CPS_TABLE_USER_ACCOUNT;
$table2 = CPS_TABLE_USER_DEVICE;
$table3 = CPS_TABLE_USER_SESSION;
$table4 = CPS_TABLE_MESSAGE_PUSH;
$table5 = CPS_TABLE_WORKGROUP_MEMBER;
$table6 = CPS_TABLE_USER_WORKGROUP;

dbBegin();
$dbResult = true;

foreach($data as $key => $row) {
    $user_name = $row->user_name;
    $user_mobile_number_1 = $row->user_mobile_number_1;
    $user_email_1 = $row->user_email_1;
    $device_app_id = $row->device_app_id;

    $whereClause = "{$table}.user_name = '{$user_name}' "
                . "AND {$table}.user_mobile_number_1 = '{$user_mobile_number_1}' "
                . "AND {$table}.user_email_1 = '{$user_email_1}'";
    $whereClause2 = "user_name = '{$user_name}'";
    $whereClause3 = "session_user_name = '{$user_name}'";
    $whereClause4 = "message_sender = '{$user_name}' OR message_receiver = '{$user_name}'";
    $whereClause5 = "user_name = '{$user_name}'";

    // 刪除所有訊息
    $sql = "SELECT * FROM {$table4} WHERE {$whereClause4}";
    $records = dbGetAll($sql);

    foreach ($records as $messageKey => $messageRow) {
        if ($messageRow['message_type'] == 1) {
            $detailTable = CPS_TABLE_MESSAGE_TEXT;
        } else if ($messageRow['message_type'] == 2) {
            $detailTable = CPS_TABLE_MESSAGE_FORM;
        } else if ($messageRow['message_type'] == 3) {
            $detailTable = CPS_TABLE_MESSAGE_FILE;
        }
        $detailWhereClause = "uuid = '" .$messageRow['message_data_id'] ."'";
        dbDelete($detailTable, $detailWhereClause);
    }

    // 取得群組id
    $sql = "SELECT * FROM {$table5} WHERE {$whereClause5}";
    $records = dbGetAll($sql);

    // 刪除群組內使用者
    dbDelete($table5, $whereClause5);

    foreach ($records as $workKey => $workRow) {
        $workgroup_id = $workRow['workgroup_id'];
        $workgroupWhereClause = "workgroup_id = '{$workgroup_id}'";
        $sql = "SELECT * FROM {$table5} WHERE {$workgroupWhereClause}";
        // 判斷此群組是否有人, 沒有則刪除
        if (dbGetRow($sql) === false) {
            dbDelete($table6, $workgroupWhereClause);
        }
    }

    dbDelete($table4, $whereClause4);
    dbDelete($table3, $whereClause3);
    dbDelete($table2, $whereClause2);

    if (! dbDelete($table, $whereClause)) {
        $dbResult = false;
        break;
    }
    $pk_name = [
        'user_name' => $user_name,
        'device_app_id' => $device_app_id
    ];
    if (! insertDataSync('grouper_contact_profile', json_encode($pk_name), 'D', $current_date)) {
        $dbResult;
        break;
    };
}

$result['success'] = $dbResult;
$result['msg'] = $result['success'] ? 'success' : 'fails';

if ($result['success'] && updateCorpAccount()) {
    dbCommit();
} else {
    dbRollback();
    $result['msg'] = UPDATE_FAILS;
}

// output result
echo json_encode($result);