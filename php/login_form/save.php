<?php
unset($_POST["toValidate"]);
unset($_POST["validation"]);
unset($_POST["password"]);

if (isset($_POST["skills"])) {
    $_POST["skills"] = implode("-", $_POST["skills"]);
}
$data = implode(
    ",",
    $_POST
);
$data .= "\n";
var_dump($data);
file_put_contents("db.txt", $data, FILE_APPEND);
header("Location:list.php");
