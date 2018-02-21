<?php
require "../../../../../init.php";


// result defination
$result = [];
$sql = [];

//畫面上新增的欄位
$sysid = isset($_POST['sysid']) ? trim($_POST['sysid']) : null;
$p_year = isset($_POST['p_year']) ? trim($_POST['p_year']) : null;
$p_part1 = isset($_POST['p_part1']) ? trim($_POST['p_part1']) : null;
$p_part2 = isset($_POST['p_part2']) ? trim($_POST['p_part2']) : null;
//如果db是datetime就用下面這個函數
$p_update = date(DB_DATE_FORMAT);
$p_total = null;
$p_grade = null;

if (!empty($p_part1)) {
	$p_total = $p_part1;
}else {
	$p_part1 = null;
}

if (!empty($p_part2)) {
	$p_total = $p_total + $p_part2;
}else {
	$p_part2 = null;
	//如果同時為null其total也要為null
	//$p_total = is_null($p_part1) ? null : $p_total;
}

//兩個部份的評核分數都有才幫忙落等
if ($p_total > 0 && !is_null($p_part1) && !is_null($p_part2)) {
	switch ($p_total) {
		case $p_total >= 95:
		     $p_grade = '優';
		     break;
		case $p_total >= 80:
		     $p_grade = '甲';
		     break;
		case $p_total >= 70:
		     $p_grade = '乙';
		     break;
		case $p_total >= 60:
		     $p_grade = '丙';
		     break;
		case $p_total < 60:
		     $p_grade = '丁';
		     break;
    }
}


// db execution
$table = 'tmsperformancedata';

$whereClause = "sysid = '{$sysid}'";

$arrField = []; //自定變數陣列
$arrField['p_year'] = $p_year;
$arrField['p_part1'] = $p_part1;
$arrField['p_part2'] = $p_part2;
$arrField['p_total'] = $p_total;
$arrField['p_grade'] = $p_grade;
$arrField['p_update'] = $p_update;



dbBegin(); //開始資料表 beginTransaction()開始一個事務 關閉自動提交

$result['success'] = dbUpdate($table, $arrField, $whereClause);
$result['msg'] = $result['success'] ? 'success' : 'fails';

if ($result['success'] ) {
    dbCommit(); //提交$sysConn->commit()結束事物才提交
} else {
    dbRollback(); //返回rollBack 回滾對數據庫做的更改返回自動提交模式
}

// output result
echo json_encode($result);

?>