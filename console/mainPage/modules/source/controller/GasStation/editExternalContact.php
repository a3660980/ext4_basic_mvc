<?php
require "../../../../../init.php";

 // $sysConnDebug = true;

// result defination
$result = [];
$sql = [];

$station_id = isset($_POST['station_id']) ? trim($_POST['station_id']) : null;
$brand_id = isset($_POST['brand_id']) ? trim($_POST['brand_id']) : null;
$station_code = isset($_POST['station_code']) ? trim($_POST['station_code']) : null;
$station_name= isset($_POST['station_name']) ? trim($_POST['station_name']) : null;
$address_city = isset($_POST['address_city']) ? trim($_POST['address_city']) : null;
$address_county = isset($_POST['address_county']) ? trim($_POST['address_county']) : null;
$address = isset($_POST['address']) ? trim($_POST['address']) : null;
$station_address = isset($_POST['address']) ? trim($_POST['address']) : null;
$station_address = $address_city.$address_county.$station_address;

$url = 'https://maps.googleapis.com/maps/api/geocode/json?sensor=false&address='
        .urlencode($station_address);
$data = json_decode(file_get_contents($url));
// for($i=0;$i>=3;$i++){
// 	$data = json_decode(file_get_contents($url));
// 	if ($data->status != 'OK') {
// 		$data = json_decode(file_get_contents($url));
//  	}else if ($data->status == 'OK'){
//  		break;
//  	}
// }
if ($data->status != 'OK') {
    $result['success'] = false;
    $result['msg'] = '請輸入正確地址';

    echo json_encode($result);
    exit();
}
$geo = file_get_contents($url);
$geo = json_decode($geo,true);
$gps_latitude = $geo['results'][0]['geometry']['location']['lat'];
$gps_longitude = $geo['results'][0]['geometry']['location']['lng'];
$service_time = isset($_POST['service_time']) ? trim($_POST['service_time']) : null;
$service_type = isset($_POST['service']) ? trim($_POST['service']) : null;
$gas_type = isset($_POST['gas']) ? trim($_POST['gas']) : null;
$phone = isset($_POST['phone']) ? trim($_POST['phone']) : null;
$priority = isset($_POST['priority']) ? trim($_POST['priority']) : null;
$start_date = isset($_POST['start_date']) ? trim($_POST['start_date']) : null;
$expire_date = isset($_POST['expire_date']) ? trim($_POST['expire_date']) : null;
$hand_gasoline_offer = isset($_POST['hand_gasoline_offer']) ? trim($_POST['hand_gasoline_offer']) : null;
$self_gasoline_offer = isset($_POST['self_gasoline_offer']) ? trim($_POST['self_gasoline_offer']) : null;
$diesel_offer = isset($_POST['diesel_offer']) ? trim($_POST['diesel_offer']) : null;
$created_date = isset($_POST['created_date']) ? trim($_POST['created_date']) : null;
$updated_date = date(DB_DATE_FORMAT);
$operator = $sysSession->user_name;

// db execution
$table = 'joinme_gas_station';
// 資料表
$column = "*";
// 全部
$whereClause = "station_id = '{$station_id}'";
//PK



$$arrField = [];
$arrField['station_id'] = $station_id;
$arrField['brand_id'] = $brand_id;
$arrField['station_code'] = $station_code;
$arrField['station_name'] = $station_name;
$arrField['address_city'] = $address_city;
$arrField['address_county'] = $address_county;
$arrField['station_address'] = $station_address;
$arrField['gps_latitude'] = (double)$gps_latitude;
$arrField['gps_longitude'] = (double)$gps_longitude;
$arrField['service_time'] = $service_time;
$arrField['service_type'] = $service_type;
$arrField['gas_type'] =$gas_type;
$arrField['phone'] = $phone;
$arrField['priority'] = $priority;
$arrField['start_date'] = $start_date;
$arrField['expire_date'] = $expire_date;
$arrField['hand_gasoline_offer'] = (double)$hand_gasoline_offer;
$arrField['self_gasoline_offer'] = (double)$self_gasoline_offer;
$arrField['diesel_offer'] = (double)$diesel_offer;
$arrField['created_date'] = $created_date;
$arrField['updated_date'] = $updated_date;
$arrField['operator'] = $operator;
$arrField['address'] = $address;
//存取資料陣列
// var_dump($arrField);
dbBegin();
// 呼叫server端準備進行操作

$result['success'] = dbUpdate($table, $arrField, $whereClause);
// 成功後依輸入值執行更新欄位的值
$result['msg'] = $result['success'] ? 'success' : 'fails';
// 判斷更新資料是否成功
// var_dump($arrField);
if ($result['success'] ) {
    dbCommit();
    // 上傳更新資料
} else {
    dbRollback();
    // 不要執行更新，把資料庫的狀態復原至我們執行dbBegin的時間點
}

echo json_encode($result);
// 輸出是否成功訊息