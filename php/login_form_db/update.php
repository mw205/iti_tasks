<?php
require("controller.php");
$user = getUser($_GET['user_id']);
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Update User</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
</head>

<body>
    <div class="container mt-5">
        <h2>Update User Information</h2>
        <form action="controller.php" method="get">
            <input type="hidden" name="action" value="update">
            <input type="hidden" name="user_data[id]" value="<?php echo $user['id'] ?>">
            <div class="mb-3">
                <label for="FirstName" class="form-label">First Name</label>
                <input id="FirstName" class="form-control" type="text" name="user_data[f_name]" value="<?php echo htmlspecialchars($user['f_name'] ?? '') ?>">
            </div>
            <div class="mb-3">
                <label class="form-label" for="LastName">Last Name</label>
                <input id="LastName" class="form-control" type="text" name="user_data[l_name]" value="<?php echo htmlspecialchars($user['l_name'] ?? '') ?>">
            </div>
            <div class="mb-3">
                <label class="form-label" for="country">Country</label>
                <select class="form-select" name="user_data[country]" id="country">
                    <?php
                    $countries = ['Egypt', 'USA', 'UK'];
                    $selectedCountry = $user['country'] ?? '';
                    foreach ($countries as $c) {
                        $selected = ($selectedCountry == $c) ? 'selected' : '';
                        echo "<option value='$c' $selected>$c</option>";
                    }
                    ?>
                </select>
            </div>
            <div class="mb-3">
                <label class="form-label" for="address">Address</label>
                <textarea class="form-control" name="user_data[address]" id="address"><?php echo htmlspecialchars($user['address'] ?? '') ?></textarea>
            </div>
            <div class="mb-3">
                <label class="form-label">Gender</label>
                <?php $gender = $user['gender'] ?? ''; ?>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="user_data[gender]" value="male" id="gender_male" <?php echo ($gender == 'male') ? 'checked' : '' ?>>
                    <label class="form-check-label" for="gender_male">Male</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="user_data[gender]" value="female" id="gender_female" <?php echo ($gender == 'female') ? 'checked' : '' ?>>
                    <label class="form-check-label" for="gender_female">Female</label>
                </div>
            </div>
            <div class="mb-3">
                <label class="form-label">Skills</label>
                <?php
                $skills = isset($user['skills']) ? explode('-', $user['skills']) : [];
                $availableSkills = ['html' => 'HTML', 'css' => 'CSS', 'php' => 'PHP'];
                foreach ($availableSkills as $val => $label) {
                    $checked = in_array($val, $skills) ? 'checked' : '';
                    echo "
                    <div class='form-check form-check-inline'>
                        <input class='form-check-input' type='checkbox' name='user_data[skills][]' value='$val' id='$val' $checked>
                        <label class='form-check-label' for='$val'>$label</label>
                    </div>";
                }
                ?>
            </div>
            <div class="mb-3" hidden>
                <label class="form-label" for="username">Username</label>
                <input class="form-control" type="text" name="user_data[username]" id="username" value="<?php echo htmlspecialchars($user['username'] ?? '') ?>">
            </div>
            <div class="mb-3">
                <label class="form-label" for="department">Department</label>
                <input class="form-control" type="text" name="user_data[department]" id="department" value="<?php echo htmlspecialchars($user['department'] ?? 'OpenSource') ?>" readonly>
            </div>

            <div class="mb-5">
                <button type="submit" class="btn btn-primary">Update</button>
                <a href="list.php" class="btn btn-secondary">Cancel</a>
            </div>
        </form>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
</body>

</html>