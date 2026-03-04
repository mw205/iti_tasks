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

        $query = "INSERT INTO User (email, f_name, l_name, country, address, gender, skills, username, password, department) 
                VALUES (:email,:f_name, :l_name, :country, :address, :gender, :skills, :username, :password, :department)";

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
            ':department' => $userData['department']
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
        $skills = isset($userData['skills']) ? implode('-', $userData['skills']) : '';
        $connection->query("UPDATE User SET
        f_name='{$userData['f_name']}',
        l_name='{$userData['l_name']}',
        country='{$userData['country']}',
        address='{$userData['address']}',
        gender='{$userData['gender']}',
        skills='$skills',
        username='{$userData['username']}',
        department='{$userData['department']}'
        WHERE id={$userData['id']}
        ");
        header("Location:list.php");
    } catch (PDOException $e) {
        die("connection failed");
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
