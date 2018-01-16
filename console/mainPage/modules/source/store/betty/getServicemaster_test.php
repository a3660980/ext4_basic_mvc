<?php
require "../../../../../init.php";//引用init.php

// $sysConnDebug = true;

// result defination
$result = [];
$sql = [];
// 宣告資料儲存陣列
$table = 'joinme_gas_brand';
// 要用的資料表
$whereClause = '1=1';
// 條件永遠成立

$searchColumn = [
    'brand_name'
       // 所要搜尋的欄位名稱
];


$searchValue = isset($_GET['searchValue']) ? trim($_GET['searchValue']) : null;
//取搜尋框中要搜尋的值
//結果= ( 條件) ? "條件為真":"條件為假";判斷變數是否存在?"清除空白":"空值";
$whereClause = get_where_clause_with_live_search($whereClause, $searchColumn, $searchValue);
//$searchColumn like $searchValue搜尋,get_where_clause_with_live_search自己定義的函數
$limit = isset($_POST['limit']) ? trim($_POST['limit']) : 0;
$start = isset($_POST['start']) ? trim($_POST['start']) : 0;
$getTotalSql = "SELECT COUNT(*) FROM {$table} where {$whereClause}";

$sql="SELECT * FROM {$table} where {$whereClause} LIMIT {$start}, {$limit} ";

// 根據whereClase輸入的值來搜尋整個資料表


$records = dbGetAll($sql);//dbgetall 回傳資料使用陣列格式
$total = dbGetTotal($records);//dbGetTotal回傳總數 不受limit影響
// output result
$result['total'] = $total;//全部的資料
$result['result'] = $records;

echo json_encode($result);
// 輸出搜尋結果
$sysConn = null;