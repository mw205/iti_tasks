<?php
require("controller.php");
if (!isset($_COOKIE['username'])) {
    header('Location:login.php');
    exit();
}
$user = getUser($_GET['user_id'] ?? 0);
if (!$user) {
    header('Location:list.php');
    exit();
}
$errors = [];
if (isset($_GET['errors'])) {
    $errors = json_decode($_GET['errors'], true);
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Update User</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>

<body>
    <div class="container mt-5">
        <h2>Update User Information</h2>
        <form action="controller.php?action=update" method="post" enctype="multipart/form-data">
            <input type="hidden" name="user_data[id]" value="<?php echo $user['id'] ?>">
            
            <div class="mb-3">
                <label for="FirstName" class="form-label">First Name</label>
                <input id="FirstName" class="form-control" type="text" name="user_data[f_name]" value="<?php echo htmlspecialchars($user['f_name'] ?? '') ?>">
                <?php if (isset($errors['f_name'])): ?>
                    <p class="text-danger"><?php echo $errors['f_name']; ?></p>
                <?php endif; ?>
            </div>
            
            <div class="mb-3">
                <label class="form-label" for="LastName">Last Name</label>
                <input id="LastName" class="form-control" type="text" name="user_data[l_name]" value="<?php echo htmlspecialchars($user['l_name'] ?? '') ?>">
                <?php if (isset($errors['l_name'])): ?>
                    <p class="text-danger"><?php echo $errors['l_name']; ?></p>
                <?php endif; ?>
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
                <?php if (isset($errors['address'])): ?>
                    <p class="text-danger"><?php echo $errors['address']; ?></p>
                <?php endif; ?>
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
            
            <div class="mb-3">
                <label class="form-label" for="image">Profile Image</label>
                <?php if (!empty($user['img'])): ?>
                    <div class="mb-2">
                        <img src="<?php echo htmlspecialchars($user['img']) ?>" alt="User Image" style="width: 100px; height: 100px; object-fit: cover;">
                    </div>
                <?php endif; ?>
                <input class="form-control" type="file" name="user_data[image]" id="image">
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
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>
