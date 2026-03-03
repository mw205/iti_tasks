<?php
$username_to_delete = $_GET['username'];

$file = file("db.txt");

foreach ($file as $key => $row) {
    $userData = explode(",", $row);

    if (isset($userData[6]) && trim($userData[6]) == trim($username_to_delete)) {
        unset($file[$key]);
        break;
    }
}

file_put_contents("db.txt", implode("", $file));

header("Location:list.php");
