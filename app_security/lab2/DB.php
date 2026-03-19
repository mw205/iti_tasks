<?php

use PDO;

class DB
{
    private static $instance;
    private $connection;

    public function __construct()
    {
        $this->connection = new PDO(
            "mysql:host=localhost;dbname=test_sql_MAp",
            "root",
            "Mohamed@2003"
        );
        $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    }

    public static function connect()
    {
        if (!self::$instance) {
            self::$instance = new self();
        }

        return self::$instance->connection;
    }
}