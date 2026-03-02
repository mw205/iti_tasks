<?php

$username = $_GET['username'];

$file = file("db.txt");
$userRow;
$userRowIndex;
foreach ($file as $key => $row) {
    foreach ($file as $key => $row) {
        $userData = explode(",", $row);
        if (isset($userData[6]) && $userData[6] === $username) {
            unset($file[$key]);
            break;
        }
    }
}
file_put_contents("db.txt", implode($file . join("\n")));
header("Location:list.php");
