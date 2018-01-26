<?php
require "../../../../../init.php";
$result = [];
$home_id = uuid_generator();
$home_sort = isset($_POST['home_sort']) ? trim($_POST['home_sort']) : null;
$home_name = isset($_POST['home_name']) ? trim($_POST['home_name']) : null;
$home_photo=null;
$uploadParam='home_photo';
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
    if ($w !=1080 && $h != 1920) {
       $result = [
            'success' => false,
            'msg' => '圖檔大小要符合1080X1920'
        ];
        echo json_encode($result);
      return;
    }else{
        $filePath = "betty_hotel/{$home_id}";
        $fileName = $home_id.'_photo';
        $uploadFileResult = uploadFile($filePath, $fileName, $uploadParam);
     }
    if ($uploadFileResult['result']==false) {
        $result['success'] = false;
        $result['msg'] = $uploadFileResult['msg'];
        echo json_encode($result);
        return;
    }
    $home_photo = $uploadFileResult['name'];
}else{
    $result = [
        'success' => false,
        'msg' => "圖檔未上傳或上傳失敗"
    ];
    echo json_encode($result);
    return;
}
$user_i18n='tw';
$start_date = !empty($_POST['start_date']) ? trim($_POST['start_date']) : date(DB_DATE_FORMAT);
$expire_date = !empty($_POST['expire_date']) ? trim($_POST['expire_date']) : null;
//  if($expire_date==null){
//     $expire_date='永久有效';
// }
$created_date=date(DB_DATE_FORMAT);
$operator=$sysSession->user_name;

// db execution
$table = 'femobile_hotel_homepage_betty'; //儲存位置(資料表名稱)
$arrField = []; //自定變數陣列
$arrField['home_id'] = $home_id;
$arrField['home_sort'] = $home_sort;
$arrField['home_name'] = $home_name;
$arrField['home_photo'] = $home_photo;
$arrField['user_i18n'] = $user_i18n;
$arrField['start_date'] = $start_date;
$arrField['expire_date'] = $expire_date;
$arrField['created_date'] = $created_date;
$arrField['operator'] = $operator;

//db函數都在db.php


$result['success'] = dbInsert($table, $arrField);
$result['msg'] = $result['success'] ? 'success' : SQL_FAILS;


// output result
echo json_encode($result);