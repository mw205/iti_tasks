<?php

final class DB
{
    private $servername = "127.0.0.1:3306";
    private $username = "root";
    private $password = "Mohamed@2003";
    private
        $dbname = "php_labs";
    private static $instance = null;
    private PDO $pdo;

    private function __construct()
    {
        $dsn = "mysql:host={$this->servername};dbname={$this->dbname};charset=utf8mb4";
        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ];
        try {
            $this->pdo = new PDO(
                $dsn,
                $this->username,
                $this->password,
                $options
            );
        } catch (PDOException $e) {
            die("Database Connection failed: " . $e->getMessage());
        }
    }
    public static function getInstance()
    {
        if (self::$instance == null) {
            self::$instance = new self;
        }
        return self::$instance;
    }

    public function getData($table, $condition = 1)
    {
        $sql = "SELECT * FROM {$table} WHERE {$condition}";
        $statement = $this->pdo->query($sql);
        return $statement->fetchAll();
    }
    public function deleteData($table, $condition)
    {
        $sql = "DELETE  FROM {$table} WHERE {$condition}";
        return $this->pdo->query($sql);
    }
    public function updateData($table, $condition, $data)
    {
        $setClauses = "";
        foreach ($data as $key => $value) {
            $setClauses .= "{$key}= ? ,";
        }
        $setClauses = rtrim($setClauses, " ,");
        $sql = "UPDATE {$table} SET {$setClauses} WHERE {$condition}";
        $stm = $this->pdo->prepare($sql);
        return $stm->execute(array_values($data));
    }
    public function insertData($table, $data) {
        $columns = implode(", ", array_keys($data));
        $values = implode(
            " ,",
            array_fill(0, count($data),  "?")
        );
        $sql = "INSERT INTO $table
        ($columns)
        VALUES
        ($values)";
        $stmt = $this->pdo->prepare($sql);
        $result = $stmt->execute(array_values($data));
        return $result;
    }
}
