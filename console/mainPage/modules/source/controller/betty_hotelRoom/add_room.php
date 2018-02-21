<?php
require "../../../../../init.php";
$result = [];
$room_id = uuid_generator();
$branch_id = isset($_POST['branch_id']) ? trim($_POST['branch_id']) : null;
// $branch_name = isset($_POST['branch_name']) ? trim($_POST['branch_name']) : null;
$room_sort = isset($_POST['room_sort']) ? trim($_POST['room_sort']) : null;
$room_name = isset($_POST['room_name']) ? trim($_POST['room_name']) : null;
$room_spec = isset($_POST['room_spec']) ? trim($_POST['room_spec']) : null;
$room_photo=null;
$uploadParam='room_photo';
if (isset($_FILES) && ! empty($_FILES[$uploadParam]['name'])) {
   $extension = strtolower(pathinfo($_FILES[$uploadParam]['name'], PATHINFO_EXTENSION));
    if ($extension != 'png' && $extension != 'jpg') {
        $result = [
            'success' => false,
            'msg' => '圖檔只支援副檔名為PNG和JPG'
        ];
        echo json_encode($result);
        return;
    }

    $source= @ getimagesize($_FILES[$uploadParam]['tmp_name']);
    $w = $source[0]; /*取得圖片的寬 */
    $h = $source[1]; /*取得圖片的高 */
    if ($w !=1080 || $h != 1080) {
       $result = [
            'success' => false,
            'msg' => '圖檔大小要符合1080X1080'
        ];
        echo json_encode($result);
      return;
    }else{
        $filePath = "betty_hotelRoom/{$room_id}";
        $fileName = $room_id.'_photo';
        $uploadFileResult = uploadFile($filePath, $fileName, $uploadParam);
     }
    if ($uploadFileResult['result']==false) {
        $result['success'] = false;
        $result['msg'] = $uploadFileResult['msg'];
        echo json_encode($result);
        return;
    }
    $room_photo = $uploadFileResult['name'];
}else{
    $result = [
        'success' => false,
        'msg' => "圖檔未上傳或上傳失敗"
    ];
    echo json_encode($result);
    return;
}
$user_i18n='tw';
$created_date=date(DB_DATE_FORMAT);
$operator=$sysSession->user_name;

// db execution
$table = 'femobile_hotel_room_betty'; //儲存位置(資料表名稱)
$arrField = []; //自定變數陣列
$arrField['room_id'] = $room_id;
$arrField['branch_id'] = $branch_id;
$arrField['room_sort'] = $room_sort;
$arrField['room_name'] = $room_name;
$arrField['room_spec'] = $room_spec;
$arrField['user_i18n'] = $user_i18n;
$arrField['room_photo'] = $room_photo;
$arrField['created_date'] = $created_date;
$arrField['operator'] = $operator;

//db函數都在db.php


$result['success'] = dbInsert($table, $arrField);
$result['msg'] = $result['success'] ? 'success' : SQL_FAILS;


// output result
echo json_encode($result);