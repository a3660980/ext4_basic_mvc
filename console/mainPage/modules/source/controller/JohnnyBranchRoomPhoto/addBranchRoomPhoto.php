<?php
require "../../../../../init.php";
$result = [];
$detail_id = uuid_generator();
$branch_id = isset($_POST['branch_id']) ? trim($_POST['branch_id']) : null;
$room_id = isset($_POST['room_id']) ? trim($_POST['room_id']) : null;
$detail_name = isset($_POST['detail_name']) ? trim($_POST['detail_name']) : null;
$detail_photo = null;
$uploadParam='detail_photo';
$detail_sort = isset($_POST['detail_sort']) ? trim($_POST['detail_sort']) : null;
$created_date= date(DB_DATE_FORMAT);
$operator= $sysSession->user_name;




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

    $image = getimagesize($_FILES[$uploadParam]['tmp_name']);
    if($image[0] != 1080 && $image[1] != 1080) {
        $result = [
            'success' => false,
            'msg' => '您的圖片尺寸為'.(string)$image[0].'x'.(string)$image[1].'，圖檔尺寸須符合1080x1080'
        ];

        echo json_encode($result);

        return;
     }

    $filePath = "JohnnyHotelHomePage/{$detail_id}";
    $fileName = $detail_id.'_photo';
    $uploadFileResult = uploadFile($filePath, $fileName, $uploadParam);
     
    if ($uploadFileResult['result']==false) {
        $result['success'] = false;
        $result['msg'] = $uploadFileResult['msg'];
        echo json_encode($result);

        return;
    }

    $detail_photo = $uploadFileResult['name'];

} else {
    $result = [
        'success' => false,
        'msg' => "圖檔未上傳或上傳失敗"
    ];

    echo json_encode($result);

    return;
}

$table = "johnny_femobile_hotel_detail";

$arrField = [];
$arrField['detail_id'] = $detail_id;
$arrField['branch_id'] = $branch_id;
$arrField['room_id'] = $room_id;
$arrField['detail_name'] = $detail_name;
$arrField['detail_photo'] = $detail_photo;
$arrField['detail_sort'] = $detail_sort;
$arrField['created_date'] = $created_date;
$arrField['operator'] = $operator;


$result['success'] = dbInsert($table, $arrField);
$result['msg'] = $result['success'] ? 'success' : SQL_FAILS;
$result['debug'] = $room_id;
echo json_encode($result);
closeConn();