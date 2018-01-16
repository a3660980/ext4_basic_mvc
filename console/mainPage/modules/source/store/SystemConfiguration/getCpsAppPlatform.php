<?php
require "../../../../../project_init.php";

// $sysConnDebug = true;

$result = [];

// POST or SESSION variable
$corp_id = $sysSession->corp_id;

// where
$query = isset($_POST['query']) ? json_decode(trim($_POST['query'])) : null;
$property = !empty($query) ? $query->property : null;
$value = !empty($query) ? $query->value : null;
$whereClause = (! empty($property) && ! empty($value)) ? "{$property} = '{$value}'" : null;

// db execution
$table = CPS_TABLE_APP_PLATFORM;
$column = "SQL_CALC_FOUND_ROWS *";
// master select query
$searchColumn = ["device_app_id", "app_package_type", "app_package_name", "app_push_payload"];
$searchValue = isset($_GET['searchValue']) ? $_GET['searchValue'] : '';
// for extjs searchfield use
$whereClause = get_where_clause_with_live_search($whereClause, $searchColumn, $searchValue);

$sql = [];

$start = isset($_POST['start']) ? $_POST['start'] : 0;
$limit = isset($_POST['limit']) ? $_POST['limit'] : 0;

if (empty($query)) {
	$result['total'] = 0;
	$result['result'] = [];

	echo json_encode($result);

	exit();
} else {
	$sql['get_app_platform'] = [
		'mysql'	=> "SELECT {$column} FROM {$table} WHERE {$whereClause} LIMIT {$start}, {$limit}",
		'mssql' => "SELECT {$column} FROM {$table} WHERE {$whereClause} LIMIT {$start}, {$limit}",
		'oci8' => "SELECT {$column} FROM {$table} WHERE {$whereClause} LIMIT {$start}, {$limit}"
	];
}

$records = dbGetAll($sql['get_app_platform'][SYS_DBTYPE]);
$total = dbGetTotal();

for ($i = 0; $i < count($records); $i++) {
	$push_setting = json_decode($records[$i]['app_push_setting']);

	if ($records[$i]['app_package_type'] == 'iOS') {
		$records[$i]['certificate_url'] = $push_setting->certificate_url;
		$records[$i]['certificate_password'] = $push_setting->certificate_password;
		$records[$i]['production'] = $push_setting->production;
	} else if ($records[$i]['app_package_type'] == 'Android') {
		$records[$i]['api_key']	= $push_setting->api_key;
	}
}

// output result
$result['total'] = $total;
$result['result'] = $records;

echo json_encode($result);
$sysConn = null;