<?php
require "../../../../../init.php";

// $sysConnDebug = true;

$result = array();
$table = 'johnny_femobile_hotel_room';
$sql = "SELECT room_id, room_name, branch_id FROM {$table} Order By {$table}.room_sort";
$result = dbGetAll($sql);


echo json_encode($result);
