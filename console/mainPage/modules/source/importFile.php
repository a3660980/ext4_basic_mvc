<?php
/**
 * @author: 鹹魚 Sian Yi
 * @dateTime: 2016-07-07 10:49:58
 * @description: ImportFile 這是匯入CSV 共用library
 */

class ImportFile {
    /**
     * 處理上傳到後端的CSV檔, 讀取檔案 回傳content的陣列: 欄位&每一筆資料&資料筆數
     * @param string $uploadParam $_FILES的預設名
     *
     * @return array $content['field'] 資料欄位
     *               $content['data_array'] 每一筆資料
     *               $content['data_count'] 資料筆數
     */
    public function Upload_ckeck_CSV_file($uploadParam = '') {
        $file = $_FILES[$uploadParam]['name'];
        $tmp = $_FILES[$uploadParam]['tmp_name'];
        $extension = strtolower(pathinfo($file, PATHINFO_EXTENSION));
        if ($extension != 'csv') {
            $this->Error_msg('只支援副檔名為CSV' ,false);
        }

        $content = [];
        $csv_file = fopen($tmp, "r");
        //若內容還沒結尾，就會一直讀內容
        while (!feof($csv_file)) {
            $row = fgetcsv($csv_file);
            $content[] = $row;
        }

        fclose($csv_file);
        $content = trim(file_get_contents($tmp));
        $content = trim(mb_convert_encoding($content, "UTF-8", "BIG5"));
        $content = str_replace('"', '', $content);
        $content = explode("\r\n", $content);

        $content2 = [];
        for ($row=0; $row <count($content) ; $row++) {
            if($row == 0){
                $content2['field'] = explode(",", $content[$row]);
            }else{
                $content2['data_array'][$row-1] = explode(",", $content[$row]);
            }
        }

        $content2['data_count'] =  count($content2['data_array']);
        return $content2;
    }

    /**
     * 取得 DataField_array, 以CSV資料的欄位當每個子陣列的Key ,子陣列內是每一筆資料
     * @param array $CSV_dataField  DB庫的欄位名稱 => CSV的中文欄位名稱
     * @param array $data_array     每一筆完整的資料row
     * @param array $csv_field      CSV的中文欄位名稱,可以不填,(檢查欄位是否正確)
     *
     * @return array $dataField_array
     */
    public function Get_DataField_array( array $CSV_dataField = []
                                        ,array $data_array = []
                                        ,array $csv_field = [] ){
        $dataField_array = [];
        $field_i=0;
        foreach ($CSV_dataField as $DB_field => $CSV_field) {
            if($csv_field != []){
                if(strcmp($CSV_field,$csv_field[$field_i]) != 0){
                    $this->Error_msg("資料表配對CSV欄位 格式或順序錯誤.\n[預設欄位]: $CSV_field ,[csv欄位]: " . $csv_field[$field_i] ,false);
                }
            }

            foreach ($data_array as $data_i => $data) {
                $dataField_array[$DB_field][$data_i] = $data[$field_i];
            }
            $field_i++;
        }

        return $dataField_array;
    }

    /**
     * 用來驗證 $dataField_array 的每一筆資料是否正確 ,(不能檢測資料是否為空NULL,但可以擴充),
     * 如有錯誤就直接跳出,把所有的錯都顯示出來,以一筆完整row的方式顯示
     * @param array  $dataField_array
     * @param array  $feild_verify    DB欄位名稱 => 正規表示式
     * @param array  $msg             顯示的錯誤訊息
     * @param int    $data_count      資料筆數
     *
     * @return Error_msg($outputMessage ,false);    (錯誤版)
     * @return bool true                            (正確版)
     */
    public function Check_dataFeild_verify( array $dataField_array = []
                                           ,array $feild_verify = []
                                           ,array $msg = []
                                           ,$data_count ){
        $Message = '';
        $outputMessage = [];
        $error = 0;
        $msg_i = 0;
        for ($row=1; $row <= $data_count ; $row++) {
            foreach ($feild_verify as $feild => $regular_exp) {
                $data = $dataField_array[$feild][$row-1];

                if(!@preg_match($regular_exp ,$data)){
                    if(!$error)
                        $Message .= "[$row]格式錯誤: ";
                    else
                        $Message .= ", ";
                    $Message .= "$data " . $msg[$msg_i];
                    $error = 1;
                }
                $msg_i++;
            }
            $msg_i = 0;

            if($error) {
                array_push($outputMessage , $Message);
                $Message = '';
                $error = 0;
            }
        }

        if($outputMessage != [])
            $this->Error_msg($outputMessage ,false);
        else
            return true;
    }

    /**
     * 回傳前端的 錯誤result結果
     * @param string $msg           錯誤訊息
     * @param bool $is_dbRollback   是否要dbRollback();
     */
    public function Error_msg($msg = '' , $is_dbRollback){
        if($is_dbRollback) {
            dbRollback();
        }
        $result['success'] = false;
        $result['msg'] = $msg;

        echo json_encode($result);
        exit();
    }

    /***********user_no 與 user_check_no 預設函式****************/

    // 會員編號
    public function randomUserNo(){
        $date = date("Ym");
        $num = rand(1, 9999);//隨機
        $bit = 4;//產生4位數的數字編號
        $num_len = strlen($num); //數字長度
        $zero = '';
        for($i = $num_len; $i < $bit ; $i++){
            $zero .= "0"; //左邊補零
        }
        $real_num = $date.$zero.$num; //2015100123
        return $real_num;
    }

    // 簡訊驗證碼 ,產生4位數的數字編號
    public function randomMsgCode() {
        $num = rand(1, 9999);
        $bit = 4;//產生4位數的數字編號
        $num_len = strlen($num);
        $zero = '';
        for($i = $num_len; $i < $bit ; $i++){
            $zero .= "0";
        }
        $real_num = $zero.$num; //0123
        return $real_num;
    }
}
?>
