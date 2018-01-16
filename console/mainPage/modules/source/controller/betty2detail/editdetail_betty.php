<?php
require "../../../../../init.php";

 // $sysConnDebug = true;

// result defination
$result = [];
$sql = [];
// db execution


$offer_id = isset($_POST['offer_id']) ? trim($_POST['offer_id']) : null;
$brand_id = isset($_POST['brand_id']) ? trim($_POST['brand_id']) : null;
$hand_gasoline_offer= isset($_POST['hand_gasoline_offer']) ? trim($_POST['hand_gasoline_offer']) : null;
$self_gasoline_offer= isset($_POST['self_gasoline_offer']) ? trim($_POST['self_gasoline_offer']) : null;
$diesel_offer= isset($_POST['diesel_offer']) ? trim($_POST['diesel_offer']) : null;
$created_date= isset($_POST['created_date']) ? trim($_POST['created_date']) : null;
$updated_date= date(DB_DATE_FORMAT);
$operator= $sysSession->user_name;



$table = 'joinme_brand_log';
// 資料表
$whereClause = "offer_id = '{$offer_id}'";//對應offer_id


$column = "*";


$arrField = [];
$arrField['offer_id'] = $offer_id;
$arrField['brand_id'] = $brand_id;
$arrField['hand_gasoline_offer'] = (double)$hand_gasoline_offer;
$arrField['self_gasoline_offer'] = (double)$self_gasoline_offer;
$arrField['diesel_offer'] = (double)$diesel_offer;
$arrField['created_date'] = $created_date;
$arrField['updated_date'] = $updated_date;
$arrField['operator'] = $operator;

//存取資料陣列

 dbBegin();
// 呼叫server端準備進行操作 

$result['success'] = dbUpdate($table, $arrField, $whereClause);
// 成功後依輸入值執行更新欄位的值
$result['msg'] = $result['success'] ? 'success' : 'fails';
// 判斷更新資料是否成功

if ($result['success'] ) {
    dbCommit();
    // 上傳更新資料
} else {
    dbRollback();
    // 不要執行更新，把資料庫的狀態復原至我們執行dbBegin的時間點
}

echo json_encode($result);
// 輸出是否成功訊息