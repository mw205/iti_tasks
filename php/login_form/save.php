<?php
// save.php

$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];
$country = $_POST['country'];
$address = $_POST['address'];
$gender = $_POST['gender'];

$skills = "";
if (isset($_POST['skills'])) {
    $skills = implode("-", $_POST['skills']);
}

$username = $_POST['username'];
$department = $_POST['department'];

$firstName = str_replace(",", " ", $firstName);
$lastName = str_replace(",", " ", $lastName);
$address = str_replace(",", " ", $address);
$username = str_replace(",", " ", $username);

$row = $firstName . "," . $lastName . "," . $country . "," . $address . "," . $gender . "," . $skills . "," . $username . "," . $department . "\n";

file_put_contents("db.txt", $row, FILE_APPEND);

header("Location:list.php");
