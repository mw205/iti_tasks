<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>update</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
</head>

<body>
    <div class="container mt-5">
        <form action="save_update.php" method="post">
            <div class="mb-3">
                <label for="FirstName" class="form-label">First Name</label>
                <input id="FirstName" class="form-control" type="text" name="firstName" value="<?php echo $_GET['firstName'] ?? '' ?>">
            </div>
            <div class="mb-3">
                <label class="form-label" for="LastName">Last Name</label>
                <input id="LastName" class="form-control" type="text" name="lastName" value="<?php echo $_GET['lastName'] ?? '' ?>">
            </div>
            <div class="mb-3">
                <label class="form-label" for="country">Country</label>
                <select class="form-select" name="country" id="country">
                    <option value="Egypt" <?php echo ($_GET['country'] ?? '') == 'Egypt' ? 'selected' : '' ?>>Egypt</option>
                    <option value="USA" <?php echo ($_GET['country'] ?? '') == 'USA' ? 'selected' : '' ?>>USA</option>
                    <option value="UK" <?php echo ($_GET['country'] ?? '') == 'UK' ? 'selected' : '' ?>>UK</option>
                </select>
            </div>
            <div class="mb-3">
                <label class="form-label" for="address">Address</label>
                <textarea class="form-control" name="address" id="address"><?php echo $_GET['address'] ?? '' ?></textarea>
            </div>
            <div class="mb-3">
                <label class="form-label">Gender</label>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="gender" value="male" id="gender_male" <?php echo ($_GET['gender'] ?? '') == 'male' ? 'checked' : '' ?>>
                    <label class="form-check-label" for="gender_male">Male</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="gender" value="female" id="gender_female" <?php echo ($_GET['gender'] ?? '') == 'female' ? 'checked' : '' ?>>
                    <label class="form-check-label" for="gender_female">Female</label>
                </div>
            </div>
            <div class="mb-3">
                <label class="form-label">Skills</label>
                <?php
                $skills = isset($_GET['skills']) ? explode('-', $_GET['skills']) : [];
                ?>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" name="skills[]" value="html" id="Html"
                        <?php echo in_array('html', $skills) ? 'checked' : ''; ?>>
                    <label class="form-check-label" for="Html">HTML</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" name="skills[]" value="css" id="CSS"
                        <?php echo in_array('css', $skills) ? 'checked' : ''; ?>>
                    <label class="form-check-label" for="CSS">CSS</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" name="skills[]" value="php" id="PHP"
                        <?php echo in_array('php', $skills) ? 'checked' : ''; ?>>
                    <label class="form-check-label" for="PHP">PHP</label>
                </div>
            </div>
            <div class="mb-3" hidden>
                <label class="form-label" for="username">Username</label>
                <input class="form-control" type="text" name="username" id="username" value="<?php echo $_GET['username'] ?? '' ?>">
            </div>
            <div class="mb-3">
                <label class="form-label" for="department">Department</label>
                <input class="form-control" type="text" name="department" id="department" value="OpenSource" readonly>
            </div>

            <div class="mb-5"> <button type="submit" class="btn btn-primary">Submit</button>
            </div>
        </form>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
</body>

</html>