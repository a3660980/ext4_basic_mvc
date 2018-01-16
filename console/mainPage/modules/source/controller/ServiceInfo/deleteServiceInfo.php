<?php
require "../../../../../init.php";

// $sysConnDebug = true;

$result = [];

if (! isset($_POST['data']) || empty($_POST['data'])) {
    $result['success'] = false;
    $result['msg'] = '沒有資料.';
    echo json_encode($result);

    exit();
}

$data = json_decode($_POST['data']);

$current_date = date(DB_DATE_FORMAT);

// object ot array
$data = is_array($data) ? $data : [$data];

$corp_id = $sysSession->corp_id;

dbBegin();
$table = CPS_TABLE_SERVICE_INFO;

$dbResult = true;

foreach($data as $key => $row) {
    $service_id = $row->service_id;
    $whereClause = "{$table}.service_id = '{$service_id}'";

    $sql = "SELECT * FROM {$table} WHERE {$whereClause}";
    $records = dbGetAll($sql);

    //select data check
    if(count($records) == 0){
        return;
    }

    //db data change php array
    foreach ($records as $key => $row) {
        if($row['service_icon'] != null)
            $service_icon[$key] = $row['service_icon'];

    }

    if (! dbDelete($table, $whereClause)) {
        $dbResult = false;
        break;
    }

    // foreach ($service_icon as $key => $row) {
    //     //delete picture
    //     unlink($row);
    //     rmdir("/joinme/ServiceInfo/{$service_id}");
    // }

    $path = "/joinme/ServiceInfo/{$service_id}";
    if(is_dir($path)){
        RemoveDirectory($path);
    }

    // data sync
    $dataSyncTable = CPS_TABLE_DATA_SYNC;
    $dataSyncArr = [];

    $dataSyncArr['table_name'] = $table;
    $dataSyncArr['pk_name'] = json_encode(['service_id' => $service_id]);
    $dataSyncArr['data_id'] = $corp_id;
    $dataSyncArr['command'] = 'D';
    $dataSyncArr['effective_time'] = null;
    $dataSyncArr['updated_time'] = $current_date;

    if (! dbInsert($dataSyncTable, $dataSyncArr)) {
        $dbResult = false;
        break;
    }   
}

$result['success'] = $dbResult;
$result['msg'] = $result['success'] ? 'success' : 'fails';

if ($result['success']){
    dbCommit();  
}else{
    dbRollback();
}

// output result
echo json_encode($result);

function RemoveDirectory($directory){

    foreach(glob("{$directory}/*") as $file)
    {
        // var_dump($file);
        if(is_dir($file)) { 
            RemoveDirectory($file);
        } else {
            unlink($file);
        }
    }
    rmdir($directory);
}