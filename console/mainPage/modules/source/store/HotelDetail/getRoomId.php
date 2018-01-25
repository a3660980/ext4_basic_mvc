<?php
require "../../../../../init.php";

// $sysConnDebug = true;

$result = array();
@$branch_id = $_GET['branch_id'];
$table = 'femobile_hotel_room';
$sql = "SELECT room_id, room_name FROM {$table} WHERE {$table}.branch_id = '{$branch_id}' Order By {$table}.room_sort";
$result = dbGetAll($sql);


echo json_encode($result);
