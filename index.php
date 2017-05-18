<!DOCTYPE html>
<html>
<head>
	<title>Book Tinder: Fantasy</title>
	<!-- Bootstrap -->
	<link href="css/bootstrap.min.css" type="text/css" rel="stylesheet">	
	<link href="css/jquery-ui.css" type="text/css" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="css/style.css">
	<meta charset="utf-8">
</head>

<body>
	<header>
		<nav class="navbar navbar-default">
			<div class="container-fluid">
				<!-- Brand and toggle get grouped for better mobile display -->
				<div class="navbar-header">
					<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
						<span class="sr-only">Toggle navigation</span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
					<a class="navbar-brand" href="https://upacademy.pt/" target="_blank"><img src="images/Up Academy.png" style="max-height: 100%; max-width: 100%;"></a>
				</div>

				<!-- Collect the nav links, forms, and other content for toggling -->
				<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
					<ul class="nav navbar-nav">
						<li class="active"><a href="fantasy.html">Fantasy<span class="sr-only">(current)</span></a></li>
						<li><a href="scifi.html">Science Fiction</a></li>
						<li><a href="histfic.html">Historical Fiction</a></li>
						<li class="dropdown">
							<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Other Categories <span class="caret"></span></a>
							<ul class="dropdown-menu">
								<li><a href="#">Action</a></li>
								<li><a href="#">Another action</a></li>
								<li><a href="#">Something else here</a></li>
								<li role="separator" class="divider"></li>
								<li><a href="#">Separated link</a></li>
								<li role="separator" class="divider"></li>
								<li><a href="#">One more separated link</a></li>
							</ul>
						</li>
					</ul>
					<form class="navbar-form navbar-left">
						<div class="form-group">
							<input type="text" class="form-control" placeholder="Search">
						</div>
						<button type="submit" class="btn btn-default">Go</button>
					</form>
					<ul class="nav navbar-nav navbar-right">
						<li><a href="#">Contact</a></li>
						<li><a href="#"><span class="glyphicon glyphicon-shopping-cart"></span>Shopping</a></li>
						<li class="dropdown">
							<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Options <span class="caret"></span></a>
							<ul class="dropdown-menu">
								<li><a href="#">Action</a></li>
								<li><a href="#">Another action</a></li>
								<li><a href="#">Something else here</a></li>
								<li role="separator" class="divider"></li>
								<li><a href="#">Separated link</a></li>
							</ul>
						</li>
					</ul>
				</div><!-- /.navbar-collapse -->
			</div><!-- /.container-fluid -->
		</nav>
	</header>


	<div class="container-fluid">
		<div class="row">
			<div class="bookDiv">
			<!--This is where the books will be added-->
			</div>
			
			<div class="row buttons active col-xs-10 col-xs-offset-1 col-md-6 col-md-offset-3">
				<button id="buttonDislike" class="Dislike col-xs-4 col-xs-offset-1 btn btn-danger"><span class="glyphicon glyphicon-thumbs-down" aria-hidden="true"></span></button>
				<button id="buttonLike" class="col-xs-4 col-xs-offset-2 btn btn-success"><span class="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span></button>
			</div>
			<div class="row backButton col-xs-10 col-xs-offset-1 col-md-6 col-md-offset-3">
				<button id="backButton" ><span class="glyphicon glyphicon-backward" aria-hidden="true"></span></button>
			</div>

			<div class="Result col-xs-10 col-xs-offset-1 col-md-4 col-md-offset-4 AfterBooks">
				<h3>Results</h3>
				<div class="row">
					<p class="col-xs-6" id="likesText">Likes</p>
					<p class="col-xs-6" id="dislikesText">Dislikes</p>
				</div>
				<div class="row">
					<p class="col-xs-6" id="likes">0</p>
					<p class="col-xs-6" id="dislikes">0</p>
				</div>
				<div class="row">
					<p class="col-xs-6" id="bookLikesText">Books</p>
					<p class="col-xs-6" id="bookDislikesText">Books</p>
				</div>
				<div class="row">
					<p class="col-xs-4 col-xs-offset-1" id="bookLikes"></p>
					<p class="col-xs-4 col-xs-offset-2" id="bookDislikes"></p>
				</div>
				<br>
				<br>
				<button class="backToStart">Restart</button>
				<br>
				<br>
				<button id="shopping">Shopping</button>
			</div>


			<div class="ShoppingCart col-xs-10 col-xs-offset-1 AfterBooks"> 
			<table>
				<tr id="TableHeader" class="active">
					<th class="itemName">Book Name</th>
					<th class="itemImage">Cover</th>
					<th class="author">Author</th>
					<th class="googlePreview">Preview</th>
					<th class="googlePrice"><img src="images/Google_Play_logo.png" width=75px height=32px></th>
					<th class="quantity">Quantity</th>
			        <th class="price">Price</th>
				</tr>
				<!--This is where the book rows will show up-->
			</table>
			<br>
			<br>
			<button id="calculateTotal">Calculate Total</button>
			<h1 id="TotalPrice"></h1>
			<button class="backToStart">Restart</button>
			</div>

		</div>
	</div>
	<div id="progressbar"><div class="progress-label">Loading...</div></div>
	<footer class="container-fluid">
		<p class="col-xs-4">Created by: Duarte Ferreira</p>
		<p class="col-xs-4" id="Date"></p>
		<p class="col-xs-4">Contact information: duartepferreira@hotmail.com</p>
	</footer>
	<script type="text/javascript" src="js/jquery-3.2.1.js"></script>
	<script type="text/javascript" src="js/main.js"></script>
	<script type="text/javascript" src="js/jquery-ui.js"></script>
</body>
</html>