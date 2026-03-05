<?php

$servername = "127.0.0.1:3306";
$username = "root";
$password = "Mohamed@2003";
$dbname = "php_labs";

$action = $_GET['action'] ?? null;

switch ($action) {
    case 'add':
        addUser($_POST['user_data']);
        break;
    case 'update':
        updateUser($_GET['user_data']);
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
        global $servername, $username, $password, $dbname;
        $connection = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8mb4", $username, $password);
        $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $result =  $connection->query("SELECT * FROM User");
        $data = $result->fetchAll(PDO::FETCH_ASSOC);
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

        global $servername, $username, $password, $dbname;
        $connection = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8mb4", $username, $password);
        $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $connection->prepare("SELECT * FROM User WHERE email = :email AND password = :password");
        $stmt->execute([':email' => $email, ":password" => $userPassword]);
        $data = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($data) {
            setcookie("username", $data["username"]);
            setcookie("firstName", $data["f_name"]);
            header("Location:list.php");
        } else {
            header("Location:login.php");
        }
        exit();
    } catch (PDOException $e) {
        die("connection failed");
    }
}
function getUser($id): array
{
    try {
        global $servername, $username, $password, $dbname;
        $connection = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8mb4", $username, $password);
        $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $connection->prepare("SELECT * FROM User WHERE id = :id");
        $stmt->execute([':id' => $id]);
        $data = $stmt->fetch(PDO::FETCH_ASSOC);
        return $data ?: [];
    } catch (PDOException $e) {
        die("connection failed");
    }
}
function addUser($userData)
{
    try {
        global $servername, $username, $password, $dbname;
        $connection = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8mb4", $username, $password);
        $skills = isset($userData['skills']) ? implode('-', $userData['skills']) : '';
        $errors = [];

        if (isset($userData["f_name"])) {
            if (strlen($userData["f_name"]) < 3) {
                $errors["f_name"] = "First Name length must be more than 3 ";
            } else {
                $userData["f_name"] = validate($userData["f_name"]);
            }
        }
        if (isset($userData["l_name"])) {
            if (strlen($userData["l_name"]) < 3) {
                $errors["l_name"] = "Last Name length must be more than 3 ";
            } else {
                $userData["l_name"] = validate($userData["l_name"]);
            }
        }
        if (isset($userData["username"])) {
            if (strlen($userData["username"]) < 3) {
                $errors["username"] = "Username length must be more than 3 ";
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
            $userData["address"] = validate($userData["address"]);
            if (strlen($userData["address"]) < 3) {
                $errors["address"] = "Address length must be more than 3 ";
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
        

        $query = "INSERT INTO User (email, f_name, l_name, country, address, gender, skills, username, password, department,img)
                VALUES (:email,:f_name, :l_name, :country, :address, :gender, :skills, :username, :password, :department,:img)";

        $insertStatement = $connection->prepare($query);

        $insertStatement->execute([
            ':email' => $userData['email'],
            ':f_name' => $userData['f_name'],
            ':l_name' => $userData['l_name'],
            ':country' => $userData['country'],
            ':address' => $userData['address'],
            ':gender' => $userData['gender'],
            ':skills' => $skills,
            ':username' => $userData['username'],
            ':password' => $userData['password'],
            ':department' => $userData['department'],
            ':img' => $imagePath,
        ]);
        header("Location:list.php");
        exit();
    } catch (PDOException $e) {
        die("Database operation failed: " . $e->getMessage());
    }
}
function updateUser($userData)
{
    try {
        global $servername, $username, $password, $dbname;
        $connection = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8mb4", $username, $password);
        $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $skills = isset($userData['skills']) ? implode('-', $userData['skills']) : '';
        $errors = [];

        if (isset($userData["f_name"])) {
            if (strlen($userData["f_name"]) < 3) {
                $errors["f_name"] = "First Name length must be more than 3 ";
            } else {
                $userData["f_name"] = validate($userData["f_name"]);
            }
        }
        if (isset($userData["l_name"])) {
            if (strlen($userData["l_name"]) < 3) {
                $errors["l_name"] = "Last Name length must be more than 3 ";
            } else {
                $userData["l_name"] = validate($userData["l_name"]);
            }
        }
        if (isset($userData["address"])) {
            if (strlen($userData["address"]) < 3) {
                $errors["address"] = "Address length must be more than 3 ";
            } else {
                $userData["address"] = validate($userData["address"]);
            }
        }

        if (!empty($errors)) {
            header("Location:update.php?user_id={$userData['id']}&errors=" . urlencode(json_encode($errors)));
            exit();
        }

        $query = "UPDATE User SET
            f_name = :f_name,
            l_name = :l_name,
            country = :country,
            address = :address,
            gender = :gender,
            skills = :skills,
            department = :department
            WHERE id = :id";

        $stmt = $connection->prepare($query);
        $stmt->execute([
            ':f_name' => $userData['f_name'],
            ':l_name' => $userData['l_name'],
            ':country' => $userData['country'],
            ':address' => $userData['address'],
            ':gender' => $userData['gender'],
            ':skills' => $skills,
            ':department' => $userData['department'],
            ':id' => $userData['id']
        ]);

        header("Location:list.php");
        exit();
    } catch (PDOException $e) {
        die("Database operation failed: " . $e->getMessage());
    }
}
function deleteUser($id)
{
    try {
        global $servername, $username, $password, $dbname;
        $connection = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8mb4", $username, $password);
        $result =  $connection->query("DELETE FROM User WHERE id=$id");
        header("Location:list.php");
    } catch (PDOException $e) {
        die("connection failed");
    }
}

function validate($value)
{
    $value = htmlspecialchars($value);
    $value = trim($value);
    $value = addslashes($value);
    return $value;
}
function moveUserImage($img): void
{
    move_uploaded_file($img, "./imgs/");
}
