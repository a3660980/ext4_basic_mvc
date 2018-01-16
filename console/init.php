<?php
//echo uuid_uuid_generator();
// config
require_once("C:/study/config/config.php");
require_once("C:/study/config/defs.php");
// init
require_once("C:/cps/service/utility/common/init.php");
// php excel
require 'C:/cps/service/utility/php_library/php_excel/Classes/PHPExcel.php';
//
// init
if (SYS_DBTYPE == 'mysql') {
    $dbTypeInsert = "";
    $dbTypeUpdate = "";
} else if (SYS_DBTYPE == 'mssql') {
    $dbTypeInsert = "MSSQL_INSERT";
    $dbTypeUpdate = "MSSQL_UPDATE";
}

// // get device app id
// $sql = [];
// $column = 'device_app_id';
// $table = CPS_TABLE_APP_DESCRIPTION;
// $device_app_name = DEVICE_APP_NAME;
// $whereClause = "device_app_name = '{$device_app_name}'";
// $sql['getDeviceAppId'] = [
//     'mysql' => "SELECT {$column} FROM {$table} WHERE {$whereClause}",
//     'mssql' => "SELECT {$column} FROM {$table} WHERE {$whereClause}",
//     'oci8' => "SELECT {$column} FROM {$table} WHERE {$whereClause}"
// ];
// $record = dbGetRow($sql['getDeviceAppId'][SYS_DBTYPE]);

// defines
//移到config/defs.php
// define('PROJECT_DEVICE_APP_ID', $record['device_app_id']);
//define('JOINME_USER_PROFILE', $record['joinme_user_profile']);
define('JOINME_TABLE_USER_PROFILE', 'joinme_user_profile');
define('JOINME_TABLE_TRADING_STATISTICS', 'joinme_user_profile');
define('CPS_TABLE_SERVICE_CATEGORY', 'cps_service_category');
define('CPS_TABLE_SERVICE_INFO', 'cps_service_info');
define('CPS_TABLE_ADDRESS_DETAIL','cps_address_detail');
define('CPS_TABLE_ADDRESS_MASTER','cps_address_master');
define('CPS_TABLE_USER_ORDER', 'cps_user_order');

define('JOINME_TABLE_RUN_MOTORCYCLE','joinme_order_master');
define('JOINME_TABLE_RUN_CAR','joinme_order_master');
define('JOINME_TABLE_SHUTTLE_DOWNTOWNAREA','joinme_order_master');
define('JOINME_TABLE_SHUTTLE_AIRPORT','joinme_order_master');
define('JOINME_TABLE_ROAD_ASSISTANCE','joinme_order_master');
define('JOINME_TABLE_USER_ACCOUNT', 'joinme_User_Account');
define('CPS_TABLE_USER_CATEGORY', 'cps_user_category');



// define('JOINME_CORP_DEPARTMENT','joinme_corp_department');


function convertMssqlDatetime($datetime) {
    $datetime = trim($datetime);
    if ($datetime == '' || $datetime == null) return null;
    // 4:30 上午
    $split = explode(" ", $datetime);
    $date = $split[0];
    $time = explode(":", $split[1]);
    $apm = $split[2];
    $h = $time[0];
    $m = $time[1];

    if ($apm == '上午') {
        if ($h == '12') {
            $h = 0;
        }
    } else {
        if ($h != '12') $h += 12;
    }

    $newdatetime = "$date $h:$m";

    return $newdatetime;
}

function convertMysqlDatetime($datetime) {

    $date = explode(' ', $datetime)[0];
    $time = explode(' ', $datetime)[1];
    $timeFormat = explode(' ', $datetime)[2];

    //mysql date format
    $date = date_format(new DateTime($date), 'Y-m-d');

    //mysql convert am/pm
    if($timeFormat == '上午'){
        $timeFormat = "AM";
    }else if($timeFormat == '下午'){
        $timeFormat = "PM";
    }else{
        $timeFormat = "";
    }

    $time = date("H:i", strtotime($timeFormat));

    $newdatetime = "$date $time";

    return $newdatetime;

}

function combineColumns($columns) {
    if (SYS_DBTYPE == 'mysql') {
        $value = implode(',', $columns);
        $result = "CONCAT($value)";
    } else if (SYS_DBTYPE == 'mssql') {
        $result = implode('+', $columns);
    } else {
        $result = implode('+', $columns);
    }

    return $result;
}

function str2bin($str) {
    return strtoupper(bin2hex($str));
}

function uploadFile($path, $filename, $param='upload') {
    global $sys_image;

    $output = [];

    if (empty($path) || empty($filename))
        return 'path or filename is required';

    if ($_FILES[$param]['error'] > 0) {
        $output = [
            'result' => false,
            'error_code' => 3008,
            'error_message' => $_FILES[$param]['error'],
            'msg' => $_FILES[$param]['error']
        ];
    } else {
        $name = $_FILES[$param]['name'];
        $tmpName = $_FILES[$param]['tmp_name'];
        $size = $_FILES[$param]['size'];
        $extension = pathinfo($name, PATHINFO_EXTENSION);
        $url =  '/' .PROJECT_NAME .'/' .$path .'/';
        $pathName = $url .$filename .'.' .$extension;
        $mkResult = @mkdir($url, 0777, true);

        if ($size > 2000000) {
            $output = [
                'result' => false,
                'msg' => '檔案過大'
            ];
        } else if (($extension != 'png') && ($extension != 'jpeg')
              && ($extension != 'jpg')   && ($extension != 'pjpeg')
              && ($extension != 'bmp') && ($extension != 'gif')
              && ($extension != 'zip')) {
              $output = [
                  'result' => false,
                  'msg' => '不支援的副檔案名, 請使用圖片檔'
              ];
        } else {
            try {
                move_uploaded_file($tmpName, $pathName);

                $output = [
                    'result' => true,
                    'name' => $pathName,
                    'size' => $size,
                    'extension' => $extension,
                    'path' => $url
                ];
            } catch (Exception $e) {
                $output = [
                    'result' => false,
                    'msg' => '發生不可預期的錯誤',
                    'exception' => $e
                ];
            }
        }
    }

    return $output;
}

