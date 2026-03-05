<?php
require "db.php";

$action = $_GET['action'] ?? null;

switch ($action) {
    case 'add':
        addUser($_POST['user_data']);
        break;
    case 'update':
        updateUser($_POST['user_data']);
        break;
    case 'login':
        loginUser($_POST['email'], $_POST['password']);
        break;
    case 'delete':
        deleteUser($_GET['user_id']);
        break;
}

function getUsers(): array
{
    try {
        $conn = DB::getInstance();
        $data =  $conn->getData('User');
        return $data;
    } catch (PDOException $e) {
        die("Database operation failed: " . $e->getMessage());
    }
}

function loginUser($email, $userPassword)
{
    try {
        $email = validate($email);
        $userPassword = validate($userPassword);
        $conn = DB::getInstance();
        $data = $conn->getData("User", "email='{$email}' AND password ='{$userPassword}'");
        $user = $data[0] ?? null;

        if ($user) {
            setcookie("username", $user["username"]);
            setcookie("firstName", $user["f_name"]);
            header("Location:list.php");
        } else {
            header("Location:login.php");
        }
        exit();
    } catch (PDOException $e) {
        die("Login failed: " . $e->getMessage());
    }
}

function getUser($id): array
{
    try {
        $conn = DB::getInstance();
        $data =  $conn->getData('User', "id=$id");
        return $data[0] ?? [];
    } catch (PDOException $e) {
        die("Connection failed: " . $e->getMessage());
    }
}

function addUser($userData)
{
    try {
        $skills = isset($userData['skills']) ? implode('-', $userData['skills']) : '';
        $errors = [];

        // Validation logic
        if (isset($userData["f_name"])) {
            if (strlen($userData["f_name"]) < 3) {
                $errors["f_name"] = "First Name length must be more than 3";
            } else {
                $userData["f_name"] = validate($userData["f_name"]);
            }
        }
        if (isset($userData["l_name"])) {
            if (strlen($userData["l_name"]) < 3) {
                $errors["l_name"] = "Last Name length must be more than 3";
            } else {
                $userData["l_name"] = validate($userData["l_name"]);
            }
        }
        if (isset($userData["username"])) {
            if (strlen($userData["username"]) < 3) {
                $errors["username"] = "Username length must be more than 3";
            } else {
                $userData["username"] = validate($userData["username"]);
            }
        }
        if (isset($userData["password"])) {
            $userData["password"] = validate($userData["password"]);
        }
        if (isset($userData["email"])) {
            $userData["email"] = validate($userData["email"]);
            if (!filter_var($userData["email"], FILTER_VALIDATE_EMAIL)) {
                $errors["email"] = "Invalid Email";
            }
        }
        if (isset($userData["address"])) {
            if (strlen($userData["address"]) < 3) {
                $errors["address"] = "Address length must be more than 3";
            } else {
                $userData["address"] = validate($userData["address"]);
            }
        }
        if (isset($userData["country"])) {
            $userData["country"] = validate($userData["country"]);
        }

        if (!empty($errors)) {
            header('Location:index.php?errors=' . urlencode(json_encode($errors)));
            exit();
        }

        // Handle file upload
        $imagePath = "";
        if (isset($_FILES['user_data']['name']['image']) && $_FILES['user_data']['error']['image'] == 0) {
            $imageName = time() . '_' . $_FILES['user_data']['name']['image'];
            $imagePath = 'imgs/' . $imageName;
            move_uploaded_file($_FILES['user_data']['tmp_name']['image'], $imagePath);
        }

        $dataToInsert = [
            'email' => $userData['email'],
            'f_name' => $userData['f_name'],
            'l_name' => $userData['l_name'],
            'country' => $userData['country'],
            'address' => $userData['address'],
            'gender' => $userData['gender'],
            'skills' => $skills,
            'username' => $userData['username'],
            'password' => $userData['password'],
            'department' => $userData['department'],
            'img' => $imagePath
        ];

        $conn = DB::getInstance();
        $conn->insertData('User', $dataToInsert);

        header("Location:list.php");
        exit();
    } catch (PDOException $e) {
        die("Database operation failed: " . $e->getMessage());
    }
}

function updateUser($userData)
{
    try {
        $id = $userData['id'];
        $skills = isset($userData['skills']) ? implode('-', $userData['skills']) : '';
        $errors = [];

        // Validation logic
        if (isset($userData["f_name"])) {
            if (strlen($userData["f_name"]) < 3) {
                $errors["f_name"] = "First Name length must be more than 3";
            } else {
                $userData["f_name"] = validate($userData["f_name"]);
            }
        }
        if (isset($userData["l_name"])) {
            if (strlen($userData["l_name"]) < 3) {
                $errors["l_name"] = "Last Name length must be more than 3";
            } else {
                $userData["l_name"] = validate($userData["l_name"]);
            }
        }
        if (isset($userData["address"])) {
            if (strlen($userData["address"]) < 3) {
                $errors["address"] = "Address length must be more than 3";
            } else {
                $userData["address"] = validate($userData["address"]);
            }
        }

        if (!empty($errors)) {
            header("Location:update.php?user_id={$id}&errors=" . urlencode(json_encode($errors)));
            exit();
        }

        $dataToUpdate = [
            'f_name' => $userData['f_name'],
            'l_name' => $userData['l_name'],
            'country' => $userData['country'],
            'address' => $userData['address'],
            'gender' => $userData['gender'],
            'skills' => $skills,
            'department' => $userData['department']
        ];

        if (isset($_FILES['user_data']['name']['image']) && $_FILES['user_data']['error']['image'] == 0) {
            $oldUser = getUser($id);
            if (!empty($oldUser['img']) && file_exists($oldUser['img'])) {
                unlink($oldUser['img']);
            }

            $imageName = time() . '_' . $_FILES['user_data']['name']['image'];
            $imagePath = 'imgs/' . $imageName;
            move_uploaded_file($_FILES['user_data']['tmp_name']['image'], $imagePath);
            $dataToUpdate['img'] = $imagePath;
        }

        $conn = DB::getInstance();
        $conn->updateData("User", "id=$id", $dataToUpdate);

        header("Location:list.php");
        exit();
    } catch (PDOException $e) {
        die("Database operation failed: " . $e->getMessage());
    }
}

function deleteUser($id)
{
    try {
        $user = getUser($id);
        if (!empty($user['img']) && file_exists($user['img'])) {
            unlink($user['img']);
        }

        $conn = DB::getInstance();
        $conn->deleteData("User", "id=$id");
        header("Location:list.php");
        exit();
    } catch (PDOException $e) {
        die("Delete operation failed: " . $e->getMessage());
    }
}

function validate($value)
{
    $value = htmlspecialchars($value);
    $value = trim($value);
    $value = addslashes($value);
    return $value;
}
