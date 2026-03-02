<?php
$username = $_POST['username'];
$file = file("db.txt");
$userRow;
$userRowIndex;
foreach ($file as $key => $row) {

    if ($row[6] === $username) {
        $userRowIndex = $key;
        $userRow = $row;
        break;
    }
}
$userRow = explode(",", $userRow);

$userRow[0] = $_POST['firstName'];
$userRow[1] = $_POST['lastName'];
$userRow[2] = $_POST['country'];
$userRow[3] = $_POST['address'];
$userRow[4] = $_POST['gender'];
$userRow[5] = implode('-', $_POST['skills']);
$userRow[6] = $_POST['username'];
$userRow[7] = $_POST['department'];


$userRow = implode(",", $userRow);
$file[$userRowIndex] = $userRow;
file_put_contents("db.txt", implode("\n", $file));
header("Location:list.php");
