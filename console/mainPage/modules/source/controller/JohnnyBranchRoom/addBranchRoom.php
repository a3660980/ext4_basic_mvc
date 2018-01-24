<?php
require "../../../../../init.php";

$result = [];
$room_id = uuid_generator();
$branch_id = isset($_POST['branch_id']) ? trim($_POST['branch_id']) : null;
$room_name = isset($_POST['room_name']) ? trim($_POST['room_name']) : null;
$room_spec = isset($_POST['room_spec']) ? trim($_POST['room_spec']) : null;
$room_photo = null;
$uploadParam='room_photo';
$room_sort = isset($_POST['room_sort']) ? trim($_POST['room_sort']) : null;
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

    $filePath = "JohnnyHotelHomePage/{$room_id}";
    $fileName = $room_id.'_photo';
    $uploadFileResult = uploadFile($filePath, $fileName, $uploadParam);
     
    if ($uploadFileResult['result']==false) {
        $result['success'] = false;
        $result['msg'] = $uploadFileResult['msg'];
        echo json_encode($result);

        return;
    }

    $room_photo = $uploadFileResult['name'];

}



$table = "johnny_femobile_hotel_room";

$arrField = []; //自定變數陣列
$arrField['room_id'] = $room_id;
$arrField['branch_id'] = $branch_id;
$arrField['room_name'] = $room_name;
$arrField['room_spec'] = $room_spec;
$arrField['room_photo'] = $room_photo;
$arrField['room_sort'] = $room_sort;
$arrField['created_date'] = $created_date;
$arrField['operator'] = $operator;


$result['success'] = dbInsert($table, $arrField);
$result['msg'] = $result['success'] ? 'success' : SQL_FAILS;
$result['debug'] = $arrField['room_sort'];

echo json_encode($result);