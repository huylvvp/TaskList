<?php
include 'DBConfig.php';
$conn = mysqli_connect($HostName, $HostUser, $HostPass,$DatabaseName);
$json = file_get_contents('php://input');
$obj = json_decode($json,true);
$user_name = $obj['user_name'];
$password = $obj['password'];
$Sql_Query = "select * from userlist where user_name = '$user_name' and password = '$password'";
$check = mysqli_fetch_array(mysqli_query($conn,$Sql_Query));
if (isset($check)) {
    $SuccessLoginMsg = "Data Matched";
    $SuccessLoginJson = json_encode($SuccessLoginMsg);
    echo $SuccessLoginJson;
} else {
    $InvalidMSG = "Invalid Username or Password Please Try Again";
    $InvalidMSGJson = json_encode($InvalidMSG);
    echo $InvalidMSGJson;
}
mysqli_close($conn);
?>

