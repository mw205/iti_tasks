<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css" integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</head>

<body>
    <?php
    ini_set('display_errors', 1);
    error_reporting(E_ALL);
    $file = file("db.txt");
    echo "<table class='table table-striped table-hover table-bordered '>

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

    </tr>";

    foreach ($file as $result) {
        echo "<tr>";
        $userData = explode(",", $result);
        foreach ($userData as $userDatum) {
            echo "<td> $userDatum </td>";
        }
        echo "<td>
                <div class='btn-group' role='group' aria-label='Basic mixed styles example'>
                    <button type='button' class='btn btn-danger'>
                    <a 
                    class='link-light'
                    href='delete.php?action=delete&username=$userData[6]'>
                        <i class='fa-solid fa-trash'></i>
                    </a>
                    </button>
                    <button type='button' class='btn btn-warning'>
                    <a
                    class='link-dark'
                    href='update.php?action=update&firstName=$userData[0]&lastName=$userData[1]&country=$userData[2]&address=$userData[3]&gender=$userData[4]&skills=$userData[5]&username=$userData[6]&department=$userData[7]'>
                        <i class='fa-solid fa-pen-to-square'></i>
                    </a>
                    </button>
                    <form action='hello.php' method='post' style='display: inline;'>
                        <input type='hidden' name='firstName' value='$userData[0]'>
                        <input type='hidden' name='lastName' value='$userData[1]'>
                        <input type='hidden' name='address' value='$userData[3]'>
                        <input type='hidden' name='gender' value='$userData[4]'>
                        <input type='hidden' name='department' value='$userData[7]'>";
        if ($userData[5]) {
            foreach (explode('-', $userData[5]) as $skill) {
                echo "<input type='hidden' name='skills[]' value='$skill'>";
            }
        }
        echo "          <button type='submit' class='btn btn-success'> <i class='fa-solid fa-eye'></i></button>
                    </form>
                </div>
            </td>";
        echo "</tr>";
    }
    echo "</table>";
    ?>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

</body>

</html>