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
$room_id = isset($_POST['room_id']) ? trim($_POST['room_id']) : null;
$detail_sort = isset($_POST['detail_sort']) ? trim($_POST['detail_sort']) : null;

dbBegin();

$fileName = "{$uuid}"."_photo";
$detail_photo = null;
$uploadParam = 'detail_photo';
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

    if($imginfo[0]!=1080||$imginfo[1]!=1080){
        $result = [
            'success' => false,
            'msg' => '照片尺寸只能為1080X1080px，請確認！'
        ];
        echo json_encode($result);
        return;
    }
    $filePath = "HotelDetail/images";
    $uploadFileResult = uploadFile($filePath, $fileName, $uploadParam);

    if ($uploadFileResult['result'] === false) {
        $result['success'] = false;
        $result['msg'] = $uploadFileResult['msg'];
        echo json_encode($result);
        return;
    }

    $detail_photo = $uploadFileResult['name'];

}

// db execution
$table = 'femobile_hotel_detail';
$arrField = [];
$arrField['detail_id'] = $uuid;
$arrField['branch_id'] = $branch_id;
$arrField['room_id'] = $room_id;
$arrField['detail_sort'] = $detail_sort;
$arrField['detail_photo'] = $detail_photo;
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
