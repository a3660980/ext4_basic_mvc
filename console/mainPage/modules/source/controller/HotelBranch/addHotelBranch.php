<?php
require "../../../../../init.php";

// ini_set('display_error', true);
// result defination
$result = [];
$sql = [];
$user_corp_id = $sysSession->corp_id;
$operator = $sysSession->user_name;
$created_date = date(DB_DATE_FORMAT);
$branch_id = uuid_generator();
$table = 'femobile_hotel_branch';

$branch_sort = isset($_POST['branch_sort']) ? trim($_POST['branch_sort']) : null;
$branch_name = isset($_POST['branch_name']) ? trim($_POST['branch_name']) : null;
$user_i18n = isset($_POST['user_i18n']) ? trim($_POST['user_i18n']) : null;

// 判斷是否已經有相同的飯店名稱
$sql="SELECT branch_name FROM {$table} where branch_name = '{$branch_name}' ";
$records = dbGetAll($sql);

if (!empty($records)) {
	$result = [
            'success' => false,
            'msg' => '請勿輸入相同飯店名稱'
        ];

        echo json_encode($result);

        return;
}
// db execution


$arrField = [];
$arrField['branch_id'] = $branch_id;
$arrField['branch_sort'] = $branch_sort;
$arrField['branch_name'] = $branch_name;
$arrField['user_i18n'] = $user_i18n;
$arrField['created_date'] = $created_date;
$arrField['operator'] = $operator;



dbBegin();

$result['success'] = dbInsert($table, $arrField);
$result['msg'] = $result['success'] ? 'success' : SQL_FAILS;

if ($result['success'] ) {
    dbCommit();
} else {
    dbRollback();
}

// output result
echo json_encode($result);