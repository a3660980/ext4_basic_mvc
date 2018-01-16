<?php
require "../../../../../init.php";

// debug
// $sysConnDebug = true;

// result defination
$result = [];

// post or session variable
$sysSession->clean();

// check session
if (empty($ses_username) || $ses_username == 'guest') {
	$result['success']	= true;
} else {
	$result['success']	= false;
}

// output result
echo json_encode($result);