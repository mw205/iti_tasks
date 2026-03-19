<?php
require_once "DB.php";
error_reporting(E_ALL);
ini_set('display_errors', 1);
$db = DB::connect();
$courseId = (isset($_GET["id"]) ? $_GET["id"] : "0");
//$stm = $db->prepare("SELECT id,name FROM courses where id = ?");
//$stm->execute([$courseId]);
$sql = "SELECT id,name FROM courses where id = $courseId";
$stm = $db->query($sql);
$results = $stm->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="en">

<head>

    <title>
    </title>
</head>
<body>
<?php
if ($results != null) {
    foreach ($results as $result) {
        echo "<p> <strong>course Id :</strong>" . $result["id"] . "</p>" .
            "<p> <strong>course Name :</strong>" . $result["name"] . "</p>";
    }
} else {
    echo "no results";
}
?>
</body>
</html>