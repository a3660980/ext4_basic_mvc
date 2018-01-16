<?php 
$table_name="profile_ant";

$sql = "SELECT columns FROM $table_name WHERE 條件=?";

$sql = "INSERT INTO table_name (columns1, columns2, ...) VALUES (?, ?, ...)";

$sql = "UPDATE table_name SET column = value , column = ? WHERE 條件=?";

$sql = "DELETE FROM table_name WHERE 條件=?";

try
{
    $statement = $sysConn->prepare($sql);
    $data = array();//?的值
    $execute_result = $statement->execute($data);
}
catch(PDOException $e)
	//PDOException代表一個由PDO產生的錯誤
{   
    $execute_result = false;
}
//如果是新增修改刪除 $execute_result = true 就是執行成功
if (true === $execute_result) {
    //取得資料
    $records = $statement->fetchAll(PDO::FETCH_ASSOC);
    // fetchAll:返回一个包含结果集中所有行的数组
    // FETCH_ASSOC:從結果中取得一行作為關聯陣列
}

//關閉連線
$statement = null;
?>