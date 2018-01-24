<?php
require "../../../../../init.php";

// $sysConnDebug = true;

$result = array();
$table = "johnny_femobile_hotel_branch";

$column = "branch_id AS 'com_id', branch_name AS 'com_name'";
$whereClause = "1=1 ";
$orderby ="branch_id";

$sql = "
    SELECT {$column} FROM {$table}
    WHERE {$whereClause}
";
$records = dbGetAll($sql);
$result['result'] = $records;

echo json_encode($result);
