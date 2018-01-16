<?php
/**
 * SharedLibrary 共用library
 *
 * @author Shane Yi <scps950613@gmail.com>
 * @date 2016-12-16 11:23:34
 */
class SharedLibrary
{
    const NODATA = '沒有資料。';

    const SQL_FAILS = '資料有錯誤，請確認！';
    const SQL_FAILS_PK_REPEAT = ' 已重複，請確認！';

    const SUCCESS_ADD = '新增成功。';
    const SUCCESS_DELETE = '刪除成功。';
    const SUCCESS_EDIT = '修改成功。';

    /**
     * 檢查$_POST資料是否存在，再把空白的都濾掉，不存在內容就是NULL
     *
     * @param array $msg_dataField $_POST的資料名稱
     * @return array $result 回傳['data'] 為全部的資料陣列
     *                       回傳['data_empty'] 為資料內容是 空的或NULL 的資料名稱
     *                       回傳['data_exist'] 為已去掉內容不為空或NULL的資料陣列
     */
    public function ckeckPostData(array $msg_dataField)
    {
        $result = array();
        $result['data'] = array();
        $result['data_empty'] = array();
        $result['data_exist'] = array();

        foreach ($msg_dataField as $value) {
            $result['data'][$value] = isset($_POST[$value]) ? trim($_POST[$value]) : null;

            if (empty($result['data'][$value])) {
                array_push($result['data_empty'], $value);
            } else {
                $result['data_exist'][$value] = $result['data'][$value];
            }
        }
        return $result;
    }

    /**
     * 回傳前端的錯誤result結果 ,可判斷是否有錯誤, 如果$is_success是true就return;
     *
     * @param string $msg        錯誤訊息
     * @param bool $is_success   判斷是否錯誤,有dbRollback()的機制;
     */
    public function errorMsg($msg = '', $is_success = null)
    {
        if (isset($is_success)) {
            if ($is_success == true) {
                return;
            } else {
                try {
                    dbRollback();
                } catch (PDOException $e) {
                    throw new Exception("Error : 沒有使用dbBegin()就請勿寫入第2個參數!\n");
                }
            }
        }
        $result = array();
        $result['success'] = false;
        $result['msg'] = $msg;

        echo json_encode($result);
        exit();
    }
}
