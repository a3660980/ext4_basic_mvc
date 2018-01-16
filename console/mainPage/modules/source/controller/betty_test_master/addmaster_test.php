<?php
require "../../../../../init.php";//連結init.php

// debug
// $sysConnDebug = true;

// result defination
$result = [];

$brand_id = uuid_generator();//自動產生uuid
$brand_name = isset($_POST['brand_name']) ? trim($_POST['brand_name']) : null;
$brand_logo =  null;
$uploadParam = 'brand_logo';

if (isset($_FILES) && ! empty($_FILES[$uploadParam]['name'])) {//如果檔案存在
   $extension = strtolower(pathinfo($_FILES[$uploadParam]['name'], PATHINFO_EXTENSION));//取格式
    //strtolower:將字符串轉成小寫,pathinfo:返回文件路徑的信息
    //check picture .png/.jpg
   // PATHINFO_EXTENSION:取得文件副檔名
    if ($extension != 'png' && $extension != 'jpg') {
        $result = [
            'success' => false,
            'msg' => '圖檔只支援副檔名為PNG和JPG'
        ];

        echo json_encode($result);

        return;
    }

    $filePath = "betty_test_master/{$brand_id}";//上傳圖的路徑
    $fileName = $brand_id;
    $uploadFileResult = uploadFile($filePath, $fileName, $uploadParam);//上傳檔案，在init.php中
     
    if ($uploadFileResult['result']==false) {
        // 不是要判斷$uploadFileResult有沒有東西 
        // 而是要判斷$uploadFileResult陣列中的result的結果是否為false
        // 在執行下面程式碼
        $result['success'] = false;
        $result['msg'] = $uploadFileResult['msg'];
        echo json_encode($result);

        return;
    }

    $brand_logo = $uploadFileResult['name'];//上傳圖的檔案名稱

}else{//沒有上傳成功
    $result = [
        'success' => false,
        'msg' => "圖檔未上傳或上傳失敗"
    ];

    echo json_encode($result);

    return;
}

$web_url = isset($_POST['web_url']) ? trim($_POST['web_url']) : null;
//isset:true回傳遞一個，不是的話，回傳空值
$priority= isset($_POST['priority']) ? trim($_POST['priority']) : null;
$contract_status= isset($_POST['contract_status']) ? trim($_POST['contract_status']) : null;
$hand_gasoline_offer= isset($_POST['hand_gasoline_offer']) ? trim($_POST['hand_gasoline_offer']) : null;
$self_gasoline_offer= isset($_POST['self_gasoline_offer']) ? trim($_POST['self_gasoline_offer']) : null;
$diesel_offer= isset($_POST['diesel_offer']) ? trim($_POST['diesel_offer']) : null;
$reward_point= isset($_POST['reward_point']) ? trim($_POST['reward_point']) : null;
$reward_info= isset($_POST['reward_info']) ? trim($_POST['reward_info']) : null;
$created_date= date(DB_DATE_FORMAT);
$operator= $sysSession->user_name;//取得username

dbBegin();//開始一個事務 關閉自動提交 $sysConn->beginTransaction(); 

// db execution
$table = 'joinme_gas_brand';

$arrField = [];//宣告陣列
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
$arrField['operator'] = $operator;
 // var_dump((double)$hand_gasoline_offer);
$result['success'] = dbInsert($table, $arrField);//輸入資料
$result['msg'] = $result['success'] ? 'success' : 'fails';


if ($result['success']){
    dbCommit();//提交更新
}else{
    dbRollback();
}

echo json_encode($result);
