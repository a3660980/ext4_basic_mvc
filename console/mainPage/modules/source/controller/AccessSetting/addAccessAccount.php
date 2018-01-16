<?php
require "../../../../../init.php";

// $sysConnDebug = true;

$result = [];
$current_date = date(DB_DATE_FORMAT);

// post & session variable
$corp_id_cAccount = trim($_POST['corp_id']);
$user_name = trim($_POST['user_name']);
$password = trim($_POST['password']);
$name = trim($_POST['name']);
$department = trim($_POST['department']);
$title = trim($_POST['title']);
$mobile_phone = trim($_POST['mobile_phone']);
$email = trim($_POST['email']);
$authorization_item = trim($_POST['authorization_item']);
$operator = $sysSession->user_name;

// db execution
$table = CPS_TABLE_USER_PROFILE;
$account = CPS_TABLE_USER_ACCOUNT;

$corp_id = '';

$record = dbSelectRow($table, ['*'], ['user_name' => $user_name]);

if(!empty($record)){//已存在
    $result = [
        'result' => false,
        'msg' => '該帳號已存在，無法新增。',
    ];

    echo json_encode($result);
	exit();
}else{
	$check = dbSelectRow($account, ['user_identity','user_corp_id'],
				 ['user_name' => $user_name]);
	
	if(empty($check)){
		$corp_id = '99999999';
	}else{
		if($check['user_identity']==3){
			if($check['user_corp_id']==$corp_id_cAccount){
				$corp_id = '88888888';
			}else{
				$corp_id = $check['user_corp_id'];
			}
		}else{
			$result = [
		        'result' => false,
		        'msg' => '該帳號非企業客戶，無法授權。',
		    ];

		    echo json_encode($result);
			exit();
		}
	}
}

$password = data_encrypt($password);

$dbPasswords = [
    'mysql' => $password,
    'mssql' => $password,
    'oci8' => $password
];

$arrField = [];

$arrField['corp_id'] = $corp_id;
$arrField['user_name'] = $user_name;
$arrField['password'] = $dbPasswords[SYS_DBTYPE];
empty($department) ? null: ($arrField['department'] = $department);
empty($title) ? null: ($arrField['title'] = $title);
$arrField['name'] = $name;
$arrField['mobile_phone'] = $mobile_phone;
$arrField['email'] = $email;
$arrField['created_date'] = $current_date;
$arrField['operator'] = $operator;
$arrField['authorization_item'] = $authorization_item;

$result['success'] = dbInsert($table, $arrField, $dbTypeInsert);

$result['msg'] = $result['success'] ? 'success' : 'fails';

// output result
echo json_encode($result);