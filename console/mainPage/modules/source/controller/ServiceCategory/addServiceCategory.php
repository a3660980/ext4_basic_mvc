<?php
require "../../../../../init.php";

// debug
// $sysConnDebug = true;

// result defination
$result = [];

$current_date = date(DB_DATE_FORMAT);
$corp_id = $sysSession->corp_id;
$operator = $sysSession->user_name;
$category_id = uuid_generator();

$service_id = isset($_POST['service_id']) ? trim($_POST['service_id']) : null;  //isset:true回傳遞一個，不是的話，回傳空值

$category_code = isset($_POST['category_code']) ? trim($_POST['category_code']) : null;
$category_name = isset($_POST['category_name']) ? trim($_POST['category_name']) : null;
$category_introduction = isset($_POST['category_introduction']) ? trim($_POST['category_introduction']) : null;
$category_sort = isset($_POST['category_sort']) ? trim($_POST['category_sort']) : 10;
$category_urls = isset($_POST['category_url']) ? trim($_POST['category_url']) : null;
$category_identity = isset($_POST['category_identity']) ? trim($_POST['category_identity']) : null;

$category_icon = null;

$uploadParam = 'category_icon';

if (isset($_FILES) && ! empty($_FILES[$uploadParam]['name'])) {
   $extension = strtolower(pathinfo($_FILES[$uploadParam]['name'], PATHINFO_EXTENSION));
    // strtolower:將字符串小寫pathinfo:返回有關文件路徑的信息
    //check picture .png/.jpg
    if ($extension != 'png' && $extension != 'jpg') {
        $result = [
            'success' => false,
            'msg' => '圖檔只支援副檔名為PNG和JPG'
        ];

        echo json_encode($result);

        return;
    }

    $filePath = "ServiceCategory/{$category_id}";
    $fileName = $category_code;
    $uploadFileResult = uploadFile($filePath, $fileName, $uploadParam);

    if (! $uploadFileResult) {
        $result['success'] = false;
        $result['msg'] = $uploadFileResult['msg'];
        echo json_encode($result);

        return;
    }

    $category_icon = $uploadFileResult['name'];

}else{
    $result = [
        'success' => false,
        'msg' => "圖檔未上傳或上傳失敗"
    ];

    echo json_encode($result);

    return;
}

$category_url = [];
$category_url['category_url'] = $category_urls;

dbBegin();

// db execution
$table = CPS_TABLE_SERVICE_CATEGORY;

$arrField = [];
$arrField['service_id'] = $service_id;
$arrField['category_id'] = $category_id;
$arrField['category_code'] = $category_code;
$arrField['category_name'] = $category_name;
$arrField['category_introduction'] = $category_introduction;
$arrField['category_icon'] = $category_icon;
$arrField['category_sort'] = $category_sort;
$arrField['category_url'] = json_encode($category_url);
$arrField['category_security'] = 0;
$arrField['category_identity'] = $category_identity;
$arrField['created_date'] = $current_date;
$arrField['operator'] = $operator;

$result['success'] = dbInsert($table, $arrField);
$result['msg'] = $result['success'] ? 'success' : 'fails';

// data sync
$dataSyncTable = CPS_TABLE_DATA_SYNC;
$dataSyncArr = [];

$dataSyncArr['table_name'] = $table;
$dataSyncArr['pk_name'] = json_encode(['category_id' => $category_id]);
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

dbBegin();

//update category updated_date
$table2=CPS_SERVICE_INFO;
$whereClause2 = "service_id = '{$service_id}'";

$arrField2 = [];

$arrField2['updated_date'] = $current_date;
$arrField2['operator'] = $operator;

$result['success'] = dbUpdate($table2, $arrField2, $whereClause2);
$result['msg'] = $result['success'] ? 'success' : 'fails';

// data sync
$dataSyncArr2 = [];

$dataSyncArr2['table_name'] = $table2;
$dataSyncArr2['pk_name'] = json_encode(['service_id' => $service_id]);
$dataSyncArr2['data_id'] = $corp_id;
$dataSyncArr2['command'] = 'U';
$dataSyncArr2['effective_time'] = null;
$dataSyncArr2['updated_time'] = $current_date;

if ($result['success']){
    dbCommit();
    dbInsert($dataSyncTable, $dataSyncArr2);
}else{
    dbRollback();
}

// output result
echo json_encode($result);
