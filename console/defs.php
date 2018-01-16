<?php
/*
* CPS_DB 的定義在 C:\cps\service\utility\common\defs.php
* 這裡是宣告該專案的客製化 define
*/

define('UPDATE_FAILS', '資料無法刪除，請確認');
define('FAILS_MSG', '資料無法刪除，請確認。');
define('FAILS_MSG_USER_DOES_EXISTS', '此帳號已存在');
define('FAILS_MSG_MOBILE_DOES_EXISTS', '此手機號碼已存在');
define('FAILS_MSG_EMAIL_DOES_EXISTS', '此信箱已存在');
define('SQL_FAILS', '資料庫操作失敗，請確認');

define('ORDER_SERVICE_A0', '機車');
define('ORDER_SERVICE_A1', '汽車');
define('ORDER_SERVICE_B0', '市區接送');
define('ORDER_SERVICE_B1', '機場接送');
define('ORDER_SERVICE_C0', '道援');
define('ORDER_SERVICE_D0', '商城');
define('NOTIFY_ORDER_TITLE', '生意上門了，請趕快回覆！');
define('REPLY_ORDER_TITLE', 'Join Me：我可以！');
define('PLACE_ORDER_TITLE', '客戶下單了，請即刻前往！');
define('ON_SERVICE_TITLE', '我已經出發了！');
define('ON_REPORT_TITLE', '取件完成！');
define('CREATE_INVOICE_TITLE', '發票已開立完成！');
define('USER_ROLE_DRIVER', '從業人員');
define('USER_IDENTITY_DRIVER', 2);//從業人員
define('USER_ROLE_USER', '一般會員');
define('USER_IDENTITY_USER', 1);//一般會員
define('FORM_TYPE_ORDER_ERRAND', 21);
define('FORM_TYPE_ERRAND_MATCH', 22);
define('FORM_TYPE_ERRAND_STATUS', 23);
define('SERVICE_CANCEL_CHECK_USER', 1);
define('SERVICE_CANCEL_CHECK_DRIVER', 2);
define('DRIVER_STATUS_APPROVE', 1);
define('DRIVER_STATUS_IN_SERVICE', 2);

define('DRIVER_FOLDER_ROOT', SYS_DOCUMENT . '/driver/');
$relative_path                    = substr(SYS_DOCUMENT, 2);
$relative_path                    = str_replace('\\', '/', $relative_path);
define('DRIVER_FOLDER_RELATIVE_ROOT', $relative_path . '/driver/');

define('ORDER_ERRAND_FOLDER_ROOT', SYS_DOCUMENT . '/order_errand/');
$relative_path                    = substr(SYS_DOCUMENT, 2);
$relative_path                    = str_replace('\\', '/', $relative_path);
define('ORDER_ERRAND_FOLDER_RELATIVE_ROOT', $relative_path . '/order_errand/');

define('ERRAND_STATUS_FOLDER_ROOT', SYS_DOCUMENT . '/errand_status/');
$relative_path                    = substr(SYS_DOCUMENT, 2);
$relative_path                    = str_replace('\\', '/', $relative_path);
define('ERRAND_STATUS_FOLDER_RELATIVE_ROOT', $relative_path . '/errand_status/');

define('JOINME_USER_PROFILE', 'joinme_user_profile');
define('JOINME_USER_INVOICE', 'joinme_user_invoice');
define('JOINME_USER_DONATE', 'joinme_user_donate');
define('JOINME_DRIVER_PROFILE', 'joinme_driver_profile');
define('JOINME_DRIVER_SERVICE', 'joinme_driver_service');
define('JOINME_DRIVER_MOTOR', 'joinme_driver_motor');
define('JOINME_DRIVER_CAR', 'joinme_driver_car');
define('JOINME_DRIVER_TAXI', 'joinme_driver_taxi');
define('JOINME_DRIVER_TRUCK', 'joinme_driver_truck');
define('JOINME_USER_RANK', 'joinme_user_rank');
define('JOINME_DRIVER_RANK', 'joinme_driver_rank');
define('JOINME_USER_WITHDRAW', 'joinme_user_withdraw');
define('JOINME_USER_DEPOSIT', 'joinme_user_deposit');
define('JOINME_USER_COUPON', 'joinme_user_coupon');
define('JOINME_COUPON_MASTER', 'joinme_coupon_master');
define('JOINME_COUPON_DETAIL', 'joinme_coupon_detail');


define('CPS_SERVICE_INFO', 'cps_service_info');
define('CPS_SERVICE_CATEGORY', 'cps_service_category');
define('CPS_ADDRESS_MASTER', 'cps_address_master');
define('CPS_ADDRESS_DETAIL', 'cps_address_detail');
define('CPS_AD_PROMOTION', 'cps_ad_promotion');
define('CPS_USER_OPERATION', 'cps_user_operation');
define('CPS_TABLE_AD_PUSH', 'cps_ad_push');
define('CPS_TABLE_AD_TARGET', 'cps_ad_target');
define('CPS_TABLE_USER_SERVICE', 'cps_user_service');






define('JOINME_ORDER_MASTER', 'joinme_order_master');
define('JOINME_ORDER_ERRAND', 'joinme_order_errand');
define('JOINME_ERRAND_MATCH', 'joinme_errand_match');
define('JOINME_ERRAND_STOP', 'joinme_errand_stop');
define('JOINME_ERRAND_STATUS', 'joinme_errand_status');
define('JOINME_INVOICE_DONATE', 'joinme_invoice_donate');
define('JOINME_DRIVER_LOCATION', 'joinme_driver_location');
define('URL_INVOICE_GET_NO', 'https://60.249.149.65/service/joinme/Invoice_getNo.php');
define('JOINME_TABLE_USER_ADDRESS', 'joinme_user_address'); 
define('CPS_TABLE_SERVICE_SUMMARY','cps_service_summary');
define('CPS_TABLE_TIME_SUMMARY','cps_time_summary');
define('CPS_TABLE_CATEGORY_SUMMARY','cps_category_summary');
define('CPS_TABLE_VISIT_SUMMARY','cps_visit_summary');
define('CPS_TABLE_LOCATION_SUMMARY','cps_location_summary');
define('CPS_TABLE_DEVICE_SUMMARY','cps_device_summary');
define('CPS_TABLE_CLICK_SUMMARY','cps_click_summary');
define('CPS_TABLE_APP_SUMMARY','cps_app_summary');
define('JOINME_CORP_PROFILE','joinme_corp_profile');
define('JOINME_ORDER_TAXI','joinme_order_taxi');

?>