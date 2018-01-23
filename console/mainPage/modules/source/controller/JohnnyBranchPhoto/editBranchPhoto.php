<?php
require "../../../../../init.php";
$result = [];
$branch_photo_id = isset($_POST['branch_photo_id']) ? trim($_POST['branch_photo_id']) : null;
$branch_id = isset($_POST['branch_id']) ? trim($_POST['branch_id']) : null;
$photo_name = isset($_POST['photo_name']) ? trim($_POST['photo_name']) : null;
$photo_url = isset($_POST['photo_url']) ? trim($_POST['photo_url']) : null;
$photo_sort = isset($_POST['photo_sort']) ? trim($_POST['photo_sort']) : null;
$uploadParam='photo_url_file';
$updated_date= date(DB_DATE_FORMAT);
$operator= $sysSession->user_name;


$table = "johnny_femobile_hotel_photo";


//判斷照片是否與資料庫相同
$sql = "SELECT * FROM {$table} WHERE photo_url = '{$photo_url}';";
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
        if($image[0] != 1080 && $image[1] != 1920) {
            $result = [
                'success' => false,
                'msg' => '您的圖片尺寸為'.(string)$image[0].'x'.(string)$image[1].'，圖檔尺寸須符合1080x1920'
            ];

            echo json_encode($result);

            return;
         }

        $filePath = "JohnnyHotelHomePage/{$branch_photo_id}";
        $fileName = $branch_photo_id.'_photo';
        $uploadFileResult = uploadFile($filePath, $fileName, $uploadParam);
         
        if ($uploadFileResult['result']==false) {
            $result['success'] = false;
            $result['msg'] = $uploadFileResult['msg'];
            echo json_encode($result);

            return;
        }

        $photo_url = $uploadFileResult['name'];

        $arrField = []; //自定變數陣列
        $arrField['branch_photo_id'] = $branch_photo_id;
        $arrField['branch_id'] = $branch_id;
        $arrField['photo_name'] = $photo_name;
        $arrField['photo_url'] = $photo_url;
        $arrField['photo_sort'] = $photo_sort;
        $arrField['updated_date'] = $updated_date;
        $arrField['operator'] = $operator;

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
    $arrField['branch_photo_id'] = $branch_photo_id;
    $arrField['branch_id'] = $branch_id;
    $arrField['photo_name'] = $photo_name;
    $arrField['photo_sort'] = $photo_sort;
    $arrField['updated_date'] = $updated_date;
    $arrField['operator'] = $operator;
}

$whereClause = "branch_photo_id = '{$branch_photo_id}'";


$result['success'] = dbUpdate($table, $arrField, $whereClause);
$result['msg'] = $result['success'] ? 'success' : SQL_FAILS;

echo json_encode($result);