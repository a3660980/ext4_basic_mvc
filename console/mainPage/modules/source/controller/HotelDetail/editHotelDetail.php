<?php
require "../../../../../init.php";

$result = [];
// ini_set('display_errors', 1);
$current_date = date(DB_DATE_FORMAT);
$operator = $sysSession->user_name;

$detail_id = isset($_POST['detail_id']) ? trim($_POST['detail_id']) : null;
$detail_sort = isset($_POST['detail_sort']) ? trim($_POST['detail_sort']) : null;
$detail_name = isset($_POST['detail_name']) ? trim($_POST['detail_name']) : null;
$user_i18n = isset($_POST['user_i18n']) ? trim($_POST['user_i18n']) : null;

$detail_photo = '';
$fileName = "{$detail_id}"."_photo";
$uploadParam = 'detail_photo';
$table = 'femobile_hotel_detail';
$whereClause = "detail_id = '{$detail_id}'";
if (isset($_FILES)) {

    $sql = "SELECT * FROM {$table} WHERE {$whereClause}";
    $records = dbGetAll($sql);

    //select data check
    if(count($records) == 0){
        return;
    }

    //db data change php array
    foreach ($records as $key => $row) {
        if($row['detail_photo'] != null)
            $detail_photo = $row['detail_photo'];
    }

    $filePath = "HotelPhoto/images";
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

        if($imginfo[0]!=1080&&$imginfo[1]!=1080){
            $result = [
                'success' => false,
                'msg' => '照片尺寸只能為1080X1080px，請確認！'
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

        $detail_photo = $uploadFileResult['name'];
    }

}

dbBegin();
$result['success'] = false;
//不管如何都更新GAS BRAND
$table = 'femobile_hotel_detail';
$whereClause = "detail_id = '{$detail_id}'";
$arrField = [];
$arrField['detail_sort'] = $detail_sort;
$arrField['detail_name'] = $detail_name;
$arrField['detail_photo'] = $detail_photo;
$arrField['user_i18n'] = $user_i18n;
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