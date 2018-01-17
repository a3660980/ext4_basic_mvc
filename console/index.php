<?php
	session_start();
    session_destroy();
    
	require "./init.php";
	// 語系檔
	require SYS_LANG . "/lib/common.php";
	require SYS_LANG . "/index.php";
?>
<!DOCTYPE html>
<html>
<head>
    <title><?php echo $MSG['html_title']; ?></title>
    <meta charset="utf-8">
    <link href=<?php echo $sys_image ."/favicon.ico";?> rel="SHORTCUT ICON">
    <!-- GC -->
    <?php echo set_js(); ?>
    <?php require "./resource/default/css/style.php"; ?>
    <!-- <x-compile> -->
    <script src="index.js"></script>
</head>
<body></body>
</html>
