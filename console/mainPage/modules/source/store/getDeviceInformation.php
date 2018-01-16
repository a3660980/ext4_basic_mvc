<?php
require "../../../../init.php";

// $sysConnDebug = true;

$result = [];

$table_user = CPS_TABLE_USER_ACCOUNT;
$table_device = CPS_TABLE_USER_DEVICE;
$table_description = CPS_TABLE_APP_DESCRIPTION;
$table_platform = CPS_TABLE_APP_PLATFORM;

$count = isset($_POST['limit']) ? $_POST['limit']: 0;
$start = isset($_POST['start']) ? $_POST['start']: 0;
$orderby = "registration_date DESC";

$dbColumns = [
    'mysql' => "SQL_CALC_FOUND_ROWS {$table_device}.user_name,
                {$table_device}.device_id,
                {$table_device}.device_app_id,
                {$table_device}.app_platform_id as dp_app_platform_id,
                {$table_device}.device_vendor,
                {$table_device}.device_model,
                {$table_device}.device_os,
                {$table_device}.device_status,
                {$table_device}.device_updated_date,
                {$table_user}.registration_date,
                {$table_user}.user_app_version as app_package_version,
                {$table_platform}.app_platform_id as up_app_platform_id,
                {$table_description}.device_app_name",

    'mssql' => "{$table_device}.user_name,
                {$table_device}.device_id,
                {$table_device}.device_app_id,
                {$table_device}.app_platform_id as dp_app_platform_id,
                {$table_device}.device_vendor,
                {$table_device}.device_model,
                {$table_device}.device_os,
                {$table_device}.device_status,
                {$table_device}.device_updated_date,
                {$table_user}.registration_date,
                {$table_user}.user_app_version as app_package_version,
                {$table_platform}.app_platform_id as up_app_platform_id,
                {$table_description}.device_app_name",

    'oci8' => "{$table_device}.user_name,
                {$table_device}.device_id,
                {$table_device}.device_app_id,
                {$table_device}.app_platform_id as dp_app_platform_id,
                {$table_device}.device_vendor,
                {$table_device}.device_model,
                {$table_device}.device_os,
                {$table_device}.device_status,
                {$table_device}.device_updated_date,
                {$table_user}.registration_date,
                {$table_user}.user_app_version as app_package_version,
                {$table_platform}.app_platform_id as up_app_platform_id,
                {$table_description}.device_app_name"
];
$column = $dbColumns[SYS_DBTYPE];
$joinonClause = "dp_app_platform_id = up_app_platform_id";
$dp_joinonClause = "{$table_platform}.device_app_id = {$table_description}.device_app_id";
$ud_joinonClause = "{$table_user}.user_name = {$table_device}.user_name";


$whereClause = "Month(registration_date)= Month(GetDate())
                and Year(registration_date)= Year(GetDate())";

// like search columns
$searchColumn = ['user_name', 'device_app_name', 'device_os', 'device_vendor', 'device_model'];
$searchValue = isset($_GET['searchValue']) ? $_GET['searchValue']: '';
// for extjs searchfield use
$whereClause = get_where_clause_with_live_search($whereClause, $searchColumn, $searchValue);

if (!empty($whereClause)) {
    $whereClause = " WHERE ".$whereClause;
}

$getTotalSql = "SELECT COUNT(*) as total FROM {$table_device}
                    INNER JOIN {$table_user} ON {$ud_joinonClause}
                    INNER JOIN {$table_platform} 
                    ON {$table_device}.app_platform_id={$table_platform}.app_platform_id
                    INNER JOIN {$table_description} ON {$dp_joinonClause}
                    {$whereClause}";
$records_total = dbGetAll($getTotalSql);
$sql['get_device_information'] = [
    'mysql' => "SELECT {$column} FROM {$table_device}
                    INNER JOIN {$table_user} ON {$ud_joinonClause}
                    INNER JOIN {$table_platform} 
                    ON {$table_device}.app_platform_id={$table_platform}.app_platform_id
                    INNER JOIN {$table_description} ON {$dp_joinonClause} 
                    {$whereClause} ORDER BY {$orderby} LIMIT {$start},{$count}",
    'mssql' => "SELECT * FROM
                (
                    SELECT
                        ROW_NUMBER() OVER (ORDER BY {$orderby}) AS row, {$column}
                    FROM {$table_device}
                    INNER JOIN {$table_user} ON {$ud_joinonClause}
                    INNER JOIN {$table_platform} 
                    ON {$table_device}.app_platform_id={$table_platform}.app_platform_id
                    INNER JOIN {$table_description} ON {$dp_joinonClause}
                    {$whereClause}
                ) result
                WHERE result.row
                BETWEEN {$start} + 1 AND {$start} + {$count}",
    'oci8'  => "SELECT {$column} FROM {$table_device}
                    INNER JOIN {$table_user} ON {$ud_joinonClause}
                    INNER JOIN {$table_platform} 
                    ON {$table_device}.app_platform_id={$table_platform}.app_platform_id
                    INNER JOIN {$table_description} ON {$dp_joinonClause} 
                    {$whereClause} ORDER BY {$orderby} LIMIT {$start},{$count}",
];

// $records = dbGetAll($sql['get_device_information'][SYS_DBTYPE]);
// $total = dbGetTotal($records_total);

// output result
$result['total'] = 0;
$result['result'] = [];

echo json_encode($result);
$sysConn = null;