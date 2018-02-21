<?php
require "../../../../../init.php";

// $sysConnDebug = true;

// result defination
$result = [];
$sql = [];
$operator = $sysSession->user_name;
$updated_date = date(DB_DATE_FORMAT);

$table = 'femobile_hotel_room';
$table_branch ='femobile_hotel_branch';

$room_id = isset($_POST['room_id']) ? trim($_POST['room_id']) : null;
$branch_name = isset($_POST['branch_name']) ? trim($_POST['branch_name']) : null;
$room_sort = isset($_POST['room_sort']) ? trim($_POST['room_sort']) : null;
$room_name = isset($_POST['room_name']) ? trim($_POST['room_name']) : null;
$room_spec = isset($_POST['room_spec']) ? trim($_POST['room_spec']) : null;


// 用branch_name找branch_id
$sql="SELECT branch_id FROM {$table_branch} where {$table_branch}.branch_name = '{$branch_name}' ";
$records = dbGetAll($sql);
foreach ($records as $key => $value) {
    $branch_id = $value['branch_id'];
}


//判斷原本有沒有圖片
$sql_photo="SELECT room_photo FROM {$table} where room_id = '{$room_id}'";
$records_photo = dbGetAll($sql_photo);
foreach ($records_photo as $key => $row) {
    if($row['room_photo'] != null)
    $room_photo = $row['room_photo'];
}

//避免飯店名稱、房型名稱皆相同者
// $sql_name ="SELECT branch_id , room_name FROM {$table}";
// $records_name = dbGetAll($sql_name);
// foreach ($records_name as $key => $value) {
//     $id = $value['branch_id'];
//     $room = $value['room_name'];
//     	if ($id == $branch_id && $room == $room_name) {
//     		$result = [
//             'success' => false,
//             'msg' => '飯店名稱、房型名稱已重複。'
//         ];

//         echo json_encode($result);

//         return;
//     	}
// }

//圖片
$uploadParam = 'room_photo';

if (isset($_FILES) && ! empty($_FILES[$uploadParam]['name'])) {

	
    $extension = strtolower(pathinfo($_FILES[$uploadParam]['name'], PATHINFO_EXTENSION));
   //因為PATHINFO_EXTENSION 所以$extension放的為檔案類別

    //check picture .png/.jpg
    if ($extension != 'png' && $extension != 'jpg') {
        $result = [
            'success' => false,
            'msg' => '圖檔只支援副檔名為PNG和JPG'
        ];

        echo json_encode($result);

        return;
    }

    // $imginfo = getimagesize($_FILES[$uploadParam]['tmp_name']);

    // if($imginfo[0]!=1080&&$imginfo[1]!=1920){
    //     $result = [
    //         'success' => false,
    //         'msg' => '照片尺寸不符，請輸入1080x1920dp的照片！'
    //     ];
    //     // unlink($uploadFileResult['tmpname']);
    //     echo json_encode($result);
    //     return;
    // }

    $filePath = "HotelRoom/room_photo";
    $fileName = $room_id . "_photo";
    $uploadFileResult = uploadFile($filePath, $fileName, $uploadParam);

    if ( $uploadFileResult['result'] === false) {
        $result['success'] = false;
        $result['msg'] = $uploadFileResult['msg'];
        echo json_encode($result);

        return;
    }

    $room_photo = $uploadFileResult['name'];

}
// db execution

// 判斷是否已經有相同的飯店名稱
// $sql="SELECT branch_name FROM {$table} where branch_name = '{$branch_name}' ";
// $records = dbGetAll($sql);

// if (!empty($records)) {
// 	$result = [
//             'success' => false,
//             'msg' => '請勿輸入相同飯店名稱'
//         ];

//         echo json_encode($result);

//         return;
// }

$arrField = [];
$arrField['branch_id'] = $branch_id;
$arrField['room_sort'] = $room_sort;
$arrField['room_name'] = $room_name;
$arrField['room_spec'] = $room_spec;
$arrField['room_photo'] = $room_photo;
$arrField['operator'] = $operator;
$arrField['updated_date'] = $updated_date;
$arrField['operator'] = $operator;

dbBegin();

$whereClause = "room_id = '{$room_id}'";
$result['success'] = dbUpdate($table, $arrField, $whereClause);
$result['msg'] = $result['success'] ? 'success' : 'fails';

if ($result['success']) {
    dbCommit();
} else {
    dbRollback();
}

// output result
echo json_encode($result);