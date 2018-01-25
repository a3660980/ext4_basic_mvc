<?php
require "../../../../../init.php";
ini_set("display_errors", 1);
// $sysConnDebug = true;
// result defination
$result = [];
// db execution
$branch_photo_id = isset($_POST['branch_photo_id']) ? trim($_POST['branch_photo_id']) : null;
$branch_id = isset($_POST['branch_id']) ? trim($_POST['branch_id']) : null;
$photo_sort = isset($_POST['photo_sort']) ? trim($_POST['photo_sort']) : null;
$photo_name=isset($_POST['photo_name']) ? trim($_POST['photo_name']) : null;
$photo_url = null;
$uploadParam = 'photo_url';
$user_i18n = 'tw';
$updated_date= date(DB_DATE_FORMAT);
$operator= $sysSession->user_name;

dbBegin();

$table = 'femobile_hotel_photo_betty';
// 資料表
$whereClause = "branch_photo_id = '{$branch_photo_id}'";
$picture=false;
if (isset($_FILES)) {//不為空值
    $sql = "SELECT * FROM {$table} WHERE {$whereClause}";
    $records = dbGetAll($sql);
    //select data check
    if(count($records) == 0){
            return;
    }
    //db data change php array
    foreach ($records as $key => $row) {
        if($row['photo_url'] != null){
            $photo_url = $row['photo_url'];
            $picture=true;
        }else{
             $picture=false;
        }
    }
    if($picture==false){
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
        $filePath = "betty_branchPicture/{$branch_photo_id}";
        $fileName = $branch_photo_id.'+_photo';
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
        $photo_url = $uploadFileResult['name'];
        }
    }
}    

$arrField = [];
$arrField['branch_photo_id'] = $branch_photo_id;
$arrField['branch_id'] = $branch_id;
$arrField['photo_sort'] = $photo_sort;
$arrField['photo_name'] = $photo_name;
$arrField['photo_url'] = $photo_url;
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
