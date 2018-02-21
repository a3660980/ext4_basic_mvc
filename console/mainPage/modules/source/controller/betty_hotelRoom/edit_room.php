<?php
require "../../../../../init.php";

// $sysConnDebug = true;
// result defination
$result = [];
// db execution
$room_id = isset($_POST['room_id']) ? trim($_POST['room_id']) : null;
$branch_id = isset($_POST['branch_id']) ? trim($_POST['branch_id']) : null;
$room_sort = isset($_POST['room_sort']) ? trim($_POST['room_sort']) : null;
$room_name = isset($_POST['room_name']) ? trim($_POST['room_name']) : null;
$room_spec = isset($_POST['room_spec']) ? trim($_POST['room_spec']) : null;
$room_photo = null;
$uploadParam = 'room_photo';
$user_i18n = 'tw';
$updated_date= date(DB_DATE_FORMAT);
$operator= $sysSession->user_name;

dbBegin();

$table = 'femobile_hotel_room_betty';
// 資料表
$whereClause = "room_id = '{$room_id}'";



if (isset($_FILES[$uploadParam]['tmp_name'])) {//不為空值
    $sql = "SELECT * FROM {$table} WHERE {$whereClause}";
    $records = dbGetAll($sql);
    //select data check
    if(count($records) == 0){
            return;
    }
    //db data change php array
    foreach ($records as $key => $row) {
        if($row['room_photo'] != null)
            $room_photo = $row['room_photo'];       
    }
    $filePath = "betty_hotelRoom/{$room_id}";
    $fileName = $room_id.'+_photo';
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
        $source= @ getimagesize($_FILES[$uploadParam]['tmp_name']);
        $w = $source[0]; /*取得圖片的寬 */
        $h = $source[1]; /*取得圖片的高 */
        if ($w !=1080 && $h != 1080) {
            $result = [
                        'success' => false,
                        'msg' => '圖檔大小要符合1080X1080'
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
        $room_photo = $uploadFileResult['name'];
        } 
}    

$arrField = [];
$arrField['room_id'] = $room_id;
$arrField['branch_id'] = $branch_id;
$arrField['room_name'] = $room_name;
$arrField['room_photo'] = $room_photo;
$arrField['room_sort'] = $room_sort;
$arrField['room_spec'] = $room_spec;
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
