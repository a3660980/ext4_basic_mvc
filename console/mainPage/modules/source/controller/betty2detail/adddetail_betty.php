<?php
require "../../../../../init.php";

// debug
// $sysConnDebug = true;

// result defination
$result = [];
$offer_id = uuid_generator();//格式:11DF29E7-C78C-4A89-9E5E-7FA86BBB9382,GUID是一种由算法生成的二进制长度为128位的数字标识符
$brand_id = isset($_POST['brand_id']) ? trim($_POST['brand_id']) : null;
$hand_gasoline_offer= isset($_POST['hand_gasoline_offer']) ? trim($_POST['hand_gasoline_offer']) : null;
$self_gasoline_offer= isset($_POST['self_gasoline_offer']) ? trim($_POST['self_gasoline_offer']) : null;
$diesel_offer= isset($_POST['diesel_offer']) ? trim($_POST['diesel_offer']) : null;
$created_date= date(DB_DATE_FORMAT);
$operator= $sysSession->user_name;

dbBegin();

// db execution
$table = 'joinme_brand_log';//資料表名稱
//對應欄位名稱
$arrField = [];
$arrField['offer_id'] = $offer_id;
$arrField['brand_id'] = $brand_id;
$arrField['hand_gasoline_offer'] = (double)$hand_gasoline_offer;//浮點數
$arrField['self_gasoline_offer'] = (double)$self_gasoline_offer;
$arrField['diesel_offer'] = (double)$diesel_offer;
$arrField['created_date'] = $created_date;
$arrField['operator'] = $operator;

$result['success'] = dbInsert($table, $arrField);
$result['msg'] = $result['success'] ? 'success' : 'fails';


if ($result['success']){
    dbCommit();
}else{
    dbRollback();
}

echo json_encode($result);
