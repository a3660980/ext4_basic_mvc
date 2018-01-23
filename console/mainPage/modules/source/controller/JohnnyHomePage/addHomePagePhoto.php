<?php
require "../../../../../init.php";

$result = [];
$home_id = uuid_generator();
$home_name = isset($_POST['home_name']) ? trim($_POST['home_name']) : null;
$home_photo = null;
$uploadParam='home_photo';
$home_sort = isset($_POST['home_sort']) ? trim($_POST['home_sort']) : null;
$start_date = !empty($_POST['start_date']) ? trim($_POST['start_date']) : date(DB_DATE_FORMAT);
$expire_date = !empty($_POST['expire_date']) ? trim($_POST['expire_date']) : null;
$created_date= date(DB_DATE_FORMAT);
$operator= $sysSession->user_name;

if (isset($_FILES) && ! empty($_FILES[$uploadParam]['name'])) {
   $extension = strtolower(pathinfo($_FILES[$uploadParam]['name'], PATHINFO_EXTENSION));
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

    $filePath = "JohnnyHotelHomePage/{$home_id}";
    $fileName = $home_id.'_photo';
    $uploadFileResult = uploadFile($filePath, $fileName, $uploadParam);
     
    if ($uploadFileResult['result']==false) {
        $result['success'] = false;
        $result['msg'] = $uploadFileResult['msg'];
        echo json_encode($result);

        return;
    }

    $home_photo = $uploadFileResult['name'];

}else{
    $result = [
        'success' => false,
        'msg' => "圖檔未上傳或上傳失敗"
    ];

    echo json_encode($result);

    return;
}





$table = "johnny_femobile_hotel_homepage";

$arrField = []; //自定變數陣列
$arrField['home_id'] = $home_id;
$arrField['home_name'] = $home_name;
$arrField['home_photo'] = $home_photo;
$arrField['home_sort'] = $home_sort;
$arrField['start_date'] = $start_date;
$arrField['expire_date'] = $expire_date;
$arrField['created_date'] = $created_date;
$arrField['operator'] = $operator;


$result['success'] = dbInsert($table, $arrField);
$result['msg'] = $result['success'] ? 'success' : SQL_FAILS;

echo json_encode($result);