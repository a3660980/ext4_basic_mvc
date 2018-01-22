<?php
    // init
    //////test123
	require "../init.php";
    $sys_lang = "../lang/big5";//SYS_LANG 
    
	// 語系檔
	require $sys_lang . "/lib/common.php";
	require $sys_lang . "/mainPage/index.php";
	require $sys_lang . "/mainPage/modules/account_profile.php";
	require $sys_lang . "/mainPage/modules/system_configuration.php";
	require $sys_lang . "/mainPage/modules/device_information.php";
	require $sys_lang . "/mainPage/modules/session_management.php";
	require $sys_lang . "/mainPage/modules/message_queue.php";
    require $sys_lang . "/mainPage/modules/service_log.php";
	require $sys_lang . "/mainPage/modules/user_management.php";
	require $sys_lang . "/mainPage/modules/access_setting.php";
	require $sys_lang . "/mainPage/modules/change_password.php";
    require $sys_lang . "/mainPage/modules/hotelApp.php";
?><!DOCTYPE html>
<html>
<head>
    <title><?php echo $MSG['html_title']; ?></title>
    <link href=<?php echo $sys_image ."/favicon.ico";?> rel="SHORTCUT ICON">
    <meta charset="utf-8">
	<?php echo set_js(); ?>
    <?php require $sys_css ."/mainPage/style.php"; ?>
	<!-- pre-load variable of mainPage -->
    <script type="text/javascript">
        extjs_path = '<?php echo JS_LIBRARY_EXTJS_PATH; ?>';
        // img_logo_path = '<?php echo $sys_image; ?>/logo.png';
        img_logo_bg_path = '<?php echo $sys_image; ?>/top_bg.png';
        session_user = SES['user_name'];
        session_authorization_str = SES['authorization_item'];

    </script>
    <!-- override js -->
    <script type="text/javascript" src="override.js" ></script>
    <!-- mainPage main js -->
    <script type="text/javascript" src="index.js"></script>
    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCDnCKeLFm4xcinKUtvDFLVhtIFHYLNKHQ" async defer></script>
</head>
<body></body>
</html>
