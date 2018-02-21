<?php
require "../../../../../init.php";
$result = [];
$home_id = isset($_POST['home_id']) ? trim($_POST['home_id']) : null;
$home_name = isset($_POST['home_name']) ? trim($_POST['home_name']) : null;
$home_photo = isset($_POST['home_photo']) ? trim($_POST['home_photo']) : null;
$uploadParam= 'home_photo_file';
$home_sort = isset($_POST['home_sort']) ? trim($_POST['home_sort']) : null;
$start_date = isset($_POST['start_date']) ? trim($_POST['start_date']) : date(DB_DATE_FORMAT);
$expire_date = isset($_POST['expire_date']) ? trim($_POST['expire_date']) : null;
$updated_date= date(DB_DATE_FORMAT);
$operator= $sysSession->user_name;


$table = "johnny_femobile_hotel_homepage";


//判斷照片是否與資料庫相同
$sql = "SELECT * FROM {$table} WHERE home_photo = '{$home_photo}';";
$records = dbGetAll($sql);
$total = dbGetTotal($records);

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
        if($image[0] != 1080 || $image[1] != 1920) {
            $result = [
                'success' => false,
                'msg' => '您的圖片尺寸為'.(string)$image[0].'x'.(string)$image[1].'，圖檔尺寸須符合1080x1920'
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

        $arrField = []; //自定變數陣列
        $arrField['home_id'] = $home_id;
        $arrField['home_name'] = $home_name;
        $arrField['home_photo'] = $home_photo;
        $arrField['home_sort'] = $home_sort;
        $arrField['start_date'] = $start_date;
        if($expire_date != null) {
            $arrField['expire_date'] = $expire_date;
        }
        $arrField['updated_date'] = $updated_date;
        $arrField['operator'] = $operator;
        $whereClause = "home_id = '{$home_id}'";

    }else{
        $result = [
            'success' => false,
            'msg' => "圖檔未上傳或上傳失敗"
        ];

        echo json_encode($result);

        return;
    }

} else {

    $arrField = []; //自定變數陣列
    $arrField['home_id'] = $home_id;
    $arrField['home_name'] = $home_name;
    $arrField['home_sort'] = $home_sort;
    $arrField['start_date'] = $start_date;
    if($expire_date != null) {
        $arrField['expire_date'] = $expire_date;
    }
    $arrField['updated_date'] = $updated_date;
    $arrField['operator'] = $operator;
    $whereClause = "home_id = '{$home_id}'";
}


$result['success'] = dbUpdate($table, $arrField, $whereClause);
$result['msg'] = $result['success'] ? 'success' : SQL_FAILS;

echo json_encode($result);