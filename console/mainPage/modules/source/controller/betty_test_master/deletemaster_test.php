<?php
require "../../../../../init.php";//連結init.php

// $sysConnDebug = true;

// result defination
$result = [];
$sql = [];

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

// db execution
$table = 'joinme_gas_brand';
$table_detail='joinme_brand_log';
dbBegin();//開始一個事務 關閉自動提交 $sysConn->beginTransaction(); 
$dbResult = true;

foreach($data as $key => $row) {//$data 寫入的值
    // var_dump($row);
    $brand_id = $row->brand_id;//選取的brand_id
    $whereClause = "{$table}.brand_id = '{$brand_id}'";        
    // 刪除所有訊息
    $sql = "SELECT * FROM {$table_detail} WHERE {$table_detail}.brand_id='{$brand_id}'";//找出detail中的資料
    $records = dbGetAll($sql);//dbgetall 回傳資料使用陣列格式
    //判斷detail中是否有資料，有:不能刪除；沒有:可以刪除
    if(count($records) == 0){
        if (! dbDelete($table, $whereClause)) {
        //dbDelete->做刪除的動作
        //斷線或其他因素刪除db失敗時
                $dbResult = false;
                break;
        }else{
                $result['success'] = $dbResult; 
                $result['msg'] = $result['success'] ? 'success' : 'fails'; 
                dbCommit();//提交更新
                echo json_encode($result); //回傳成功訊息    

            }
    }else{
            $result['success'] = false; 
            $result['msg'] = $result['success'] ? 'success' : 'fails'; 
            dbRollback();//回到一開始
            echo json_encode($result);  //回傳錯誤訊息
    }  

}



