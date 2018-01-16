<?php
require "../../../../../init.php";

// debug
// $sysConnDebug = true; 
//找錯誤用

// result defination
$result = [];

$current_date = date(DB_DATE_FORMAT);
$corp_id = $sysSession->corp_id;
$operator = $sysSession->user_name;
// post variable
$service_id = isset($_POST['service_id']) ? trim($_POST['service_id']) : null;
$service_code = isset($_POST['service_code']) ? trim($_POST['service_code']) : null;
$service_name = isset($_POST['service_name']) ? trim($_POST['service_name']) : null;
$service_introduction = isset($_POST['service_introduction']) ? trim($_POST['service_introduction']) : null;
$service_sort = isset($_POST['service_sort']) ? trim($_POST['service_sort']) : 10;
$service_urls = isset($_POST['service_url']) ? trim($_POST['service_url']) : null;
$service_identity = isset($_POST['service_identity']) ? trim($_POST['service_identity']) : null;
$service_icon = null;


$uploadParam = 'service_icon';

dbBegin();

$table = CPS_TABLE_SERVICE_INFO;

$whereClause = "service_id = '{$service_id}'";

    $sql = "SELECT * FROM {$table} WHERE {$whereClause}";
    $records = dbGetAll($sql);

    //select data check
    if(count($records) == 0){
        return;
    }

if (isset($_FILES)) {

    $sql = "SELECT * FROM {$table} WHERE {$whereClause}";
    $records = dbGetAll($sql);

    //select data check
    if(count($records) == 0){
        return;
    }

    //db data change php array
    foreach ($records as $key => $row) {
        if($row['service_icon'] != null)
            $service_icon = $row['service_icon'];
    }

    $filePath = "ServiceInfo/{$service_id}";
    $fileName = $service_code;

    if(! empty($_FILES[$uploadParam]['name'])){
        $img_check = getimagesize($_FILES[$uploadParam]['tmp_name']);

        //check file type is picture
        if (!$img_check) {
            $result = [
                'success' => false,
                'msg' => '檔案為非圖片格式類型'
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

        $service_icon = $uploadFileResult['name'];
    }

}

$service_url = [];
$service_url['service_url'] = $service_urls;
// $url = json_decode($service_urls);

// db execution
$arrField = [];

$arrField['service_id'] = $service_id;
$arrField['service_code'] = $service_code;
$arrField['service_name'] = $service_name;
$arrField['service_introduction'] = $service_introduction;
// $arrField['service_icon'] = $service_icon;
$arrField['service_sort'] = $service_sort;
// $arrField['service_url'] = json_encode($url);
$arrField['service_url'] = json_encode($service_url);
$arrField['service_security'] = 0;
$arrField['service_identity'] = $service_identity;
$arrField['updated_date'] = $current_date;
// $arrField['operator'] = $operator;

$result['success'] = dbUpdate($table, $arrField, $whereClause);
$result['msg'] = $result['success'] ? 'success' : 'fails';

// data sync
$dataSyncTable = CPS_TABLE_DATA_SYNC;
$dataSyncArr = [];

$dataSyncArr['table_name'] = $table;
$dataSyncArr['pk_name'] = json_encode(['service_id' => $service_id]);
$dataSyncArr['data_id'] = $corp_id;
$dataSyncArr['command'] = 'U';
$dataSyncArr['effective_time'] = null;
$dataSyncArr['updated_time'] = $current_date;

if ($result['success']){
    dbCommit();
    dbInsert($dataSyncTable, $dataSyncArr);
}else{
    dbRollback();
}

// output result
echo json_encode($result);