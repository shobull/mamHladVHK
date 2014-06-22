<?php

require '../../Slim/Slim.php';

\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();


$app->get('/street', function () use ($app) {

    $q = $app->request()->get('q');

    $sql = "SELECT * FROM ulice u WHERE u.name LIKE :q";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $query = "%" . $q . "%";
        $stmt->bindParam("q", $query);
        $stmt->execute();
        $food = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo '{"ulice": ' . json_encode($food) . '}';
    } catch (PDOException $e) {
        echo '{"error":{"text":' . $e->getMessage() . '}}';
    }

});

$app->run();

function getConnection()
{
    $dbhost = "localhost";
    $dbuser = "hlad";
    $dbpass = "hladxx";
    $dbname = "db5183_hladhkdb";
    $dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $dbh;
}

?>