function uploadvideo($path, $filename, $param='upload') {
    global $sys_image;

    $output = [];

    if (empty($path) || empty($filename))
        return 'path or filename is required';

    if ($_FILES[$param]['error'] > 0) {
        $output = [
            'result' => false,
            'error_code' => 3008,
            'error_message' => $_FILES[$param]['error'],
            'msg' => $_FILES[$param]['error']
        ];
    } else {
        $name = $_FILES[$param]['name'];
        $tmpName = $_FILES[$param]['tmp_name'];
        $size = $_FILES[$param]['size'];
        $extension = pathinfo($name, PATHINFO_EXTENSION);
        $url =  '/' .PROJECT_NAME .'/' .$path .'/';
        // $pathName = $url .$name;
        $pathName = $url .$filename .'.' .$extension;
        $mkResult = @mkdir($url, 0777, true);

        if ($size > 20000000) {
            $output = [
                'result' => false,
                'msg' => '檔案過大'
            ];
        } else if (($extension != '3gp') && ($extension != 'mp4')
              && ($extension != 'zip') && ($extension != 'm3u8')) {
              $output = [
                  'result' => false,
                  'msg' => '不支援的副檔案名, 請使用影片檔'
              ];
        } else {
            try {
                move_uploaded_file($tmpName, $pathName);

                $output = [
                    'result' => true,
                    'name' => $pathName,
                    'size' => $size,
                    'extension' => $extension,
                    'path' => $url
                ];
            } catch (Exception $e) {
                $output = [
                    'result' => false,
                    'msg' => '發生不可預期的錯誤',
                    'exception' => $e
                ];
            }
        }
    }
    return $output;
}

function updateCorpAccount() {
    global $sysSession;
    $corpId = $sysSession->corp_id;
    $table = CPS_TABLE_CORP_ACCOUNT;
    $current_date = date(DB_DATE_FORMAT);
    $arrField = [];
    $arrField['updated_date'] = $current_date;
    $whereClause = "corp_id = '{$corpId}'";

    return dbUpdate($table, $arrField, $whereClause);
}

function insertDataSync($table_name, $pk_name, $command, $time) {
    global $sysSession;

    $corpId = $sysSession->corp_id;
    $table = CPS_TABLE_DATA_SYNC;
    $arrField = [
        'table_name' => $table_name,
        'pk_name' => $pk_name,
        'data_id' => $corpId,
        'command' => $command,
        'updated_time' => $time
    ];

    return dbInsert($table, $arrField);
}

function convertDateForSearch($field) {
    return "CONVERT(VARCHAR(26), {$field}, 126)";
}

function csv_to_excel($title, $cells, $records, $titleIsName=false) {
    if (! $titleIsName) {
        $title = pathinfo($title, PATHINFO_FILENAME);
    }
    $current_date = date('Ymd');
    $fileName =  "{$title}_{$current_date}.xls";
    $dir = '/' .PROJECT_NAME . '/'."{$title}";
    @mkdir($dir, 0777, true);
    $fullPath = "{$dir}/{$fileName}";

    $objPHPExcel = new PHPExcel();
    $objPHPExcel->getProperties()->setTitle($title);
    $objActSheet = $objPHPExcel->getActiveSheet();

    // set cell
    $a = 65;

    foreach ($cells as $key => $cell) {
        $objPHPExcel->setActiveSheetIndex(0)
                    ->setCellValue(chr(($a + $key)) ."1", $cell);
    }

    foreach ($records as $key => $row) {
        if ($key == 0) {
            continue;
        }

        foreach ($row as $rowKey => $value) {
            $locationCell = chr($a + $rowKey);
            $locationRow = ($key + 1);
            $location = $locationCell .$locationRow;
            // insert image
            $newValue = (substr($value, 0, 1) === '/') ? $value : "/{$value}";

            if (file_exists($newValue)) {
                $ext = strtolower(pathinfo($newValue, PATHINFO_EXTENSION));
                if ($ext == 'jpg' || $ext == 'png' || $ext == 'jpeg'
                    || $ext == 'bmp' || $ext == 'gif' || $ext == 'tif'
                    || $ext == 'tiff' || $ext == 'wmf' || $ext == 'tga'
                    || $ext == 'pcx' || $ext == 'dwg' || $ext == 'ico') {
                    $objDrawing = new PHPExcel_Worksheet_Drawing();
                    $objDrawing->setPath($newValue);
                    $objDrawing->setHeight(80);
                    $objDrawing->setCoordinates($location);
                    $objDrawing->setOffsetX(10);
                    $objDrawing->setOffsetY(10);
                    $objDrawing->setWorksheet($objPHPExcel->getActiveSheet());
                }
            } else {
                $objPHPExcel->setActiveSheetIndex(0)
                    ->setCellValue($location, $value);
            }
            //轉文字
            $objActSheet->setCellValueExplicit($location, (string)$value, PHPExcel_Cell_DataType::TYPE_STRING);
            $objActSheet->getColumnDimension($locationCell)->setWidth(30);
            $objActSheet->getRowDimension($locationRow)->setRowHeight(80);
        }
    }

    $objPHPExcel->setActiveSheetIndex(0);
    $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');

    $objWriter->save($fullPath);

    return $fullPath;
}

