<?php
require "../../../../../init.php";

// $sysConnDebug = true;
// result defination
$result = [];
// db execution
$home_id = isset($_POST['home_id']) ? trim($_POST['home_id']) : null;
$home_name = isset($_POST['home_name']) ? trim($_POST['home_name']) : null;
$home_sort = isset($_POST['home_sort']) ? trim($_POST['home_sort']) : null;
$home_photo = null;
$uploadParam = 'home_photo';
$user_i18n = 'tw';
$start_date= !empty($_POST['start_date']) ? trim($_POST['start_date']) : date(DB_DATE_FORMAT);
$expire_date= !empty($_POST['expire_date']) ? trim($_POST['expire_date']) : null;
$updated_date= date(DB_DATE_FORMAT);
$operator= $sysSession->user_name;

dbBegin();

$table = 'femobile_hotel_homepage_betty';
// 資料表
$whereClause = "home_id = '{$home_id}'";
$picture=false;
if (isset($_FILES)) {//不為空值
    echo '<script>console.log('.$_FILES.')</script>';
    $sql = "SELECT * FROM {$table} WHERE {$whereClause}";
    $records = dbGetAll($sql);
    //select data check
    if(count($records) == 0){
            return;
    }
    //db data change php array
        $source= @ getimagesize($_FILES[$uploadParam]['tmp_name']);
        $w = $source[0]; /*取得圖片的寬 */
        $h = $source[1]; /*取得圖片的高 */
        if ($w !=1080 && $h != 1920) {
             $result = [
                        'success' => false,
                        'msg' => '圖檔大小要符合1080X1920'
                         ];
            echo json_encode($result);
            return;
        }
        $filePath = "betty_hotel/{$home_id}";
        $fileName = $home_id.'+_photo';
        if(!empty($_FILES[$uploadParam]['name'])){
             $img_check = strtolower(pathinfo($_FILES[$uploadParam]['name'], PATHINFO_EXTENSION));
            //check file type is picture
            if (!$img_check) {
                $result = [
                            'success' => false,
                            'msg' => '檔案為非圖片格式類型'
                            ];
                echo json_encode($result);
                return;
            }  
            $uploadFileResult = uploadFile($filePath, $fileName, $uploadParam);
            if ($uploadFileResult['result']==false) {
            $result['success'] = false;
            $result['msg'] = $uploadFileResult['msg'];
            echo json_encode($result);
            return;
            }       
        $home_photo = $uploadFileResult['name'];
        }
}else{
        foreach ($records as $key => $row) {
            if($row['home_photo'] != null){
                $home_photo = $row['home_photo'];
            }  
        }
}    

$arrField = [];
$arrField['home_id'] = $home_id;
$arrField['home_name'] = $home_name;
$arrField['home_photo'] = $home_photo;
$arrField['home_sort'] = $home_sort;
$arrField['user_i18n'] = $user_i18n;
$arrField['updated_date'] = $updated_date;
$arrField['operator'] = $operator;
$result['success'] = dbUpdate($table, $arrField, $whereClause);
$result['msg'] = $result['success'] ? 'success' : 'fails';
if ($result['success'] ) {
    dbCommit();
} else {
    dbRollback();
}
echo json_encode($result);
