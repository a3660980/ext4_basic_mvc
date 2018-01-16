<?php
require "../../../../../init.php";

// debug
// $sysConnDebug = true;

// result defination
$result = [];

$current_date = date(DB_DATE_FORMAT);
$corp_id = $sysSession->corp_id;
$operator = $sysSession->user_name;

$service_id = uuid_generator();
$service_code = isset($_POST['service_code']) ? trim($_POST['service_code']) : null;
$service_name = isset($_POST['service_name']) ? trim($_POST['service_name']) : null;
$service_introduction = isset($_POST['service_introduction']) ? trim($_POST['service_introduction']) : null;
$service_sort = isset($_POST['service_sort']) ? trim($_POST['service_sort']) : 10;
$service_urls = isset($_POST['service_url']) ? trim($_POST['service_url']) : null;
$service_identity = isset($_POST['service_identity']) ? trim($_POST['service_identity']) : null;

$service_icon = null;

$uploadParam = 'service_icon';

if (isset($_FILES) && ! empty($_FILES[$uploadParam]['name'])) {
   $extension = strtolower(pathinfo($_FILES[$uploadParam]['name'], PATHINFO_EXTENSION));

    //check picture .png/.jpg
    if ($extension != 'png' && $extension != 'jpg') {
        $result = [
            'success' => false,
            'msg' => '圖檔只支援副檔名為PNG和JPG'
        ];

        echo json_encode($result);

        return;
    }

    $filePath = "ServiceInfo/{$service_id}";
    $fileName = $service_code;
    $uploadFileResult = uploadFile($filePath, $fileName, $uploadParam);

    if (! $uploadFileResult) {
        $result['success'] = false;
        $result['msg'] = $uploadFileResult['msg'];
        echo json_encode($result);

        return;
    }

    $service_icon = $uploadFileResult['name'];

}else{
    $result = [
        'success' => false,
        'msg' => "圖檔未上傳或上傳失敗"
    ];

    echo json_encode($result);

    return;
}

$service_url = [];
$service_url['service_url'] = $service_urls;

dbBegin();

// db execution
$table = CPS_TABLE_SERVICE_INFO;
$arrField = [];

$arrField['service_id'] = $service_id;
$arrField['service_code'] = $service_code;
$arrField['service_name'] = $service_name;
$arrField['service_introduction'] = $service_introduction;
$arrField['service_icon'] = $service_icon;
$arrField['service_sort'] = $service_sort;
$arrField['service_url'] = json_encode($service_url);
$arrField['service_security'] = 0;
$arrField['service_identity'] = $service_identity;
$arrField['created_date'] = $current_date;
$arrField['operator'] = $operator;

$result['success'] = dbInsert($table, $arrField);
$result['msg'] = $result['success'] ? 'success' : 'fails';

// data sync
$dataSyncTable = CPS_TABLE_DATA_SYNC;
$dataSyncArr = [];

$dataSyncArr['table_name'] = $table;
$dataSyncArr['pk_name'] = json_encode(['service_id' => $service_id]);
$dataSyncArr['data_id'] = $corp_id;
$dataSyncArr['command'] = 'I';
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
