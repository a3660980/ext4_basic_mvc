<?php
	$sysConn = null;
	$sysConnDebug = false;

	$db_connection = null;

	$db_host		= SYS_DBHOST;
	$db_port		= SYS_DBPORT;
	$db_name		= SYS_DBNAME;
	$db_username	= SYS_DBACCOUNT;
	$db_password	= SYS_DBPASSWD;
	$db_option		= null;

	if( SYS_DBTYPE == "mysql" )
	{
		$db_connection = "mysql:host={$db_host};port={$db_port};dbname={$db_name}";
		$db_options = array(
		    PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
		);
	}
	else if( SYS_DBTYPE == "mssql" )
	{
		$db_connection = "sqlsrv:Server={$db_host},{$db_port};Database={$db_name}";
	}
	else if( SYS_DBTYPE == "oci8" )
	{
		$db_connection = "oci:dbname=//{$db_host}:{$db_port}/{$db_name}";
	}

	try {
		if( empty( $db_option ) )
		{
			$sysConn = new PDO($db_connection, $db_username, $db_password);
		}
		else
		{
			$sysConn = new PDO($db_connection, $db_username, $db_password, $db_option);
		}

	} catch( PDOException $e ) {
		echo  "Database connect fail: " . ( $e -> getMessage() );
	}

	if (is_object($sysConn)) {
		$sysConn->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
	} else {
		exit;
	}
	if( SYS_DBTYPE == "mysql" ) {
		$sysConn->setAttribute(PDO::ATTR_EMULATE_PREPARES,false);
	}
	
	function _initExec()
	{
		global $sysConn;

		if( SYS_DBTYPE == "mysql" )
		{
			$sql = "SET NAMES utf8";
			$sysConn->exec($sql);
			// debugOutput($sql, $sysConn, true);
		}
		else if( SYS_DBTYPE == "mssql" )
		{

		}
		else if( SYS_DBTYPE == "oci8" )
		{

		}
	}

	function _pdoStatement( $sql, $fetchMode )
	{
		global $sysConn;

		_initExec();
		try
		{
            //debugOutput( $sql, null, true);
			$rs = $sysConn->query($sql);
			// 執行SQL語句，將結果集返回
			debugOutput($sql, $sysConn, $rs);
			$rs->setFetchMode($fetchMode);
			// setFetchMode為語句設置默認的獲取模式
		}
		catch( PDOException $e )
		{
			debugOutputException($sql, $e);
			error_log("file ".$_SERVER['PHP_SELF']." ".json_encode($e));
			//向定義的錯誤處理例程發送錯誤消息				返回值的JSON表示形式 
			return false;
		}

		return $rs;
	}

	function _insertUpdatePrepare( $queryType, $table, $arrField, $whereClause='')
	{
		global $sysConn;


		if( empty($arrField) )
		{
			return false;
		}

		$sql = null;

		$array_table_column = array_keys($arrField);
		// 取得陣列中的健值
		$array_column_value	= array();

        if (SYS_DBTYPE == 'mssql' && $queryType == 'MSSQL_INSERT') {
            $sql = "INSERT INTO {$table} (" .implode(',', $array_table_column) .")  VALUES (";
            		//implode將字串加入陣列
            for ($i = 0; $i < count($arrField); $i++) {
                $value = $arrField[$array_table_column[$i]];
                $row = is_array($value) ? $value['value'] : $sysConn->quote($value);

                if ($i == 0) {
                    $sql .= $row;
                    continue;
                }
                $sql .= "," .$row;
            }
            $sql .= ")";

            return dbExecute($sql);
        } else if (SYS_DBTYPE == 'mssql' && $queryType == 'MSSQL_UPDATE') {
            $sql = "UPDATE {$table} SET ";

            for ($i = 0; $i < count($arrField); $i++) {
                $value = $arrField[$array_table_column[$i]];
                $row = is_array($value) ? $value['value'] : $sysConn->quote($value);

                if ($i == 0) {
                    $sql .= $array_table_column[$i] ."=" .$row ."";
                    continue;
                }
                $sql .= "," .$array_table_column[$i] ."=" .$row ."";
            }
            $sql .= " WHERE {$whereClause}";

            return dbExecute($sql);
        }

		$stmt = null;
		if( $queryType == "INSERT" )
		{
			$column	= $array_table_column[0];
			$value	= "?";

			for( $i = 0; $i < count($array_table_column); $i++ )
			{
				$array_column_value[$i] = $arrField[$array_table_column[$i]];

				if( $i != 0 )
				{
					$column	.= "," . $array_table_column[$i];
					$value	.= ", ?";
				}
			}
			_initExec();
			// 避免中文變亂碼
			$sql = "INSERT INTO {$table} ({$column}) VALUES ({$value})";
			$stmt = $sysConn->prepare($sql);
		}
		else if( $queryType == "UPDATE" )
		{
			$set = $array_table_column[0] . "=?";

			for( $i = 0; $i < count($array_table_column); $i++ )
			{
				$array_column_value[$i] = $arrField[$array_table_column[$i]];
				if( $i != 0 )
				{
					$set .= ", " . $array_table_column[$i] . "=?";
				}
			}
			_initExec();

			if (is_array($whereClause)) {
				$index = 0;
				$where_set = '';
				foreach($whereClause as $key => $value)
				{
					$array_column_value[] = $value;
					if ($index != 0 ){
						$where_set = $where_set . ' AND ';
					}
					
					$where_set .= $key . "=?";
					$index++;
				}
				
				$sql = "UPDATE {$table} SET {$set} WHERE {$where_set}";
			} else {			
				$sql = "UPDATE {$table} SET {$set} WHERE {$whereClause}";
			}

			$stmt = $sysConn->prepare($sql);
		}

		try
		{
			$result =  $stmt->execute($array_column_value);
			// debugOutput($sql, $stmt, $result, true, $array_column_value);
		}
		catch(PDOException $e)
		// 代表PDO提出錯誤
		{
		    if (function_exists('logMessage')) {
		    	//function_exists:檢查函數是否已定義。;logMessage:日誌
			    logMessage('[dbExecute] Exception: ' . $e->getMessage());
			}
			return false;
		}

		return $result;
	}

	function dbGetOne( $sql, $fetchMode=PDO::FETCH_NUM )
	{
		$sql = $sql . " LIMIT 1";
		$rs = _pdoStatement($sql, $fetchMode);

		if( !$rs )
		{
			return false;
		}

		return $rs->fetchColumn();
	}

	function dbGetCol( $sql, $fetchMode=PDO::FETCH_NUM )
	{
		$rs = _pdoStatement($sql, $fetchMode);

		if( !$rs )
		{
			return false;
		}

		return $rs->fetchAll(PDO::FETCH_COLUMN, 0);
	}

	function dbGetRow( $sql, $fetchMode=PDO::FETCH_ASSOC )
	{
		$rs = _pdoStatement($sql, $fetchMode);

		if( !$rs )
		{
			return false;
		}

		return $rs->fetch($fetchMode);
	}

	function dbGetAll( $sql, $fetchMode=PDO::FETCH_ASSOC )
	// PDO::FETCH_ASSOC返回一個由列名索引的陣列，表示結果集中的行
	{
		$result = false;
		$rs = _pdoStatement($sql, $fetchMode);

		if($rs !== false){
			try{
				if (is_object($rs)){
					// 查找變量是否是一個對象
					$result = $rs->fetchAll();
					// 返回一個包含所有結果集行的陣列
				} else {
					error_log("sql error: " . $sql);
					// 向定義的錯誤處理例程發送錯誤消息
				}
			} catch (Exception $e )
			// Exception異常
			{
				error_log($e);
				//向定義的錯誤處理例程發送錯誤消息
			}
		}
		
		//error_log($sql);
		return $result;
	}

	function dbSelectLimit( $sql, $count=10, $start=0, $fetchMode=PDO::FETCH_ASSOC )
	{
		$rs = _pdoStatement($sql, $fetchMode);
		$data = $rs->fetchAll();
		$data_limit = array();
		for( $i = $start, $j = 0; $i < $start + $count; $i++, $j++ )
		{
			$data_limit[$j] = $data[$i];
		}
		return $data_limit;
	}

	function dbInsert( $table, $arrField, $dbType="" )
	{
        $dbType = $dbType == "" ? "INSERT" : $dbType;
		return _insertUpdatePrepare($dbType, $table, $arrField);
	}

	function dbUpdate( $table, $arrField, $whereClause, $dbType="" )
	{
        $dbType = $dbType == "" ? "UPDATE" : $dbType;
		return _insertUpdatePrepare($dbType, $table, $arrField, $whereClause);
	}

	function dbDelete( $table, $whereClause )
	{
		$sql['delete'] = array(
			'mysql'	=>	"DELETE FROM {$table} WHERE {$whereClause}",
			'mssql'	=>	"DELETE FROM {$table} WHERE {$whereClause}",
			'oci8'	=>	"DELETE FROM {$table} WHERE {$whereClause}"
		);

		return dbExecute($sql['delete'][SYS_DBTYPE]);
	}

	// for insert, update with affected row number count
	function dbExecute( $sql )
	{
		global $sysConn;

		_initExec();
		$result = false;
		try
		{
			$affectedRow = $sysConn->exec($sql);
			if( 0 == $affectedRow )
			{
				$result = 0;
			}
			else if( $affectedRow > 0 )
			{
				$result = true;
			else {
				$result = false;
			}			}

			debugOutput($sql, $sysConn, $result);
		}
		catch(PDOException $e)
		{
		    if (function_exists('logMessage')) {
			    logMessage('[dbExecute] Exception: ' . $e->getMessage());
			}
			debugOutputException($sql, $e);
			return false;
		}

		return $result;
	}

	// for select with pdo statement class(result set)
	function dbQuery( $sql, $fetchMode=PDO::FETCH_ASSOC )
	{
		return _pdoStatement($sql, $fetchMode);
	}
	// begin transaction
	function dbBegin() {
		global $sysConn;

		$sysConn->beginTransaction();
	}

	// rollback transaction
	function dbRollback() {
		global $sysConn;

		$sysConn->rollBack();
	}

	// commit transaction
	function dbCommit() {
		global $sysConn;

		$sysConn->commit();
	}

	// 判斷交易中的sql語法執行結果
	function dbCheckTransaction($resultArray) {
		$success = true;
		foreach ($resultArray as $index => $result) {
			if (false === $result) {
				$success = false;
				break;
			}
		}

		return $success;
	}

    // get total
    function dbGetTotal($records='') {
        global $sysConn;

        if (SYS_DBTYPE == 'mysql') {
            return $sysConn->query('SELECT FOUND_ROWS();')->fetch(PDO::FETCH_COLUMN);
        } else if (SYS_DBTYPE == 'mssql') {
            if (count($records) == 0) return 0;
            return $records[0]['total'];
        } else if (SYS_DBTYPE == 'oci8') {
            if (count($records) == 0) return 0;
            return $records[0]['total'];
        }
    }

	function debugOutput( $sql, $pdoExecObj, $isExecSqlCorrect, $isAffectedRowStmt=false, $stmtArrayValue=array() )
	{
		global $sysConnDebug;
		if( $sysConnDebug )
		{
			echo "<hr>";
			echo "(" . SYS_DBTYPE . "): {$sql}";
			if( $isAffectedRowStmt )
			{
				for( $i = 0; $i < count( $stmtArrayValue ); $i++ )
				{
					echo "<br />value[$i]: " . $stmtArrayValue[$i];
				}
			}
			if( !$isExecSqlCorrect )
			{
				$errorInfo = $pdoExecObj->errorInfo();
				echo "<br />";
				echo "<pre>";
				echo "<b>SQLSTATE error code:</b> " . $errorInfo[0];
				echo "<br />";
				echo "<b>" . SYS_DBTYPE . " error code:</b> " . $errorInfo[1];
				echo "<br />";
				echo "<b>Error message:</b> " . $errorInfo[2];
				echo "</pre>";
			}
			echo "<hr>";
		}
	}

	function debugOutputException( $sql, $exceptionObj, $isAffectedRowStmt=false, $stmtArrayValue=array() )
	{
		global $sysConnDebug;
		if( $sysConnDebug )
		{
			echo "<hr>";
			echo "(" . SYS_DBTYPE . "): {$sql}";
			echo "<br />";
			if( $isAffectedRowStmt )
			{
				for( $i = 0; $i < count( $stmtArrayValue ); $i++ )
				{
					echo "value[$i]: " . $stmtArrayValue[$i] . "<br />";
				}
			}
			echo "<pre>";
			echo $exceptionObj->getMessage();
			echo "</pre>";
			echo "<hr>";
		}
	}
	
	function dbSelectRow($table, $column, $arrField)
    {
        global $sysConn;

        $result = array();
        $execute_result = false;

        $column = implode(",", $column);

        $where = "";
        $array_column_value = array();
        foreach ($arrField as $key => $value) {
            if (!empty($where)) {
                $where .= " AND ";
            }

            $where .= "{$key} = ?";
            $array_column_value[] = $value;
        }

        $sql = "SELECT {$column} FROM " . $table
            . " WHERE {$where}";
        //請 db server 預先處理該 sql script
        $statement = $sysConn->prepare($sql);
        //執行sql script，並將參數帶入
        try
        {
            $execute_result = $statement->execute($array_column_value);
            debugOutput($sql, $sysConn, $execute_result, true, $array_column_value);
        }
        catch(PDOException $e)
        {
			if (function_exists('logMessage')) {
				logMessage('[doQuery] execute failed. sql: ' . $sql);
				logMessage('[doQuery] execute failed. ' . $e -> getMessage());
			}
            debugOutputException($sql, $e);
            $result = $e -> getMessage();
        }

        if (true === $execute_result) {
            if ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
                $result = $row;
            }
        }

        return $result;
    }
	
	function dbSelectAll($table, $column, $arrField)
    {
        global $sysConn;

        $result = array();
        $execute_result = false;

        $column = implode(",", $column);

        $where = "";
        $array_column_value = array();
        foreach ($arrField as $key => $value) {
            if (!empty($where)) {
                $where .= " AND ";
            }

            $where .= "{$key} = ?";
            $array_column_value[] = $value;
        }

        $sql = "SELECT {$column} FROM " . $table
            . " WHERE {$where}";
        //請 db server 預先處理該 sql script
        $statement = $sysConn->prepare($sql);
        //執行sql script，並將參數帶入
        try
        {
            $execute_result = $statement->execute($array_column_value);
            debugOutput($sql, $sysConn, $execute_result, true, $array_column_value);
        }
        catch(PDOException $e)
        {
			if (function_exists('logMessage')) {
				logMessage('[doQuery] execute failed. sql: ' . $sql);
				logMessage('[doQuery] execute failed. ' . $e -> getMessage());
			}
            debugOutputException($sql, $e);
            $result = $e -> getMessage();
        }

        if (true === $execute_result) {
            while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
                $result[] = $row;
            }
        }

        return $result;
    }

    //關閉PDO連線
    function closeConn()
	{
	 	global $sysConn;   
		$sysConn = null;
	}

	register_shutdown_function('closeConn');
?>