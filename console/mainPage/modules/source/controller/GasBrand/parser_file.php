<?php
require "../../../../../init.php";

// $sysConnDebug = true;

$file = $_FILES['upload']['name'];
$tmp = $_FILES['upload']['tmp_name'];
$extension = strtolower(pathinfo($file, PATHINFO_EXTENSION));

if ($extension != 'csv') {
    $result = [
        'success' => false,
        'msg' => '只支援副檔名為CSV'
    ];

    echo json_encode($result);

    return;
}

$content = trim(file_get_contents($tmp));
$content = trim(mb_convert_encoding($content, "UTF-8", "BIG5, UTF-8"));
$content = str_replace('"', '', $content);
$content = explode("\n", $content);

$columnField = [];
$arrField = [];
$dbResult = [];
$table = CPS_TABLE_USER_ACCOUNT;
$current_date = date(DB_DATE_FORMAT);
$corp_id = $sysSession->corp_id;
$operator = $sysSession->user_name;

dbBegin();
$columnField = [
    'user_account',
    'user_name_tw',
    'user_name_en',
    'user_phone',
    'user_mobile',
    'user_email',
    'user_division',
    'user_division_code',
    'user_department',
    'user_department_code',
    'user_job_title'
];

$outputMessage = [];
$buildError = false;

foreach($content as $key => $values) {
    $row = explode(",", $values);

    if ($key == 0) continue;

    $user_name = $row[0];
    $user_firstname_tw = $row[1];
    $user_firstname_en = $row[2];
    $user_phone_number_1 = $row[3];
    $user_mobile_number_1 = $row[4];
    $user_email_1 = $row[5];
    $user_division = $row[6];
    $user_division_code = $row[7];
    $user_department = $row[8];
    $user_department_code = $row[9];
    $user_role = $row[10];

    if ($key != 0) {
        $colResult = checkUserExists($user_name, $user_email_1, $user_mobile_number_1);

        if (! $colResult['success']) {
            array_push($outputMessage, "使用者名稱：$user_name 新增失敗（$colResult[show] $colResult[msg]）");
            $buildError = true;
            continue;
        }
        //用戶資料有多階層時，需使用Division及Department
        // Division 第一層
        $oRecord = getUserOrganization($user_division_code);

        if ($oRecord == false) {
            $divisionId = insertUserOrganization($corp_id, $user_division_code, $user_division, $operator);

            if ($divisionId === false) {
                dbRollback();
                $result = [
                    'result' => false,
                    'error_code' => 902,
                    'error_message' => ERROR_902
                ];
                echo json_encode($result);
                exit;
            }
        } else {
            $divisionId = $oRecord['organization_id'];
        }

        // Department 第二層
        $hasParent = false;
        if (! empty($user_department) && ! empty($user_department_code)) {
            $hasParent = true;

            $dRecord = getUserOrganization($user_department_code);

            if ($dRecord == false) {
                $departmentId = insertUserOrganization($corp_id, $user_department_code, $user_department, $operator, $divisionId);

                if ($departmentId === false) {
                    dbRollback();
                    $result = [
                        'result' => false,
                        'error_code' => 902,
                        'error_message' => ERROR_902
                    ];
                    echo json_encode($result);
                    exit;
                }
            } else {
                $departmentId = $dRecord['organization_id'];
            }
        }

        // add account
        if ($hasParent) {
            $id = $departmentId;
            $pid = $divisionId;
        } else {
            $id = $divisionId;
            $pid = null;
        }

        $arrField = [];
        $arrField['user_name'] = $user_name;
        $arrField['user_firstname_tw'] = $user_firstname_tw;
        $arrField['user_firstname_en'] = $user_firstname_en;
        $arrField['user_phone_number_1'] = $user_phone_number_1;
        $arrField['user_mobile_number_1'] = $user_mobile_number_1;
        $arrField['user_email_1'] = $user_email_1;
        $arrField['user_role'] = $user_role;
        $arrField['user_organization_id'] = $id;
        $arrField['device_app_id'] = PROJECT_DEVICE_APP_ID;
        $arrField['user_corp_id'] = $corp_id;
        $arrField['registration_date'] = $current_date;
        $arrField['last_updated_date'] = $current_date;
        $arrField['user_status'] = 0;
        $arrField['operator'] = $operator;

        if (! dbInsert($table, $arrField)) {
            dbRollback();

            $result['success'] = false;
            $result['msg'] = '系統出現錯誤, 請聯繫管理員';

            echo json_encode($result);

            exit();
        }
    }
}

dbCommit();
$result['success'] = true;
$result['msg'] = $buildError ? $outputMessage : ['匯入資料已完成'];

echo json_encode($result);

