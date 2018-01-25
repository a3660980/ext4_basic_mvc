<?php
require "../../../../../init.php";
$result = [];
$detail_id = isset($_POST['detail_id']) ? trim($_POST['detail_id']) : null;
$branch_id = isset($_POST['branch_id']) ? trim($_POST['branch_id']) : null;
$room_id = isset($_POST['room_id']) ? trim($_POST['room_id']) : null;
$detail_name = isset($_POST['detail_name']) ? trim($_POST['detail_name']) : null;
$detail_photo = isset($_POST['detail_photo']) ? trim($_POST['detail_photo']) : null;
$detail_sort = isset($_POST['detail_sort']) ? trim($_POST['detail_sort']) : null;
$uploadParam='detail_photo_file';
$updated_date= date(DB_DATE_FORMAT);
$operator= $sysSession->user_name;


$table = "johnny_femobile_hotel_detail";


//判斷照片是否與資料庫相同
$sql = "SELECT * FROM {$table} WHERE detail_photo = '{$detail_photo}';";
$records = dbGetAll($sql);
$total = dbGetTotal($records);
$arrField = []; //自定變數陣列
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

        $arrField['detail_photo'] = $detail_photo;

    } else {
        $result = [
            'success' => false,
            'msg' => "圖檔未上傳或上傳失敗",
            'debug'=> $_POST['detail_photo']
        ];

        echo json_encode($result);

        return;
    }

} 

$arrField['detail_id'] = $detail_id;
$arrField['branch_id'] = $branch_id;
$arrField['room_id'] = $room_id;
$arrField['detail_name'] = $detail_name;
$arrField['detail_sort'] = $detail_sort;
$arrField['updated_date'] = $updated_date;
$arrField['operator'] = $operator;


$whereClause = "detail_id = '{$detail_id}'";


$result['success'] = dbUpdate($table, $arrField, $whereClause);
$result['msg'] = $result['success'] ? 'success' : SQL_FAILS;


echo json_encode($result);