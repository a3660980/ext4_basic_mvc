<?php
require "../../../../../init.php";

$result = [];
// ini_set('display_errors', 1);
$current_date = date(DB_DATE_FORMAT);
$operator = $sysSession->user_name;

$home_id = isset($_POST['home_id']) ? trim($_POST['home_id']) : null;
$home_sort = isset($_POST['home_sort']) ? trim($_POST['home_sort']) : null;
$home_name = isset($_POST['home_name']) ? trim($_POST['home_name']) : null;
$user_i18n = isset($_POST['user_i18n']) ? trim($_POST['user_i18n']) : null;
$start_date = isset($_POST['start_date']) ? trim($_POST['start_date']) : null;
$expire_date = isset($_POST['expire_date']) ? trim($_POST['expire_date']) : null;

if( ($start_date !='') && ($expire_date !='') && ($start_date >= $expire_date) ){
    $result = [
        'success' => false,
        'msg' => '生效日不可大於或等於截止日。'
    ];
    echo json_encode($result);
    return;
}

$home_photo = '';
$fileName = "{$home_id}"."_photo";
$uploadParam = 'home_photo';
$table = 'femobile_hotel_homepage';
$whereClause = "home_id = '{$home_id}'";
if (isset($_FILES)) {

    $sql = "SELECT * FROM {$table} WHERE {$whereClause}";
    $records = dbGetAll($sql);

    //select data check
    if(count($records) == 0){
        return;
    }

    //db data change php array
    foreach ($records as $key => $row) {
        if($row['home_photo'] != null)
            $home_photo = $row['home_photo'];
    }

    $filePath = "HotelHomepage/images";
    if(! empty($_FILES[$uploadParam]['name'])){
        $img_check = strtolower(pathinfo($_FILES[$uploadParam]['name'], PATHINFO_EXTENSION));

        //check file type is picture
        if (!$img_check) {
            $result = [
                'success' => false,
                'msg' => '檔案為非圖片格式類型'
            ];

            echo json_encode($result);

            return;
        }
        $imginfo = getimagesize($_FILES[$uploadParam]['tmp_name']);

        if($imginfo[0]!=1080&&$imginfo[1]!=1920){
            $result = [
                'success' => false,
                'msg' => '照片尺寸只能為1080X1920px，請確認！'
            ];
            echo json_encode($result);
            return;
        }
        $uploadFileResult = uploadFile($filePath, $fileName, $uploadParam);

        if (! $uploadFileResult) {
            $result['success'] = false;
            $result['msg'] = $uploadFileResult['msg'];
            echo json_encode($result);

            return;
        }

        $home_photo = $uploadFileResult['name'];
    }

}

if ($expire_date == '') $expire_date = null;
dbBegin();
$result['success'] = false;
//不管如何都更新GAS BRAND
$table = 'femobile_hotel_homepage';
$whereClause = "home_id = '{$home_id}'";
$arrField = [];
$arrField['home_sort'] = $home_sort;
$arrField['home_name'] = $home_name;
$arrField['home_photo'] = $home_photo;
$arrField['user_i18n'] = $user_i18n;
$arrField['start_date'] = $start_date;
$arrField['expire_date'] = $expire_date;
$arrField['updated_date'] = $current_date;
$arrField['operator'] = $operator;
$result['success'] = dbUpdate($table, $arrField, $whereClause);
$result['msg'] = $result['success'] ? 'success' : SQL_FAILS;

if ($result['success']){
    dbCommit();
}
else{
    dbRollback();
}
echo json_encode($result);