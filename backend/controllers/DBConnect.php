<?php 
//API DB interactions
require "../config/pdo.php"; 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
echo "Hello Backend";

$data_raw = file_get_contents("php://input");
$data = json_decode(($data_raw)); 

if ($data) {
    $sql="INSERT INTO users(fname) VALUES(:fname)"; 
    $stmt = $conn->prepare($sql);    
    echo (($stmt->execute([":fname"=>$data->name])) ? "data inserted successfuly" : "error");
}

