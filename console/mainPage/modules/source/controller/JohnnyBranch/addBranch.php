<?php
require "../../../../../init.php";

$result = [];
$branch_id = uuid_generator();
$branch_name = isset($_POST['branch_name']) ? trim($_POST['branch_name']) : null;
$branch_photo = null;
$uploadParam='branch_photo';
$branch_sort = isset($_POST['branch_sort']) ? trim($_POST['branch_sort']) : null;
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

    $filePath = "JohnnyHotelHomePage/{$branch_id}";
    $fileName = $branch_id.'_photo';
    $uploadFileResult = uploadFile($filePath, $fileName, $uploadParam);
     
    if ($uploadFileResult['result']==false) {
        $result['success'] = false;
        $result['msg'] = $uploadFileResult['msg'];
        echo json_encode($result);

        return;
    }

    $branch_photo = $uploadFileResult['name'];

}



$table = "johnny_femobile_hotel_branch";

$arrField = []; //自定變數陣列
$arrField['branch_id'] = $branch_id;
$arrField['branch_name'] = $branch_name;
$arrField['branch_photo'] = $branch_photo;
$arrField['branch_sort'] = $branch_sort;
$arrField['created_date'] = $created_date;
$arrField['operator'] = $operator;


$result['success'] = dbInsert($table, $arrField);
$result['msg'] = $result['success'] ? 'success' : SQL_FAILS;

echo json_encode($result);