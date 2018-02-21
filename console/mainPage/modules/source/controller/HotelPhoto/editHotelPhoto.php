<?php
require "../../../../../init.php";

$result = [];
// ini_set('display_errors', 1);
$current_date = date(DB_DATE_FORMAT);
$operator = $sysSession->user_name;

$branch_photo_id = isset($_POST['branch_photo_id']) ? trim($_POST['branch_photo_id']) : null;
$photo_sort = isset($_POST['photo_sort']) ? trim($_POST['photo_sort']) : null;

$photo_url = '';
$fileName = "{$branch_photo_id}"."_photo";
$uploadParam = 'photo_url';
$table = 'femobile_hotel_photo';
$whereClause = "branch_photo_id = '{$branch_photo_id}'";
if (isset($_FILES)) {

    $sql = "SELECT * FROM {$table} WHERE {$whereClause}";
    $records = dbGetAll($sql);

    //select data check
    if(count($records) == 0){
        return;
    }

    //db data change php array
    foreach ($records as $key => $row) {
        if($row['photo_url'] != null)
            $photo_url = $row['photo_url'];
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

        if($imginfo[0]!=1080||$imginfo[1]!=1920){
            $result = [
                'success' => false,
                'msg' => '照片尺寸只能為1080X1920px，請確認！'
            ];
            echo json_encode($result);
            return;
        }
        $uploadFileResult = uploadFile($filePath, $fileName, $uploadParam);

        if ($uploadFileResult['result'] === false) {
            $result['success'] = false;
            $result['msg'] = $uploadFileResult['msg'];
            echo json_encode($result);

            return;
        }

        $photo_url = $uploadFileResult['name'];
    }

}

dbBegin();
$result['success'] = false;
//不管如何都更新GAS BRAND
$table = 'femobile_hotel_photo';
$whereClause = "branch_photo_id = '{$branch_photo_id}'";
$arrField = [];
$arrField['photo_sort'] = $photo_sort;
$arrField['photo_url'] = $photo_url;
$arrField['updated_date'] = $current_date;
$arrField['operator'] = $operator;
$result['success'] = dbUpdate($table, $arrField, $whereClause);
$result['msg'] = $result['success'] ? 'success' : 'Update失敗';

if ($result['success']){
    dbCommit();
}
else{
    dbRollback();
}
echo json_encode($result);