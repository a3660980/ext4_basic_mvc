<?php
require "../../../../../init.php";

// debug
 // $sysConnDebug = true;
// ini_set('display_errors', 1); 
// result defination
$result = [];

$current_date = date(DB_DATE_FORMAT);
$uuid = uuid_generator();
$operator = $sysSession->user_name;

$branch_id = isset($_POST['branch_id']) ? trim($_POST['branch_id']) : null;
$photo_sort = isset($_POST['photo_sort']) ? trim($_POST['photo_sort']) : null;
$photo_name = isset($_POST['photo_name']) ? trim($_POST['photo_name']) : null;
$photo_url = isset($_POST['photo_url']) ? trim($_POST['photo_url']) : null;
$user_i18n = isset($_POST['user_i18n']) ? trim($_POST['user_i18n']) : null;

dbBegin();

$fileName = "{$uuid}"."_photo";
$photo_url = null;
$uploadParam = 'photo_url';
if (isset($_FILES) && ! empty($_FILES[$uploadParam]['name'])) {
   $extension = strtolower(pathinfo($_FILES[$uploadParam]['name'], PATHINFO_EXTENSION));

    //check picture .png/.jpg
    if ($extension != 'png' && $extension != 'jpg') {
        $result = [
            'success' => false,
            'msg' => '圖檔只支援副檔名為PNG和JPG'
        ];

        echo json_encode($result);

        return;
    }
    $imginfo = getimagesize($_FILES[$uploadParam]['tmp_name']);

    if($imginfo[0]!=1080&&$imginfo[1]!=1920){
        $result = [
            'success' => false,
            'msg' => '照片尺寸只能為1080X1920px，請確認！'
        ];
        echo json_encode($result);
        return;
    }
    $filePath = "HotelPhoto/images";
    $uploadFileResult = uploadFile($filePath, $fileName, $uploadParam);

    if (! $uploadFileResult) {
        $result['success'] = false;
        $result['msg'] = $uploadFileResult['msg'];
        echo json_encode($result);
        return;
    }

    $photo_url = $uploadFileResult['name'];

}

// db execution
$table = 'femobile_hotel_photo';
$arrField = [];
$arrField['branch_photo_id'] = $uuid;
$arrField['branch_id'] = $branch_id;
$arrField['photo_sort'] = $photo_sort;
$arrField['photo_name'] = $photo_name;
$arrField['photo_url'] = $photo_url;
$arrField['user_i18n'] = $user_i18n;
$arrField['created_date'] = $current_date;
$arrField['operator'] = $operator;


$result['success'] = dbInsert($table, $arrField);
$result['msg'] = $result['success'] ? 'success' : 'fails';

if ($result['success']){
    dbCommit();
}else{
    dbRollback();
}

// output result
echo json_encode($result);
