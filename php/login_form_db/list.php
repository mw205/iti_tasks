<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User List</title>
    <link href="https:cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link rel="stylesheet" href="https:cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>

<body>

    <?php
    if (!$_COOKIE['username']) {
        header('Location:login.php');
    }
    echo "<nav class='navbar bg-body-tertiary'>
                <div class='container-fluid'>
                    <h5>
                        Hello, {$_COOKIE['firstName']}
                    </h5>
                </div>
            </nav>";
    ?>
    <div class="container-fluid mt-5">
        <h1 class="mb-4">User List</h1>
        <?php
        require("controller.php");
        ini_set('display_errors', 1);
        error_reporting(E_ALL);
        $users = getUsers();

        if (isset($users)) {

            echo "<table class='table table-striped table-hover table-bordered'>
            <thead class='table-dark'>
            <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Department</th>
                <th>Gender</th>
                <th>Skills</th>
                <th>Country</th>
                <th>Address</th>
                <th>Image</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>";
            foreach ($users as $data) {
                echo "<tr>";
                foreach ($data as $key => $value) {
                    if ($key == 'password') {
                        continue;
                    }
                    if ($key == "img") {
                        echo "<td><img src='$value' height=150 width 200></td>";
                    } else {
                        echo "<td>$value</td>";
                    }
                }
                echo "<td>
                        <div class='btn-group' role='group'>
                                <a href='controller.php?user_id={$data['id']}&username={$data['username']}&action=delete' class='btn btn-danger' onclick='return confirm(\"Are you sure?\")'>
                                    <i class='fa-solid fa-trash'></i>
                                </a>
                                <a href='update.php?user_id={$data['id']}' class='btn btn-warning'>
                                    <i class='fa-solid fa-pen-to-square'></i>
                                </a>
                            ";
                echo
                "<a  class='btn btn-success'
                href='hello.php?user_id={$data['id']}'
                >
                                <i class='fa-solid fa-eye'></i>
                                </a>
                            </form>
                        </div>
                    </td>";
            }
            echo "</tr>";
            echo "</tbody>
            </table>";
        } else {
            echo "<div class='alert alert-info'>No data found.</div>";
        }
        ?>

    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
</body>

</html>