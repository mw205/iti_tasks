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
        <form action="save_update.php" method="post">
            <div class="mb-3">
                <label for="FirstName" class="form-label">First Name</label>
                <input id="FirstName" class="form-control" type="text" name="firstName" value="<?php echo htmlspecialchars($_GET['firstName'] ?? '') ?>">
            </div>
            <div class="mb-3">
                <label class="form-label" for="LastName">Last Name</label>
                <input id="LastName" class="form-control" type="text" name="lastName" value="<?php echo htmlspecialchars($_GET['lastName'] ?? '') ?>">
            </div>
            <div class="mb-3">
                <label class="form-label" for="country">Country</label>
                <select class="form-select" name="country" id="country">
                    <?php
                    $countries = ['Egypt', 'USA', 'UK'];
                    $selectedCountry = $_GET['country'] ?? '';
                    foreach ($countries as $c) {
                        $selected = ($selectedCountry == $c) ? 'selected' : '';
                        echo "<option value='$c' $selected>$c</option>";
                    }
                    ?>
                </select>
            </div>
            <div class="mb-3">
                <label class="form-label" for="address">Address</label>
                <textarea class="form-control" name="address" id="address"><?php echo htmlspecialchars($_GET['address'] ?? '') ?></textarea>
            </div>
            <div class="mb-3">
                <label class="form-label">Gender</label>
                <?php $gender = $_GET['gender'] ?? ''; ?>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="gender" value="male" id="gender_male" <?php echo ($gender == 'male') ? 'checked' : '' ?>>
                    <label class="form-check-label" for="gender_male">Male</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="gender" value="female" id="gender_female" <?php echo ($gender == 'female') ? 'checked' : '' ?>>
                    <label class="form-check-label" for="gender_female">Female</label>
                </div>
            </div>
            <div class="mb-3">
                <label class="form-label">Skills</label>
                <?php
                $skills = isset($_GET['skills']) ? explode('-', $_GET['skills']) : [];
                $availableSkills = ['html' => 'HTML', 'css' => 'CSS', 'php' => 'PHP'];
                foreach ($availableSkills as $val => $label) {
                    $checked = in_array($val, $skills) ? 'checked' : '';
                    echo "
                    <div class='form-check form-check-inline'>
                        <input class='form-check-input' type='checkbox' name='skills[]' value='$val' id='$val' $checked>
                        <label class='form-check-label' for='$val'>$label</label>
                    </div>";
                }
                ?>
            </div>
            <div class="mb-3" hidden>
                <label class="form-label" for="username">Username</label>
                <input class="form-control" type="text" name="username" id="username" value="<?php echo htmlspecialchars($_GET['username'] ?? '') ?>">
            </div>
            <div class="mb-3">
                <label class="form-label" for="department">Department</label>
                <input class="form-control" type="text" name="department" id="department" value="<?php echo htmlspecialchars($_GET['department'] ?? 'OpenSource') ?>" readonly>
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
