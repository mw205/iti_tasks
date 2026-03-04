<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Greeting</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

</head>

<body class="p-3">
    <?php
    require("controller.php");
    $data = getUser($_GET["user_id"]);
    $nickname = $data['gender'] == "male" ? "Mr" : "Mrs";
    $skills = "";
    if (isset($data['skills'])) {
        $skills = explode("-", $data['skills']);
    }


    echo
    "<p>Thanks <strong> $nickname {$data['f_name']} {$data['l_name']}</strong>";

    echo "<p> <strong>Please Review Your Information: </strong></p>";
    echo "<p> <strong> Name</strong>: " . $data['f_name'] . " " . $data['l_name'] . "</p>";
    echo "<p> <strong>Address: </strong> " . $data['address'] . "</p>";
    if ($skills != "") {
        echo "<p> <strong> Skills:</strong> ...<br>";
        foreach ($skills as $skill) {
            echo $skill . "<br>";
        }
        echo "</p>";
    }
    echo "<p><strong> Department: </strong>" . $data['department'] . "</p>";



    ?>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

</body>

</html>