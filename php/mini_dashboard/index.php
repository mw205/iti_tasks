<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>login form</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="main.js"></script>
</head>
<?php
$errors = array();
if (isset($_GET["errors"])) {
    $errors = json_decode($_GET["errors"], true);
}
?>

<body>

    <div class="container mt-5">
        <form action="controller.php?action=add" method="post" onsubmit="return doValidation()"
            enctype="multipart/form-data">
            <div class="mb-3">
                <label for="FirstName" class="form-label">First Name</label>
                <input id="FirstName" class="form-control" type="text" name="user_data[f_name]" required>
                <p class="text-danger">
                    <?php
                    if (isset($errors['f_name'])) {
                        echo $errors['f_name'];
                    }
                    ?>
                </p>
            </div>
            <div class="mb-3">
                <label class="form-label" for="LastName">Last Name</label>
                <input id="LastName" class="form-control" type="text" name="user_data[l_name]" required>
                <p class="text-danger"> <?php
                                        if (isset($errors['l_name'])) {
                                            echo $errors['l_name'];
                                        } ?>
                </p>
            </div>
            <div class="mb-3">
                <label class="form-label" for="country">Country</label>
                <select class="form-select" name="user_data[country]" id="country">
                    <option value="Egypt">Egypt</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                </select>
            </div>
            <div class="mb-3">
                <label class="form-label" for="address">Address</label>
                <textarea class="form-control" name="user_data[address]" id="address" required></textarea>
                <p class="text-danger">
                    <?php
                    if (isset($errors['address'])) {
                        echo $errors['address'];
                    } ?>
                </p>
            </div>
            <div class="mb-3">
                <label class="form-label">Gender</label>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="user_data[gender]" value="male" id="gender_male">
                    <label class="form-check-label" for="gender_male">Male</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="user_data[gender]" value="female"
                        id="gender_female">
                    <label class="form-check-label" for="gender_female">Female</label>
                </div>
            </div>
            <div class="mb-3">
                <label class="form-label">Skills</label>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" name="user_data[skills][]" value="html" id="Html">
                    <label class="form-check-label" for="Html">HTML</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" name="user_data[skills][]" value="css" id="CSS">
                    <label class="form-check-label" for="CSS">CSS</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" name="user_data[skills][]" value="php" id="PHP">
                    <label class="form-check-label" for="PHP">PHP</label>
                </div>
            </div>
            <div class="mb-3">
                <label class="form-label" for="username">Username</label>
                <input class="form-control" type="text" name="user_data[username]" id="username" required>
                <p class="text-danger">
                    <?
                    if (isset($errors['username'])) {
                        echo $errors['username'];
                    } ?>
                </p>
            </div>
            <div class="mb-3">
                <label class="form-label" for="email">Email</label>
                <input class="form-control" type="email" name="user_data[email]" id="email" required>
                <p class="text-danger"> <?php
                                        if (isset($errors['email'])) {
                                            echo $errors['email'];
                                        } ?></p>
            </div>
            <div class="mb-3">
                <label class="form-label" for="password">Password</label>
                <input class="form-control" type="password" name="user_data[password]" id="password" required>
            </div>
            <div class="mb-3">
                <label class="form-label" for="department">Department</label>
                <input class="form-control" type="text" name="user_data[department]" id="department" value="OpenSource"
                    readonly>
            </div>
            <div class="mb-3">
                <label for="formFile" class="form-label">Upload Your Image</label>
                <input class="form-control" type="file" id="formFile" name="user_data[image]">
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
            <div class="mb-5"> <button type="submit" class="btn btn-primary">Submit</button>
                <button type="reset" class="btn btn-secondary">Reset</button>
            </div>

            <p><a href="login.php"
                    class="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">Already
                    Have Account?</a></p>

        </form>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
        crossorigin="anonymous"></script>
</body>

</html>