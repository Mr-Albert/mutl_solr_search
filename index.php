<?php 




class ColumnHelper
{
	public static function isValidColumn($dataIndx)
	{
		if (preg_match('/^[a-z,A-Z]*$/', $dataIndx))
		{
			return true;
		}
		else
		{
			return false;
		}
	}
}
class FilterHelper
{
	public static function deSerializeFilter($pq_filter)
	{
		$filterObj = json_decode($pq_filter);

		$mode = $filterObj->mode;
		$filters = $filterObj->data;

		$fc = array();
		$param= array();

		foreach ($filters as $filter)
		{
			$dataIndx = $filter->dataIndx;
			if (ColumnHelper::isValidColumn($dataIndx) == false)
			{
				throw new Exception("Invalid column name");
			}
			$text = $filter->value;
			$condition = $filter->condition;

			if ($condition == "contain")
			{
				$fc[] = $dataIndx . " like CONCAT('%', ?, '%')";
				$param[] = $text;
			}
			else if ($condition == "notcontain")
			{
				$fc[] = $dataIndx . " not like CONCAT('%', ?, '%')";
				$param[] = $text;
			}
			else if ($condition == "begin")
			{
				$fc[] = $dataIndx . " like CONCAT( ?, '%')";
				$param[] = $text;
			}
			else if ($condition == "end")
			{
				$fc[] = $dataIndx . " like CONCAT('%', ?)";
				$param[] = $text;
			}
			else if ($condition == "equal")
			{
				$fc[] = $dataIndx . " = ?";
				$param[] = $text;
			}
			else if ($condition == "notequal")
			{
				$fc[] = $dataIndx . " != ?";
				$param[] = $text;
			}
			else if ($condition == "empty")
			{
				$fc[] = "ifnull(" . $dataIndx . ",'')=''";
			}
			else if ($condition == "notempty")
			{
				$fc[] = "ifnull(" . $dataIndx . ",'')!=''";
			}
			else if ($condition == "less")
			{
				$fc[] = $dataIndx . " < ?";
				$param[] = $text;
			}
			else if ($condition == "great")
			{
				$fc[] = $dataIndx . " > ?";
				$param[] = $text;
			}
		}
		$query = "";
		if (sizeof($filters) > 0)
		{
			$query = " where " . join(" ".$mode." ", $fc);
		}

		$ds = new stdClass();
		$ds->query = $query;
		$ds->param = $param;
		return $ds;
	}
}//end of class
















if(isset($_GET["pq_curpage"]) && isset($_GET["pq_rpp"]) || isset($_GET["pq_filter"]) )
{
    $pq_curPage = $_GET["pq_curpage"];
    $pq_rPP=$_GET["pq_rpp"];
    $pq_filter = $_GET["pq_filter"];
    $dsf = FilterHelper::deSerializeFilter($pq_filter);
    $filterQuery = $dsf->query;
    $filterParam = $dsf->param;

    
    /* filtering logic here */
    
    /* paging logic
     * 
     * 
     * we'll use solrcursors (MUST for preformance,especially with solrcloud)
     */
    
    
    
    

    $sb = "current Page:" . $pq_curPage . "RP:" . $pq_rPP . "query:".$filterQuery."Param : ".$filterParam;
    echo $sb;
    echo '<script>';
    echo 'var name = ' . json_encode($name) . ';';
    echo '</script>';
}    
?>