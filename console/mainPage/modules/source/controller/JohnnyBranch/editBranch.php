<?php
require "../../../../../init.php";
$result = [];
$branch_id = isset($_POST['branch_id']) ? trim($_POST['branch_id']) : null;
$branch_name = isset($_POST['branch_name']) ? trim($_POST['branch_name']) : null;
$branch_photo = isset($_POST['branch_photo']) ? trim($_POST['branch_photo']) : null;
$uploadParam= 'branch_photo_file';
$branch_sort = isset($_POST['branch_sort']) ? trim($_POST['branch_sort']) : null;
$updated_date= date(DB_DATE_FORMAT);
$operator= $sysSession->user_name;


$table = "johnny_femobile_hotel_branch";


//判斷照片是否與資料庫相同
$sql = "SELECT * FROM {$table} WHERE branch_photo = '{$branch_photo}';";
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

        $filePath = "JohnnyHotelHomePage/{$branch_id}";
        $fileName = $branch_id.'_photo';
        $uploadFileResult = uploadFile($filePath, $fileName, $uploadParam);
         
        if ($uploadFileResult['result']==false) {
            $result['success'] = false;
            $result['msg'] = $uploadFileResult['msg'];
            echo json_encode($result);

            return;
        }

        $branch_photo = $uploadFileResult['name'];

        $arrField = []; //自定變數陣列
        $arrField['branch_id'] = $branch_id;
        $arrField['branch_name'] = $branch_name;
        $arrField['branch_photo'] = $branch_photo;
        $arrField['branch_sort'] = $branch_sort;
        $arrField['updated_date'] = $updated_date;
        $arrField['operator'] = $operator;

    } else {
        $arrField = []; //自定變數陣列
        $arrField['branch_id'] = $branch_id;
        $arrField['branch_name'] = $branch_name;
        $arrField['branch_sort'] = $branch_sort;
        $arrField['updated_date'] = $updated_date;
        $arrField['operator'] = $operator;
    }

} else {

    $arrField = []; //自定變數陣列
    $arrField['branch_id'] = $branch_id;
    $arrField['branch_name'] = $branch_name;
    $arrField['branch_sort'] = $branch_sort;
    $arrField['updated_date'] = $updated_date;
    $arrField['operator'] = $operator;
}

$whereClause = "branch_id = '{$branch_id}'";
$result['success'] = dbUpdate($table, $arrField, $whereClause);
$result['test'] = $arrField['branch_id'];
$result['msg'] = $result['success'] ? 'success' : SQL_FAILS;

echo json_encode($result);