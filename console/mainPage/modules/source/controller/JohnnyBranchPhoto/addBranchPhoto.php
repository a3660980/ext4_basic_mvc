<?php
require "../../../../../init.php";
$result = [];
$branch_photo_id = uuid_generator();
$branch_id = isset($_POST['branch_id']) ? trim($_POST['branch_id']) : null;
$photo_name = isset($_POST['photo_name']) ? trim($_POST['photo_name']) : null;
$photo_url = null;
$uploadParam='photo_url';
$photo_sort = isset($_POST['photo_sort']) ? trim($_POST['photo_sort']) : null;
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

}else{
    $result = [
        'success' => false,
        'msg' => "圖檔未上傳或上傳失敗"
    ];

    echo json_encode($result);

    return;
}

$table = "johnny_femobile_hotel_photo";

$arrField = [];
$arrField['branch_photo_id'] = $branch_photo_id;
$arrField['branch_id'] = $branch_id;
$arrField['photo_name'] = $photo_name;
$arrField['photo_url'] = $photo_url;
$arrField['photo_sort'] = $photo_sort;
$arrField['created_date'] = $created_date;
$arrField['operator'] = $operator;


$result['success'] = dbInsert($table, $arrField);
$result['msg'] = $result['success'] ? 'success' : SQL_FAILS;
echo json_encode($result);
closeConn();