<?php
require "../../../../../init.php";

$result = [];

$room_id = isset($_POST['room_id']) ? trim($_POST['room_id']) : null;
$room_name = isset($_POST['room_name']) ? trim($_POST['room_name']) : null;
$room_spec = isset($_POST['room_spec']) ? trim($_POST['room_spec']) : null;
$room_photo = isset($_POST['room_photo']) ? trim($_POST['room_photo']) : null;
$uploadParam='room_photo_file';
$room_sort = isset($_POST['room_sort']) ? trim($_POST['room_sort']) : null;
$updated_date= date(DB_DATE_FORMAT);
$operator= $sysSession->user_name;



$table = "johnny_femobile_hotel_room";


//判斷照片是否與資料庫相同
$sql = "SELECT * FROM {$table} WHERE room_photo = '{$room_photo}';";
$records = dbGetAll($sql);
$total = dbGetTotal($records);
// $arrField = []; //自定變數陣列

if($total == 0) {
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
        $arrField['room_photo'] = $room_photo;
        

    } 
}

$arrField['room_id'] = $room_id;
$arrField['room_name'] = $room_name;
$arrField['room_spec'] = $room_spec;
$arrField['room_sort'] = $room_sort;
$arrField['updated_date'] = $updated_date;
$arrField['operator'] = $operator;

$whereClause = "room_id = '{$room_id}'";
$result['success'] = dbUpdate($table, $arrField, $whereClause);

$result['msg'] = $result['success'] ? 'success' : SQL_FAILS;
$result['test'] = $total;
echo json_encode($result);