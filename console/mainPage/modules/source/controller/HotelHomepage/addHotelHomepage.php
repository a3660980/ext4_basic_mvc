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

$home_sort = isset($_POST['home_sort']) ? trim($_POST['home_sort']) : null;
$home_name = isset($_POST['home_name']) ? trim($_POST['home_name']) : null;
$user_i18n = isset($_POST['user_i18n']) ? trim($_POST['user_i18n']) : null;
$start_date = isset($_POST['start_date']) ? trim($_POST['start_date']) : null;
$expire_date = isset($_POST['expire_date']) ? trim($_POST['expire_date']) : null;

dbBegin();

if( ($start_date !='') && ($expire_date !='') && ($start_date >= $expire_date) ){
    $result = [
        'success' => false,
        'msg' => '生效日不可大於或等於截止日。'
    ];
    echo json_encode($result);
    return;
}
$fileName = "{$uuid}"."_photo";
$home_photo = null;
$uploadParam = 'home_photo';
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
    $filePath = "HotelHomepage/images";
    $uploadFileResult = uploadFile($filePath, $fileName, $uploadParam);

    if (! $uploadFileResult) {
        $result['success'] = false;
        $result['msg'] = $uploadFileResult['msg'];
        echo json_encode($result);
        return;
    }

    $home_photo = $uploadFileResult['name'];

}



if ($expire_date == '') $expire_date = null;

// db execution
$table = 'femobile_hotel_homepage';
$arrField = [];
$arrField['home_id'] = $uuid;
$arrField['home_sort'] = $home_sort;
$arrField['home_name'] = $home_name;
$arrField['home_photo'] = $home_photo;
$arrField['user_i18n'] = $user_i18n;
$arrField['start_date'] = $start_date;
$arrField['expire_date'] = $expire_date;
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
