<?php
require "../../../../../init.php";

// debug
// $sysConnDebug = true;

// result defination
$result = [];


$station_id = uuid_generator();
$brand_id = uuid_generator();
$station_code = isset($_POST['station_code']) ? trim($_POST['station_code']) : null;
$station_name= isset($_POST['station_name']) ? trim($_POST['station_name']) : null;
$address_city = isset($_POST['address_city']) ? trim($_POST['address_city']) : null;
$address_county = isset($_POST['address_county']) ? trim($_POST['address_county']) : null;
$station_address = isset($_POST['station_address']) ? trim($_POST['station_address']) : null;
$address = $station_address;
$station_address = $address_city.$address_county.$station_address;

$url = 'https://maps.googleapis.com/maps/api/geocode/json?sensor=false&address='
        .urlencode($station_address);
$data = json_decode(file_get_contents($url));
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
$created_date = date(DB_DATE_FORMAT);
$operator = $sysSession->user_name;


dbBegin();

// db execution
$table = 'joinme_gas_station';

$arrField = [];
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
$arrField['gas_type'] = $gas_type;
$arrField['phone'] = $phone;
$arrField['priority'] = $priority;
$arrField['start_date'] = $start_date;
$arrField['expire_date'] = $expire_date;
$arrField['hand_gasoline_offer'] = (double)$hand_gasoline_offer;
$arrField['self_gasoline_offer'] = (double)$self_gasoline_offer;
$arrField['diesel_offer'] = (double)$diesel_offer;
$arrField['created_date'] = $created_date;
$arrField['operator'] = $operator;
$arrField['address'] = $address;

$result['success'] = dbInsert($table, $arrField);
$result['msg'] = $result['success'] ? 'success' : 'fails';

 // var_dump($result);
if ($result['success']){
    dbCommit();
}else{
    dbRollback();
}

echo json_encode($result);
