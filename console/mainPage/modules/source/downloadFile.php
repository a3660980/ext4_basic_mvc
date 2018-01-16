<?php

// 驗證session
// if (!$sysSession->check()) return;

// $sysConnDebug = true;

$file = isset($_GET['file']) ? $_GET['file'] : null;

if ($file == null) {
    exit();
}

// $file = '/' . $file;

header('Content-Length: ' . filesize($file));
header('Content-Type: application/octet-stream');
header('Content-Disposition: attachment; filename=' . basename($file));
ob_end_clean();

echo file_get_contents($file);
exit();