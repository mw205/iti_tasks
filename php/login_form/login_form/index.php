<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>login form</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="main.js"></script>
</head>

<body>
    <div class="container mt-5">
        <form action="save.php" method="post">
            <div class="mb-3">
                <label for="FirstName" class="form-label">First Name</label>
                <input id="FirstName" class="form-control" type="text" name="firstName">
            </div>
            <div class="mb-3">
                <label class="form-label" for="LastName">Last Name</label>
                <input id="LastName" class="form-control" type="text" name="lastName">
            </div>
            <div class="mb-3">
                <label class="form-label" for="country">Country</label>
                <select class="form-select" name="country" id="country">
                    <option value="Egypt">Egypt</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                </select>
            </div>
            <div class="mb-3">
                <label class="form-label" for="address">Address</label>
                <textarea class="form-control" name="address" id="address"></textarea>
            </div>
            <div class="mb-3">
                <label class="form-label">Gender</label>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="gender" value="male" id="gender_male">
                    <label class="form-check-label" for="gender_male">Male</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="gender" value="female" id="gender_female">
                    <label class="form-check-label" for="gender_female">Female</label>
                </div>
            </div>
            <div class="mb-3">
                <label class="form-label">Skills</label>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" name="skills[]" value="html" id="Html">
                    <label class="form-check-label" for="Html">HTML</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" name="skills[]" value="css" id="CSS">
                    <label class="form-check-label" for="CSS">CSS</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" name="skills[]" value="php" id="PHP">
                    <label class="form-check-label" for="PHP">PHP</label>
                </div>
            </div>
            <div class="mb-3">
                <label class="form-label" for="username">Username</label>
                <input class="form-control" type="text" name="username" id="username">
            </div>
            <div class="mb-3">
                <label class="form-label" for="password">Password</label>
                <input class="form-control" type="password" name="password" id="password">
            </div>
            <div class="mb-3">
                <label class="form-label" for="department">Department</label>
                <input class="form-control" type="text" name="department" id="department" value="OpenSource" readonly>
            </div>
            <div class="mb-3">
                <?php
                $toValidate = bin2hex(random_bytes(3));
                echo "<label class='form-label'>Validation Code: <strong>$toValidate</strong></label>";
                echo "<input type='hidden' id='toValidate' name='toValidate' value='$toValidate'>";
                ?>
                <div class="form-text">Please Insert the code above</div>
                <input class="form-control mt-2" type="text" name="validation">
            </div>
            <div class="mb-5"> <button type="submit" class="btn btn-primary" onclick="return doValidation()">Submit</button>
                <button type="reset" class="btn btn-secondary">Reset</button>
            </div>
        </form>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
</body>

</html>