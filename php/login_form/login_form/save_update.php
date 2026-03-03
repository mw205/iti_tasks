<?php
// save_update.php

// 1. Get the username of the user we want to update
$username_to_update = $_POST['username'];

// 2. Read the file into an array of lines
$file = file("db.txt");

// 3. Loop through each line to find the correct user
foreach ($file as $key => $row) {
    // Split the current row into an array of its parts
    $userData = explode(",", $row);
    
    // Check if the username (index 6) matches the one we want to update
    if (isset($userData[6]) && trim($userData[6]) == trim($username_to_update)) {
        // 4. Get the new values from the form
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

        // 5. IMPORTANT: Remove commas from data so it doesn't break our CSV file
        $firstName = str_replace(",", " ", $firstName);
        $lastName = str_replace(",", " ", $lastName);
        $address = str_replace(",", " ", $address);
        // We shouldn't change the username here, as it's our "key"

        // 6. Create the updated comma-separated row
        $updatedRow = $firstName . "," . $lastName . "," . $country . "," . $address . "," . $gender . "," . $skills . "," . $username_to_update . "," . $department . "\n";
        
        // 7. Update the array at the current position
        $file[$key] = $updatedRow;
        break; // Stop looking after we find and update the user
    }
}

// 8. Write the whole updated list back to the file
file_put_contents("db.txt", implode("", $file));

// 9. Go back to the list page
header("Location:list.php");
?>