function checkUserExists($user_name, $user_email_1, $user_mobile_number_1) {

    // vertify
    $patten = '/[a-zA-Z0-9]+/';
    $emailPatten = '/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/';
    $phonePatten = '/^09\d{8}$/';

    if (! preg_match($patten, $user_name)) {
        $result['success'] = false;
        $result['msg'] = '帳號僅限輸入英文或數字';
        $result['show'] = $user_name;

        return $result;
    }
    // if (strlen($user_name) < 5) {
    //     $result['success'] = false;
    //     $result['msg'] = '帳號長度必須大於五';
    //     $result['show'] = $user_name;

    //     return $result;
    // }
    if (! preg_match($emailPatten, $user_email_1)) {
        $result['success'] = false;
        $result['msg'] = 'Email格式不合法';
        $result['show'] = $user_email_1;

        return $result;
    }
    if (! preg_match($phonePatten, $user_mobile_number_1)) {
        $result['success'] = false;
        $result['msg'] = '手機號碼不合法';
        $result['show'] = $user_mobile_number_1;

        return $result;
    }

    $table = CPS_TABLE_USER_ACCOUNT;
    $column = "user_name, user_email_1, user_mobile_number_1";
    $sql = [];

    $sql['checkData'] = [
        'mysql' => "SELECT {$column} FROM {$table} WHERE ",
        'mssql' => "SELECT {$column} FROM {$table} WHERE ",
        'oci8' => "SELECT {$column} FROM {$table} WHERE "
    ];
    // user
    $whereClause = "user_name = '{$user_name}'";
    $searchSql = $sql['checkData'][SYS_DBTYPE] ."{$whereClause}";
    $record = dbGetRow($searchSql);

    if ($record) {
        $result['success'] = false;
        $result['msg'] = '使用者名稱已存在';
        $result['show'] = $user_name;

        return $result;
    }
    // mobile
    $whereClause = "user_mobile_number_1 = '{$user_mobile_number_1}'";
    $searchSql = $sql['checkData'][SYS_DBTYPE] ."{$whereClause}";
    $record = dbGetRow($searchSql);

    if ($record) {
        $result['success'] = false;
        $result['msg'] = '使用者手機號碼已存在';
        $result['show'] = $user_mobile_number_1;

        return $result;
    }
    // email
    $whereClause = "user_email_1 = '{$user_email_1}'";
    $searchSql = $sql['checkData'][SYS_DBTYPE] ."{$whereClause}";
    $record = dbGetRow($searchSql);

    if ($record) {
        $result['success'] = false;
        $result['msg'] = '使用者信箱已存在';
        $result['show'] = $user_email_1;

        return $result;
    }

    $result['success'] = true;

    return $result;
}

function getUserOrganization($code) {
    $table = CPS_TABLE_USER_ORGANIZATION;
    $column = "*";
    $whereClause = "organization_code = '{$code}'";
    $sql['getOrganization'] = [
        'mysql' => "SELECT {$column} FROM {$table} WHERE {$whereClause}",
        'mssql' => "SELECT {$column} FROM {$table} WHERE {$whereClause}",
        'oci8' => "SELECT {$column} FROM {$table} WHERE {$whereClause}"
    ];

    $record = dbGetRow($sql['getOrganization'][SYS_DBTYPE]);

    return $record;
}

function getUserAccount($key, $value) {
    $table = CPS_TABLE_USER_ACCOUNT;
    $column = "*";
    $whereClause = "{$key} = '{$value}'";
    $sql['getUserAccount'] = [
        'mysql' => "SELECT {$column} FROM {$table} WHERE {$whereClause}",
        'mssql' => "SELECT {$column} FROM {$table} WHERE {$whereClause}",
        'oci8' => "SELECT {$column} FROM {$table} WHERE {$whereClause}"
    ];

    $record = dbGetRow($sql['getUserAccount'][SYS_DBTYPE]);

    return $record;
}

function insertUserOrganization($corp_id, $code, $name, $operator, $pid=null, $security=0) {
    $current_date = date(GROUPER_DATE_FORMAT);
    $uuid = uuid_generator();
    $table = CPS_TABLE_USER_ORGANIZATION;

    $sql = [];
    $column = "*";
    $whereClause = "organization_name = '{$name}' OR organization_code = '{$code}'";
    $sql['getUserOrganization'] = [
        'mysql' => "SELECT {$column} FROM {$table} WHERE {$whereClause}",
        'mssql' => "SELECT {$column} FROM {$table} WHERE {$whereClause}",
        'oci8' => "SELECT {$column} FROM {$table} WHERE {$whereClause}"
    ];
    $record = dbGetRow($sql['getUserOrganization'][SYS_DBTYPE]);

    if ($record !== false) {
        $result['result'] = false;
        $result['error_code'] = 5001;
        $result['error_message'] = ERROR_5001;
        echo json_encode($result);
        exit;
    }

    $arrField = [];
    $arrField['corp_id'] = $corp_id;
    $arrField['organization_id'] = $uuid;
    $arrField['organization_code'] = $code;
    $arrField['organization_name'] = $name;
    $arrField['organization_parent_id'] = $pid;
    $arrField['created_date'] = $current_date;
    $arrField['operator'] = $operator;

    if (dbInsert($table, $arrField) !== false) {
        return $uuid;
    }

    return false;
}