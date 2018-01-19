<?php
require "../../../../../init.php";//連結init.php
$result = [];
$sql = [];
$table = 'joinme_gas_brand';
$table_detail='joinme_brand_log';
$deletefalse=true;
$dbResult=true;
if (! isset($_POST['data']) || empty($_POST['data'])) {
    $result['success'] = false;
	$result['msg'] = 'No post data';
	echo json_encode($result);

	exit();
}

$data = json_decode($_POST['data']);//把data變成物件，然後可以使用
$current_date = date(DB_DATE_FORMAT);//取日期

// object ot array
$data = is_array($data) ? $data : [$data];//判斷是否為陣列
foreach($data as $key => $row) {
    $brand_id = $row->brand_id; 
    $sql = "SELECT * FROM {$table_detail} WHERE {$table_detail}.brand_id='{$brand_id}'";
    $records = dbGetAll($sql);
    if(count($records) >0){
        $dbResult=false;
        $deletefalse=false;
        break;
     }
}
if($deletefalse==false){
    $result['success'] = $dbResult; 
    $result['msg'] = 'DeteleFails'; 
}else{
     dbBegin();
     $dbResult = true;
     foreach ($data as $key => $row) {
    $brand_id = $row->brand_id; 
    $whereClause='1=1';
    $sql = "SELECT * FROM {$table} WHERE {$whereClause}";
    if(! dbDelete($table, $whereClause)) {
        $dbResult = false;
        break;
    }else{
        $result['success'] = $dbResult; 
        $result['msg'] = $result['success'] ? 'success' : 'fails';     
    }  
     }
     

    }   
if($result['success']){
    dbCommit();

}else{
    dbRollback();
}

echo json_decode($result);






             








