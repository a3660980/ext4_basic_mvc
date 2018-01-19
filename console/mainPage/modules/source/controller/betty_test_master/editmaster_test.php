<?php
require "../../../../../init.php";
// $sysConnDebug = true;
// result defination
$result = [];
$sql = [];
// db execution
$brand_id = isset($_POST['brand_id']) ? trim($_POST['brand_id']) : null;
$brand_name = isset($_POST['brand_name']) ? trim($_POST['brand_name']) : null;
$brand_logo = null;
$uploadParam = 'brand_logo';
$web_url = isset($_POST['web_url']) ? trim($_POST['web_url']) : null;
//isset:true回傳遞一個，不是的話，回傳空值
$priority= isset($_POST['priority']) ? trim($_POST['priority']) : null;
$contract_status= isset($_POST['contract_status']) ? trim($_POST['contract_status']) : null;
$hand_gasoline_offer= isset($_POST['hand_gasoline_offer']) ? trim($_POST['hand_gasoline_offer']) : null;
$self_gasoline_offer= isset($_POST['self_gasoline_offer']) ? trim($_POST['self_gasoline_offer']) : null;
$diesel_offer= isset($_POST['diesel_offer']) ? trim($_POST['diesel_offer']) : null;
$reward_point= isset($_POST['reward_point']) ? trim($_POST['reward_point']) : null;
$reward_info= isset($_POST['reward_info']) ? trim($_POST['reward_info']) : null;
$created_date= isset($_POST['created_date']) ? trim($_POST['created_date']) : null;
$updated_date= date(DB_DATE_FORMAT);
$operator= $sysSession->user_name;

dbBegin();

$table = 'joinme_gas_brand';
// 資料表
$whereClause = "brand_id = '{$brand_id}'";

if (isset($_FILES)) {//不為空值
    $sql = "SELECT * FROM {$table} WHERE {$whereClause}";
    $records = dbGetAll($sql);
    //select data check
    if(count($records) == 0){
    return;
    }
    //db data change php array
    foreach ($records as $key => $row) {
        if($row['brand_logo'] != null)
        $brand_logo = $row['brand_logo'];
    }
    $filePath = "betty_test_master/{$brand_id}";
    $fileName = $brand_id;
    if(!empty($_FILES[$uploadParam]['name'])){
        $img_check = strtolower(pathinfo($_FILES[$uploadParam]['name'], PATHINFO_EXTENSION));
        //check file type is picture
        if (!$img_check) {
            $result = [
                'success' => false,
                'msg' => '檔案為非圖片格式類型'
            ];

            echo json_encode($result);

            return;
            }  
            $uploadFileResult = uploadFile($filePath, $fileName, $uploadParam);
            if ($uploadFileResult['result']==false) {
            $result['success'] = false;
            $result['msg'] = $uploadFileResult['msg'];
            echo json_encode($result);
            return;
            
        }
        $brand_logo = $uploadFileResult['name'];
    }
}    

$arrField = [];
$arrField['brand_id'] = $brand_id;
$arrField['brand_name'] = $brand_name;
$arrField['brand_logo'] = $brand_logo;
$arrField['web_url'] = $web_url;
$arrField['priority'] = $priority;
$arrField['contract_status'] = $contract_status;
$arrField['hand_gasoline_offer'] = (double)$hand_gasoline_offer;
$arrField['self_gasoline_offer'] = (double)$self_gasoline_offer;
$arrField['diesel_offer'] = (double)$diesel_offer;
$arrField['reward_point'] = (double)$reward_point;
$arrField['reward_info'] = $reward_info;
$arrField['created_date'] = $created_date;
$arrField['updated_date'] = $updated_date;
$arrField['operator'] = $operator;
$result['success'] = dbUpdate($table, $arrField, $whereClause);
$result['msg'] = $result['success'] ? 'success' : 'fails';
if ($result['success'] ) {
    dbCommit();
} else {
    dbRollback();
}
echo json_encode($result);
