<?php
require "../../../../../init.php";

// $sysConnDebug = true;
// result defination
$result = [];
// db execution
$branch_id = isset($_POST['branch_id']) ? trim($_POST['branch_id']) : null;
$branch_name = isset($_POST['branch_name']) ? trim($_POST['branch_name']) : null;
$branch_sort = isset($_POST['branch_sort']) ? trim($_POST['branch_sort']) : null;
$branch_photo = null;
$uploadParam = 'branch_photo';
$user_i18n = 'tw';
$updated_date= date(DB_DATE_FORMAT);
$operator= $sysSession->user_name;

dbBegin();

$table = 'femobile_hotel_branch_betty';
// 資料表
$whereClause = "branch_id = '{$branch_id}'";
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
        if($row['branch_photo'] != null){
            $branch_photo = $row['branch_photo'];
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
        $filePath = "betty_hotelBranch/{$branch_id}";
        $fileName = $branch_id.'+_photo';
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
            $branch_photo = $uploadFileResult['name'];
        }
    }    
}    

$arrField = [];
$arrField['branch_id'] = $branch_id;
$arrField['branch_name'] = $branch_name;
$arrField['branch_photo'] = $branch_photo;
$arrField['branch_sort'] = $branch_sort;
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
