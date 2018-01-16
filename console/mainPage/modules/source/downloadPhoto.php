<?php

// 驗證session
// if (!$sysSession->check()) return;

// $sysConnDebug = true;

$photo = isset($_GET['photo']) ? $_GET['photo'] : null;

if ($photo == null) {
    exit();
}

// $photo = '/' . $photo;

header('Content-Length: ' . filesize($photo));
header('Content-Type: application/octet-stream');
header('Content-Disposition: attachment; filename=' . basename($photo));
ob_end_clean();

echo file_get_contents($photo);
exit();