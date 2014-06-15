<!DOCTYPE html>
<html lang="en" ng-app="root.module">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>MámHladVHK.cz - Nová objednávka</title>

    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/custom.css" rel="stylesheet">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>

    <script src="js/angular.min.js"></script>
    <script src="js/angular-route.min.js"></script>
    <script src="js/my.js"></script>
    <script src="js/routes.js"></script>
    <script src="js/controllers.js"></script>

    <script type="text/javascript">
        $(document).ready(function()
        {
            setInterval('updateClock()', 1000);
        });
    </script>

</head>
<body>

<div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
    <div class="container-fluid">
        <div class="navbar-header">
            <button class="navbar-toggle" data-target=".navbar-collapse" data-toggle="collapse" type="button">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">MamHladVHK.cz - administrace</a>
        </div>
        <div class="navbar-collapse collapse">
            <ul class="nav navbar-nav navbar-right">
                <li>
                    <a href="#">Dashboard</a>
                </li>
            </ul>
            <form class="navbar-form navbar-right">
                <input class="form-control" type="text" placeholder="Search...">
            </form>
        </div>
    </div>
</div>


<div class="container-fluid" ng-controller="menuCtrl">
    <div class="row">
        <div class="col-sm-3 col-md-3 sidebar">
            <ul class="nav nav-sidebar">
                <li ng-class="{ active: isActive('/nova-objednavka') }">
                    <a href="#/nova-objednavka" ng-click="new-order"><span class="glyphicon glyphicon-plus"></span> Nová objednávka</a>
                </li>
                <li ng-class="{ active: isActive('/aktualni-objednavky')}">
                    <a href="#/aktualni-objednavky" ng-click="live-orders"><span class="glyphicon glyphicon-cutlery"></span> Aktuální objednávky <span class="badge pull-right">42</span></a>
                </li>
                <li ng-class="{ active: isActive('/historie-objednavek')}">
                    <a href="#/historie-objednavek"><span class="glyphicon glyphicon-tasks"></span> Historie objednávek</a>
                </li>
                <li ng-class="{ active: isActive('/inventura')}">
                    <a href="#/inventura"><span class="glyphicon glyphicon-inbox"></span> Inventura</a>
                </li>
            </ul>

            <strong id="clock"></strong>

        </div>


    </div>
</div>

<div class="col-sm-9 col-sm-offset-3 col-md-9 col-md-offset-3 main">

    <div ng-view></div>

</div>


</body>
</html>
