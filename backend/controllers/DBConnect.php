<?php 
//API DB interactions
require "../config/pdo.php"; 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json"); 

$method = $_SERVER["REQUEST_METHOD"]; 

switch ($method) {
    case "POST": 
    $data_json = file_get_contents("php://input");
    $data = json_decode(($data_raw)); 
    if ($data) {
        $sql="INSERT INTO users(fname) VALUES(:fname)"; 
        $stmt = $conn->prepare($sql);    
        echo (($stmt->execute([":fname"=>$data->name])) ? "data inserted successfuly" : "error");
    }
    case "GET": 
        $sql="SELECT * from users"; 
        $stmt = $conn->prepare($sql); 
        $stmt->execute(); 
        $data = $stmt->fetchAll((PDO::FETCH_OBJ)); 
        $data_json = json_encode($data_raw); 
        echo $data; 
}
