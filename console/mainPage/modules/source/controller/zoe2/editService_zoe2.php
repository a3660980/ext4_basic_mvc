<?php
require "../../../../../init.php";


// result defination
$result = [];
$sql = [];

//畫面上修改的欄位
//isset判斷該變數是否存在form上
$name = isset($_POST['name']) ? trim($_POST['name']) : null;
$sex = isset($_POST['sex']) ? trim($_POST['sex']) : null;
$email = isset($_POST['email']) ? trim($_POST['email']) : null;
$phone = isset($_POST['phone']) ? trim($_POST['phone']) : null;
$address = isset($_POST['address']) ? trim($_POST['address']) : null;
$birthday = isset($_POST['birthday']) ? trim($_POST['birthday']) : null;

if (empty($birthday)) {
	$birthday = null;
}

//where的指定欄位
$s_id = isset($_POST['s_id']) ? trim($_POST['s_id']) : null;

// db execution
$table = 'profile_zoe';

$whereClause = "s_id = '{$s_id}'";

$arrField = []; //自定變數陣列
$arrField['name'] = $name;
$arrField['sex'] = $sex;
$arrField['email'] = $email;
$arrField['phone'] = $phone;
$arrField['address'] = $address;
$arrField['birthday'] = $birthday;


dbBegin(); //開始資料表 beginTransaction()開始一個事務 關閉自動提交

$result['success'] = dbUpdate($table, $arrField, $whereClause);
$result['msg'] = $result['success'] ? 'success' : 'fails';
//$result['msg'] = $result['success'] ? 'success' : SQL_FAILS;



if ($result['success'] ) {
    dbCommit(); //提交$sysConn->commit()結束事物才提交
} else {
    dbRollback(); //返回rollBack 回滾對數據庫做的更改返回自動提交模式
}

// output result
echo json_encode($result);

?>