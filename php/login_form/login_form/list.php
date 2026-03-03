<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User List</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>

<body>
    <div class="container-fluid mt-5">
        <h2 class="mb-4">User List</h2>
        <?php
        ini_set('display_errors', 1);
        error_reporting(E_ALL);

        $file_path = "db.txt";
        if (file_exists($file_path)) {
            $file = file($file_path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

            echo "<table class='table table-striped table-hover table-bordered'>
            <thead class='table-dark'>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Country</th>
                <th>Address</th>
                <th>Gender</th>
                <th>Skills</th>
                <th>Username</th>
                <th>Department</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>";

            foreach ($file as $result) {
                echo "<tr>";
                $userData = explode(",", $result);
                $userData = array_pad($userData, 8, '');

                foreach ($userData as $userDatum) {
                    echo "<td>" . htmlspecialchars($userDatum) . "</td>";
                }

                $firstName = urlencode($userData[0]);
                $lastName = urlencode($userData[1]);
                $country = urlencode($userData[2]);
                $address = urlencode($userData[3]);
                $gender = urlencode($userData[4]);
                $skills = urlencode($userData[5]);
                $username = urlencode($userData[6]);
                $department = urlencode($userData[7]);

                echo "<td>
                        <div class='btn-group' role='group'>
                            <a href='delete.php?username=" . $username . "' class='btn btn-danger' onclick='return confirm(\"Are you sure?\")'>
                                <i class='fa-solid fa-trash'></i>
                            </a>
                            <a href='update.php?firstName=$firstName&lastName=$lastName&country=$country&address=$address&gender=$gender&skills=$skills&username=$username&department=$department' class='btn btn-warning'>
                                <i class='fa-solid fa-pen-to-square'></i>
                            </a>
                            <form action='hello.php' method='post' style='display: inline;'>
                                <input type='hidden' name='firstName' value='" . htmlspecialchars($userData[0]) . "'>
                                <input type='hidden' name='lastName' value='" . htmlspecialchars($userData[1]) . "'>
                                <input type='hidden' name='address' value='" . htmlspecialchars($userData[3]) . "'>
                                <input type='hidden' name='gender' value='" . htmlspecialchars($userData[4]) . "'>
                                <input type='hidden' name='department' value='" . htmlspecialchars($userData[7]) . "'>";
                if ($userData[5]) {
                    foreach (explode('-', $userData[5]) as $skill) {
                        echo "<input type='hidden' name='skills[]' value='" . htmlspecialchars($skill) . "'>";
                    }
                }
                echo "          <button type='submit' class='btn btn-success'> <i class='fa-solid fa-eye'></i></button>
                            </form>
                        </div>
                    </td>";
                echo "</tr>";
            }
            echo "</tbody></table>";
        } else {
            echo "<div class='alert alert-info'>No data found.</div>";
        }
        ?>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
</body>

</html>