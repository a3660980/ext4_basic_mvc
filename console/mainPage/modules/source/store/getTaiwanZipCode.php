<?php
$data = json_decode(file_get_contents('taiwanZipCode.json'));

@$index = $_GET['index'];
@$address_city = $_GET['address_city'];
$array = [];

if (isset($address_city)) {
	$index = 0;
	for ($i = 0; $i < count($data); $i++) {
		if ($address_city == $data[$i]->address_city) {
			$index = $i;
			break;
		}
	}
}

if ( ! isset($index)) {
	// 縣市
	for ($i = 0; $i < count($data); $i++) {
		$array[$i] = [
			"address_city" => $data[$i]->address_city,
			"display_address_city" => $data[$i]->address_city,
			"index"	=> $i
		];
	}
	$result = ['result' => $array];
}
else {
	for ($j = 0; $j < count($data[$index]->children); $j++) {
		$selectData = $data[$index]->children[$j];
		$array[$j] = [
			"address_county" => $selectData->address_county,
			"display_address_county" => $selectData->address_county,
			"address_zip" => $selectData->address_zip,
			"display_address_zip" => $selectData->address_zip
		];
	}
	$result = ['result' => $array];
}

echo json_encode($result);