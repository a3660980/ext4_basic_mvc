<?php
require "../../../../../init.php";

$result = [];
$table = "tabFeed";
$whereClause = '1=1';
$orderby = "{$table}.created_date ASC";
$sql="SELECT * FROM {$table} where {$whereClause} ORDER BY {$orderby}";

$records = dbGetAll($sql);
$total = dbGetTotal($records);

foreach ($records as $i => $value) {

    if(!empty($value['start_date'])){
        $records[$i]['start_date'] = date("Y-m-d",strtotime($value['start_date']));
    }
    if(!empty($value['expire_date'])){
        $records[$i]['expire_date']= date("Y-m-d",strtotime($value['expire_date']));
    }
    if(!empty($value['created_date']))
        $records[$i]['created_date'] =date("Y-m-d H:i:s",strtotime($value['created_date']));
    if(!empty($value['updated_date']))
        $records[$i]['updated_date'] =date("Y-m-d H:i:s",strtotime($value['updated_date']));
}

$result['total'] = $total;
$result['result'] = $records;

echo json_encode($result);
closeConn();