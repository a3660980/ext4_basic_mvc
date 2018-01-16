<?php
require "../../../../init.php";

// $sysConnDebug = true;
@$address_city = $_GET['address_city'];
@$address_code = $_GET['address_code'];

$result = [];

$data = [];

// var_dump($address_city);
// var_dump($address_code);

// if (isset($address_city)) {
// 	var_dump($address_city);
// 	// $index = 0;
// 	// for ($i = 0; $i < count($data); $i++) {
// 	// 	if ($address_city == $data[$i]->address_city) {
// 	// 		$index = $i;
// 	// 		break;
// 	// 	}
// 	// }
// }

if(! isset($address_city)){
	$sql = "SELECT address_city, min(address_code) AS address_code
			FROM cps_address_master
			GROUP BY address_city order by address_code ";
	$records = dbGetAll($sql);

	// for ($i = 0; $i < count($records); $i++) {
	// 	$data[$i] = [
	// 		"address_city" => $records[$i],
	// 		"display_address_city" => $records[$i],
	// 		"index" => $i
	// 	];
	// }
	$result['result'] = $records;

	// var_dump($result);
}else{
	$sql = "SELECT address_county, address_code FROM cps_address_master
 			WHERE address_city= '{$address_city}' ORDER BY address_county";
 	$record_county = dbGetAll($sql);
	$result['result'] = $record_county;
}

if(isset($address_code)){
	$sql = "SELECT address_road, address_zip FROM cps_address_detail
 			WHERE address_code= '{$address_code}' ORDER BY address_road";
 	$record_road = dbGetAll($sql);
	$result['result'] = $record_road;
}

// $total = dbGetTotal($data);

// output result
// $result['total'] = $total;
// $result['result'] = $data;

echo json_encode($result);
$sysConn = null;