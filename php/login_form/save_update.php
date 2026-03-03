<?php

$username_to_update = $_POST['username'];

$file = file("db.txt");

foreach ($file as $key => $row) {
    $userData = explode(",", $row);
    if (isset($userData[6]) && trim($userData[6]) == trim($username_to_update)) {
        $firstName = $_POST['firstName'];
        $lastName = $_POST['lastName'];
        $country = $_POST['country'];
        $address = $_POST['address'];
        $gender = $_POST['gender'];

        $skills = "";
        if (isset($_POST['skills'])) {
            $skills = implode("-", $_POST['skills']);
        }

        $department = $_POST['department'];

        $firstName = str_replace(",", " ", $firstName);
        $lastName = str_replace(",", " ", $lastName);
        $address = str_replace(",", " ", $address);
        $updatedRow = $firstName . "," . $lastName . "," . $country . "," . $address . "," . $gender . "," . $skills . "," . $username_to_update . "," . $department . "\n";
        $file[$key] = $updatedRow;
        break;
    }
}

file_put_contents("db.txt", implode("", $file));

header("Location:list.php");
