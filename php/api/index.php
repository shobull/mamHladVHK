<?php

require '../Slim/Slim.php';

\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();


$app->get('/food', function () use ($app) {

    $q = $app->request()->get('q');

    $sql = "SELECT j.Name, j.Id, j.Number, j.Prize, s.Nazev FROM jidelak j LEFT JOIN skupiny s ON (s.Cat = j.Cat) WHERE j.Name LIKE :q OR j.Number LIKE :q";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $query = "%" . $q . "%";
        $stmt->bindParam("q", $query);
        $stmt->execute();
        $food = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo '{"jidelak": ' . json_encode($food) . '}';
    } catch (PDOException $e) {
        echo '{"error":{"text":' . $e->getMessage() . '}}';
    }

});


//$app->get('/food', 'getFoods');
$app->get('/food/:id', 'getWine');
//$app->get('/wines/search/:query', 'findByName');
//$app->post('/wines', 'addWine');
//$app->put('/wines/:id', 'updateWine');
//$app->delete('/wines/:id', 'deleteWine');

$app->run();

//function getFoods()
//{
//
//}

function getWine($id)
{
    $sql = "SELECT * FROM jidelak WHERE id=:id";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("id", $id);
        $stmt->execute();
        $food = $stmt->fetchObject();
        $db = null;
        echo json_encode($food);
    } catch (PDOException $e) {
        echo '{"error":{"text":' . $e->getMessage() . '}}';
    }
}


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