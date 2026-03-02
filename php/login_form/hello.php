<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Greeting</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

</head>

<body>
    <?php

    $nickname = $_POST['gender'] == "male" ? "Mr" : "Mrs";
    $skills = "";
    if (isset($_POST['skills'])) {
        $skills = $_POST['skills'];
    }


    echo
    "<p>Thanks $nickname {$_POST['firstName']} {$_POST['lastName']}";

    echo "<p>Please Review Your Information:</p>";
    echo "<p>Name: " . $_POST['firstName'] . " " . $_POST['lastName'] . "</p>";
    echo "<p>Address: " . $_POST['address'] . "</p>";
    if ($skills != "") {
        echo "<p>Skills: ...<br>";
        foreach ($skills as $skill) {
            echo $skill . "<br>";
        }

        echo "</p>";
    }
    echo "<p>Department: " . $_POST['department'] . "</p>";



    ?>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

</body>

</html>