<?php
require "../../../../../init.php";

// $sysConnDebug = true;

// result defination
$result = [];
$sql = [];
$operator = $sysSession->user_name;

$updated_date = date(DB_DATE_FORMAT);
$branch_id = isset($_POST['branch_id']) ? trim($_POST['branch_id']) : null;
$branch_sort = isset($_POST['branch_sort']) ? trim($_POST['branch_sort']) : null;
$branch_name = isset($_POST['branch_name']) ? trim($_POST['branch_name']) : null;

// db execution
$table = 'femobile_hotel_branch';

$column = "*";

$whereClause = "branch_id = '{$branch_id}'";

$arrField = [];
$arrField['branch_sort'] = $branch_sort;
$arrField['branch_name'] = $branch_name;
$arrField['updated_date'] = $updated_date;
$arrField['operator'] = $operator;

// 判斷是否已經有相同的飯店名稱
// $sql="SELECT branch_name FROM {$table} where branch_name = '{$branch_name}' ";
// $records = dbGetAll($sql);

// if (!empty($records)) {
// 	$result = [
//             'success' => false,
//             'msg' => '請勿輸入相同飯店名稱'
//         ];

//         echo json_encode($result);

//         return;
// }

dbBegin();

$result['success'] = dbUpdate($table, $arrField, $whereClause);
$result['msg'] = $result['success'] ? 'success' : 'fails';

if ($result['success']) {
    dbCommit();
} else {
    dbRollback();
}

// output result
echo json_encode($result);